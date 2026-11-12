import { expect, test } from "@playwright/test";

const PROJECTS = 6;

test.describe("phones", () => {
  for (const width of [360, 390]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      // walk the whole page so lazy images and late layout are included
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < height; y += 700) await page.evaluate((v) => window.scrollTo(0, v), y);
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(sw).toBeLessThanOrEqual(width);
    });
  }
});

test.describe("reduced motion", () => {
  test("reduced motion shows every project without pinning", async ({ page }) => {
    // test.use({ reducedMotion }) did not reach the page with the Chrome channel; emulate directly.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const cards = page.locator("[data-project]");
    await expect(cards).toHaveCount(PROJECTS);
    for (let i = 0; i < PROJECTS; i++) {
      await cards.nth(i).scrollIntoViewIfNeeded();
      await expect(cards.nth(i)).toBeInViewport();
    }
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
  });
});

test("nav links land on their sections", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  for (const id of ["fastblast", "contact", "work"]) {
    await page.locator(`header nav[aria-label="Sections"] a[href="#${id}"]`).click();
    await page.waitForTimeout(2200);
    const top = await page.locator(`#${id} h2`).evaluate((el) => el.getBoundingClientRect().top);
    expect(top, id).toBeGreaterThanOrEqual(0);
    expect(top, id).toBeLessThan(900);
  }
});

test("last project card reachable after resize", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForTimeout(500);
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.waitForTimeout(800);
  await page.mouse.move(640, 400);
  const last = page.locator("[data-project]").last();
  let seen = false;
  for (let i = 0; i < 80 && !seen; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(120);
    seen = await last.evaluate((el) => {
      const r = el.getBoundingClientRect();
      return r.left >= 0 && r.right <= window.innerWidth + 1 && r.top < window.innerHeight && r.bottom > 0;
    });
  }
  expect(seen).toBe(true);
  // and the next section isn't hidden behind the pinned strip afterwards
  await page.locator("#fastblast h2").scrollIntoViewIfNeeded();
  await expect(page.locator("#fastblast h2")).toBeInViewport();
});

test("contact links are exact", async ({ page }) => {
  await page.goto("/");
  const contact = page.locator("#contact");
  await expect(contact.locator('a[href="mailto:contact@usmanrais.com"]').first()).toBeVisible();
  await expect(contact.locator('a[href="tel:+393508873712"]')).toHaveCount(1);
  await expect(contact.locator('a[href="https://wa.me/923327979804"]')).toHaveCount(1);
  await expect(page.locator('a[href*="instagram"]')).toHaveCount(0);
});

test("page has title, description and share image", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Usman Rais — Full-stack & mobile developer");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /web apps, mobile apps and online stores/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og-usman-rais\.png$/);
});
