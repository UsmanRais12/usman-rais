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

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
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
