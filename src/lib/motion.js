// All page motion lives here: Lenis smooth scroll + GSAP ScrollTrigger.
// Under prefers-reduced-motion every effect is skipped and content stays in
// normal flow.
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const NAV_OFFSET = -72;
let lenis = null;

export function prefersReducedMotion() {
  return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export function getLenis() {
  return lenis;
}

export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener("resize", onResize);
  return () => {
    window.removeEventListener("resize", onResize);
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

/**
 * Scrolls to a section, then moves keyboard focus to it and puts its id in
 * the address bar, like a normal in-page link. `immediate` skips the glide
 * (used when a page opens on a #hash).
 */
export function scrollToId(id, { immediate = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  const done = () => {
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
    if (id !== "top") history.replaceState(null, "", `#${id}`);
    else history.replaceState(null, "", location.pathname);
  };
  if (lenis) {
    // Lenis caches the page height; the pinned work strip adds height after
    // first paint, so re-measure or the jump is clamped short.
    lenis.resize();
    lenis.scrollTo(el, { offset: NAV_OFFSET, immediate, force: true, onComplete: done });
    if (immediate) {
      done();
      // Late layout (images, pin refresh) can still move the target: correct once.
      setTimeout(() => {
        const off = el.getBoundingClientRect().top + NAV_OFFSET;
        if (Math.abs(off) > 4) {
          lenis.resize();
          lenis.scrollTo(el, { offset: NAV_OFFSET, immediate: true, force: true });
        }
      }, 400);
    }
  } else {
    el.scrollIntoView({ behavior: immediate || prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    done();
  }
}

/** Jumps the page to an absolute scroll position, keeping Lenis in sync. */
export function scrollToY(y) {
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo(0, y);
  ScrollTrigger.update();
}

/** If the page opened on a #hash, land on that section once layout settles. */
export function scrollToHashOnLoad() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id || !document.getElementById(id)) return () => {};
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  let cancelled = false;
  const go = () => {
    if (cancelled) return;
    ScrollTrigger.refresh();
    scrollToId(id, { immediate: true });
  };
  (document.fonts?.ready ?? Promise.resolve()).then(() => requestAnimationFrame(go));
  return () => {
    cancelled = true;
  };
}

/**
 * Moves `ref` vertically against the scroll. speed < 1 lags behind the page,
 * > 1 runs ahead. Distance scales with the element's own height.
 */
export function useParallax(ref, speed = 0.8) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const shift = (1 - speed) * 220;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -shift },
        {
          y: shift,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        },
      );
    });
    return () => ctx.revert();
  }, [ref, speed]);
}

export { gsap, ScrollTrigger };
