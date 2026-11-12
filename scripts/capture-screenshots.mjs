// Captures fresh screenshots of every live project and the FastBlast Google
// Play screenshots, saved as WebP under src/assets. Run: npm run shots
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { projects, fastblast } from "../src/content/site.js";

const WORK = new URL("../src/assets/work/", import.meta.url);
const FB = new URL("../src/assets/fastblast/", import.meta.url);
await mkdir(WORK, { recursive: true });
await mkdir(FB, { recursive: true });

const only = process.argv.slice(2); // optional: slugs to recapture
const browser = await chromium.launch({ channel: "chrome" }); // uses the installed Google Chrome
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: "en-US" });

async function dismissPopups(page) {
  for (let i = 0; i < 3; i++) {
    await page.keyboard.press("Escape").catch(() => {});
    for (const name of [/^(decline|reject|no,? thanks|close|×|✕|x)$/i, /^(accept|ok|got it)$/i]) {
      const btn = page.getByRole("button", { name }).first();
      if (await btn.isVisible().catch(() => false)) await btn.click({ timeout: 1500 }).catch(() => {});
    }
    // Shopify / Klaviyo style modal close icons
    for (const sel of ['[aria-label="Close"]', '[aria-label="Close dialog"]', ".needsclick.klaviyo-close-form", "button.modal__close", ".popup-close"]) {
      const el = page.locator(sel).first();
      if (await el.isVisible().catch(() => false)) await el.click({ timeout: 1500 }).catch(() => {});
    }
    await page.waitForTimeout(600);
  }
}

for (const p of projects) {
  if (only.length && !only.includes(p.slug)) continue;
  const page = await context.newPage();
  try {
    await page.goto(p.url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => page.waitForTimeout(3000));
    await page.waitForTimeout(2500);
    if (p.slug === "brooklyn-sells") {
      // Generic close-clicking opens this theme's side drawer; only decline cookies.
      await page.locator("text=/^\\s*Decline\\s*$/").first().click({ timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(500);
      // The category drawer opens on load at desktop width; its close button is top-left.
      const drawerClose = await page.evaluate(() => {
        const els = [...document.querySelectorAll("button, a, [role=button]")].filter((e) => {
          const r = e.getBoundingClientRect();
          return r.width && r.left < 120 && r.top < 80 && /close/i.test((e.getAttribute("aria-label") || "") + e.className + e.innerText);
        });
        if (els[0]) { els[0].click(); return els[0].outerHTML.slice(0, 80); }
        return null;
      });
      if (!drawerClose) await page.mouse.click(43, 43); // the drawer's ✕ icon
      await page.waitForTimeout(800);
    } else {
      await dismissPopups(page);
    }
    await page.waitForTimeout(1500);
    const png = await page.screenshot({ type: "png" });
    const out = new URL(p.image, WORK);
    await sharp(png).resize(1600, 1000, { fit: "cover", position: "top" }).webp({ quality: 80 }).toFile(out.pathname);
    console.log("saved", p.image);
  } catch (e) {
    console.error("FAILED", p.slug, e.message);
  } finally {
    await page.close();
  }
}

if (!only.length || only.includes("play")) {
  const page = await context.newPage();
  await page.goto(fastblast.playUrl + "&hl=en_US&gl=US", { waitUntil: "networkidle", timeout: 60000 });
  const srcs = await page.$$eval("img", (imgs) =>
    imgs
      .map((i) => i.currentSrc || i.src)
      .filter((s) => /play-lh\.googleusercontent\.com/.test(s))
      .filter((s, i, a) => a.indexOf(s) === i),
  );
  // Keep only tall phone screenshots (the icon and feature graphic are not).
  let saved = 0;
  const seen = new Set();
  for (const src of srcs) {
    if (saved === 3) break;
    const url = src.replace(/=[^=]*$/, "=w720");
    if (seen.has(url)) continue;
    seen.add(url);
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    const meta = await sharp(buf).metadata();
    if (!(meta.height > meta.width * 1.5)) continue;
    const out = new URL(fastblast.screens[saved], FB);
    // Listing graphics are 720x1280 with a heading on top; cut out just the
    // phone (frame included) and round its corners.
    const W = 424, H = 912;
    const mask = Buffer.from(`<svg width="${W}" height="${H}"><rect width="${W}" height="${H}" rx="46" ry="46"/></svg>`);
    await sharp(buf)
      .extract({ left: 150, top: 344, width: W, height: H })
      .composite([{ input: mask, blend: "dest-in" }])
      .webp({ quality: 85, alphaQuality: 100 })
      .toFile(out.pathname);
    console.log("saved", fastblast.screens[saved], meta.width + "x" + meta.height);
    saved++;
  }
  if (saved < 3) console.error("FAILED only", saved, "phone screenshots found");
  await page.close();
}

await browser.close();
