// Renders the "UR." favicon set and the Open Graph share image with the site's
// own fonts. Run: node scripts/make-brand-images.mjs
import { chromium } from "@playwright/test";
import sharp from "sharp";

const fonts = `<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@500;600&display=swap" rel="stylesheet">`;
const base = `*{margin:0}body{background:#0a0a0a;color:#fafafa;font-family:"Archivo Black",sans-serif}`;

const icon = `<!doctype html><html><head>${fonts}<style>${base}
  body{width:512px;height:512px;display:grid;place-items:center;border-radius:112px;overflow:hidden}
  .m{font-size:250px;letter-spacing:-0.06em;line-height:1;transform:translate(-6px,8px)}
  .m b{color:#d4ff3f;font-weight:400}</style></head>
  <body><div class="m">UR<b>.</b></div></body></html>`;

const og = `<!doctype html><html><head>${fonts}<style>${base}
  body{width:1200px;height:630px;padding:64px 72px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
  .glow{position:absolute;right:-160px;top:-120px;width:620px;height:620px;border-radius:50%;background:rgba(212,255,63,.12);filter:blur(60px)}
  .top{display:flex;justify-content:space-between;align-items:center;font-size:34px}
  .top b{color:#d4ff3f;font-weight:400}
  .pill{font-family:Inter,sans-serif;font-weight:600;font-size:20px;background:#d4ff3f;color:#0a0a0a;padding:8px 18px;border-radius:99px}
  h1{font-size:168px;line-height:.86;letter-spacing:-0.045em;font-weight:400}
  h1 span{color:#d4ff3f}
  p{font-family:Inter,sans-serif;font-weight:500;font-size:28px;color:#a3a3a3}</style></head>
  <body><div class="glow"></div>
  <div class="top"><div>UR<b>.</b></div><div class="pill">Available for projects</div></div>
  <div><h1>USMAN<br><span>RAIS</span></h1></div>
  <p>Full-stack &amp; mobile developer · Web apps, mobile apps and online stores</p></body></html>`;

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ deviceScaleFactor: 1 });

await page.setViewportSize({ width: 512, height: 512 });
await page.setContent(icon, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const iconPng = await page.screenshot({ omitBackground: true });
await sharp(iconPng).resize(64, 64).png().toFile("public/favicon.png");
await sharp(iconPng).resize(180, 180).png().toFile("public/apple-touch-icon.png");
await sharp(iconPng).resize(512, 512).png().toFile("public/icon-512.png");

await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(og, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await sharp(await page.screenshot()).png({ compressionLevel: 9 }).toFile("public/og-usman-rais.png");

await browser.close();
console.log("saved favicon.png, apple-touch-icon.png, icon-512.png, og-usman-rais.png");
