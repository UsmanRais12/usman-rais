import { describe, expect, test } from "vitest";
import * as site from "./site.js";

const { contact, projects, fastblast, studio } = site;

describe("site content", () => {
  test("contact values are exact", () => {
    expect(contact).toMatchObject({
      email: "contact@usmanrais.com",
      phone: "+39 350 887 3712",
      phoneHref: "tel:+393508873712",
      whatsapp: "+92 332 7979804",
      whatsappHref: "https://wa.me/923327979804",
      linkedin: "https://www.linkedin.com/in/usman-raees/",
      github: "https://github.com/UsmanRais12",
      location: "Verona, Italy",
    });
  });

  test("projects are the 6 live sites in order", () => {
    expect(projects.map((p) => [p.slug, p.url])).toEqual([
      ["fastblast", "https://fastblast.com/"],
      ["xo-club-of-clubs", "https://xo-clubofclubs.com/"],
      ["brooklyn-sells", "https://brooklynsells.com/"],
      ["cmd-health-systems", "https://www.cmdhealthsystems.com/"],
      ["actmore-usa", "https://actmoreusa.com/"],
      ["safecover", "https://safecoverllc.com/"],
    ]);
    for (const p of projects) {
      expect(p.name).toBeTruthy();
      expect(p.blurb).toBeTruthy();
      expect(p.role).toBeTruthy();
      expect(p.image).toMatch(/^[a-z0-9]+(-[a-z0-9]+)+\.webp$/);
    }
  });

  test("platform tags are truthful", () => {
    const tags = Object.fromEntries(projects.map((p) => [p.slug, p.tags]));
    for (const s of ["fastblast", "brooklyn-sells", "actmore-usa", "safecover"]) {
      expect(tags[s]).toContain("Shopify");
    }
    expect(tags["xo-club-of-clubs"]).toContain("Next.js");
    expect(tags["cmd-health-systems"]).toContain("Next.js");
    expect(projects.map((p) => p.url).join(" ")).not.toMatch(/digitalmediacafe|healthyperformanceculture|productfare|manofspace/);
    for (const p of projects) {
      for (const bad of ["Vue.js", "Express", "Angular", "mySQL"]) expect(p.tags).not.toContain(bad);
    }
  });

  test("no banned copy", () => {
    const { contact: c, ...rest } = site;
    const { whatsapp, whatsappHref, ...contactRest } = c;
    const text = JSON.stringify({ ...rest, contact: contactRest });
    for (const re of [/passionate/i, /karachi/i, /instagram/i, /kevin/i, /\+92/, /923327979804/]) {
      expect(text).not.toMatch(re);
    }
  });

  test("no unverifiable superlatives in project copy", () => {
    for (const p of projects) {
      expect(p.blurb, p.slug).not.toMatch(/\b(fast|fastest|best|leading|#1|award)\b/i);
    }
  });

  test("fastblast links to Google Play", () => {
    expect(fastblast.playUrl).toBe("https://play.google.com/store/apps/details?id=com.fastblast.app");
    expect(fastblast.screens).toHaveLength(3);
  });

  test("studio links to stackpulsestudios.com", () => {
    expect(studio.url).toBe("https://stackpulsestudios.com/");
  });
});
