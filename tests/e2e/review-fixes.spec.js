import { expect, test } from "@playwright/test";

// Scroll the page to a fraction of the pinned work strip.
async function scrollIntoStrip(page, fraction) {
  await page.evaluate(async (f) => {
    const spacer = document.querySelector("#work").parentElement;
    const top = spacer.getBoundingClientRect().top + window.scrollY;
    const len = spacer.offsetHeight - window.innerHeight;
    window.scrollTo(0, top + len * f);
    await new Promise((r) => setTimeout(r, 1500));
  }, fraction);
}

for (const [w, h] of [
  [1366, 768],
  [1280, 720],
  [1440, 900],
]) {
  test(`card text fits on screen while pinned at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    for (const f of [0.05, 0.4, 0.75]) {
      await scrollIntoStrip(page, f);
      const bad = await page.$$eval("[data-project]", (cards) =>
        cards
          .filter((c) => {
            const r = c.getBoundingClientRect();
            return r.left >= 0 && r.right <= window.innerWidth; // fully in view horizontally
          })
          .flatMap((c) => [...c.querySelectorAll("h3, ul, p")].map((el) => ({ slug: c.dataset.project, bottom: el.getBoundingClientRect().bottom })))
          .filter((x) => x.bottom > window.innerHeight),
      );
      expect(bad, `at ${f}`).toEqual([]);
    }
  });
}

test("tabbing through project links never blanks the work strip", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.locator("#work").scrollIntoViewIfNeeded();
  await page.locator("[data-project] a").first().focus();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(150);
    const focusedVisible = await page.evaluate(() => {
      const a = document.activeElement;
      if (!a.closest("[data-project]")) return true;
      const r = a.getBoundingClientRect();
      return r.right > 0 && r.left < window.innerWidth && r.bottom > 0 && r.top < window.innerHeight;
    });
    expect(focusedVisible, `tab ${i}`).toBe(true);
  }
  expect(await page.evaluate(() => document.querySelector("#work").scrollLeft)).toBe(0);
  // scroll back to the start of the strip: the first card must be on screen
  await scrollIntoStrip(page, 0.01);
  await expect(page.locator("[data-project]").first().locator("h3")).toBeInViewport();
});

for (const width of [360, 390]) {
  test(`headings fit the screen at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const wide = await page.$$eval("h1, h2, h1 span, h2 span", (els) =>
      els.filter((e) => e.getBoundingClientRect().right > window.innerWidth + 0.5).map((e) => e.textContent),
    );
    expect(wide).toEqual([]);
  });
}

test("focus rings are visible on the lime studio card and contact tiles", async ({ page }) => {
  await page.goto("/");
  const studioLink = page.locator('#studio a[href="https://stackpulsestudios.com/"]');
  await studioLink.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  expect(await studioLink.evaluate((el) => getComputedStyle(el).outlineColor)).toBe("rgb(10, 10, 10)");
  const tile = page.locator('#contact a[href="tel:+393508873712"]');
  await tile.focus();
  expect(await tile.evaluate((el) => parseFloat(getComputedStyle(el).outlineOffset))).toBeLessThan(0);
});

test("nav link moves focus and updates the hash", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.locator('header nav[aria-label="Sections"] a[href="#contact"]').click();
  await page.waitForTimeout(2200);
  expect(await page.evaluate(() => location.hash)).toBe("#contact");
  expect(await page.evaluate(() => document.activeElement?.id)).toBe("contact");
});

for (const [id, w, h] of [["contact", 1440, 900], ["fastblast", 1440, 900], ["work", 1440, 900], ["contact", 1366, 768], ["about", 1280, 720]]) {
  test(`opening /#${id} lands on that section at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto(`/#${id}`);
    await page.waitForTimeout(2500);
    await expect(page.locator(`#${id} h2`)).toBeInViewport();
  });
}

test("hero name never overlaps the pitch while scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  for (const y of [200, 400, 600]) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(600);
    const gap = await page.evaluate(() => {
      const name = document.querySelector("#hero-name").getBoundingClientRect();
      const role = document.querySelector("#top .eyebrow").getBoundingClientRect();
      return role.top - name.bottom;
    });
    expect(gap, `at ${y}`).toBeGreaterThanOrEqual(0);
  }
});

test("opening /#contact on a second visit (fonts cached) still lands there", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.goto("/#contact");
  await page.reload();
  await page.waitForTimeout(2500);
  await expect(page.locator("#contact h2")).toBeInViewport();
});
