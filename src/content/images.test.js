import { describe, expect, test } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { projects } from "./site.js";
import { projectImages, fastblastScreens, portrait, studioLogo } from "./images.js";

describe("images", () => {
  test("every project has an image with width and height", () => {
    for (const p of projects) {
      const img = projectImages[p.slug];
      expect(img, p.slug).toBeTruthy();
      expect(img.src).toBeTruthy();
      expect(img.width).toBeGreaterThan(0);
      expect(img.height).toBeGreaterThan(0);
    }
    expect(fastblastScreens).toHaveLength(3);
    for (const s of fastblastScreens) expect(s.width && s.height && s.src).toBeTruthy();
    expect(portrait.src).toBeTruthy();
    expect(studioLogo.src).toBeTruthy();
  });

  test("no template leftovers in src", () => {
    const hits = [];
    const walk = (d) => {
      for (const f of readdirSync(d)) {
        const p = join(d, f);
        if (statSync(p).isDirectory()) walk(p);
        else if (/kevinRush/i.test(f)) hits.push(p);
        else if (/\.(jsx?|css)$/.test(f) && !p.endsWith(".test.js") && /kevinRush|framer-motion/.test(readFileSync(p, "utf8"))) hits.push(p);
      }
    };
    walk("src");
    expect(hits).toEqual([]);
  });
});
