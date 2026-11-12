// @vitest-environment jsdom
import { afterEach, describe, expect, test, vi } from "vitest";

function stubMatchMedia(reduce) {
  window.matchMedia = vi.fn().mockImplementation((q) => ({
    matches: reduce && q.includes("prefers-reduced-motion: reduce"),
    media: q,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  }));
}

afterEach(() => {
  vi.resetModules();
});

describe("motion", () => {
  test("prefersReducedMotion() is true when matchMedia matches reduce", async () => {
    stubMatchMedia(true);
    const { prefersReducedMotion } = await import("./motion.js");
    expect(prefersReducedMotion()).toBe(true);
    stubMatchMedia(false);
    expect(prefersReducedMotion()).toBe(false);
  });

  test("initSmoothScroll returns a no-op under reduced motion", async () => {
    stubMatchMedia(true);
    const { initSmoothScroll, getLenis } = await import("./motion.js");
    const cleanup = initSmoothScroll();
    expect(typeof cleanup).toBe("function");
    expect(getLenis()).toBeNull();
    cleanup();
  });

  test("scrollToId falls back to scrollIntoView without Lenis", async () => {
    stubMatchMedia(true);
    const { scrollToId } = await import("./motion.js");
    const el = document.createElement("section");
    el.id = "contact";
    el.scrollIntoView = vi.fn();
    document.body.appendChild(el);
    scrollToId("contact");
    expect(el.scrollIntoView).toHaveBeenCalled();
  });
});
