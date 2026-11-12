import { useLayoutEffect, useRef } from "react";
import { projects } from "../content/site.js";
import { gsap, scrollToY } from "../lib/motion.js";
import ProjectCard from "./ProjectCard.jsx";

// Desktop (≥1024px, motion allowed): the section pins and the track slides
// sideways while the page scrolls down. Otherwise: a plain vertical list.
export default function Work() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const track = trackRef.current;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      tweenRef.current = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          // Lenis already smooths the scroll; a direct scrub keeps the strip in
          // step with keyboard and find-in-page jumps.
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tweenRef.current = null;
      };
    });
    return () => mm.revert();
  }, []);

  // When keyboard focus lands on a card that is off to the side, scroll the
  // page to the point where the strip shows that card.
  const onFocus = (e) => {
    const st = tweenRef.current?.scrollTrigger;
    const card = e.target.closest("[data-project]");
    if (!st || !card) return;
    const track = trackRef.current;
    const maxX = Math.max(1, track.scrollWidth - window.innerWidth);
    const x = Math.min(maxX, Math.max(0, card.offsetLeft - 40));
    scrollToY(st.start + (x / maxX) * (st.end - st.start));
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-labelledby="work-title"
      // overflow:clip (not hidden) so focus/find can never scroll the section itself
      className="relative overflow-x-clip border-t border-line py-20 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:overflow-clip lg:pb-6 lg:pt-24"
    >
      <div className="mx-auto w-full max-w-[90rem] px-5 md:px-10">
        <p className="eyebrow">Selected work</p>
        <h2 id="work-title" className="display mt-3 text-5xl md:text-7xl">
          Things I&apos;ve <span className="text-lime">shipped</span>
        </h2>
      </div>
      <div ref={trackRef} onFocus={onFocus} className="mt-12 flex flex-col gap-16 px-5 md:px-10 lg:motion-safe:w-max lg:motion-safe:flex-row lg:motion-safe:gap-12 lg:motion-safe:pr-[20vw] lg:motion-reduce:grid lg:motion-reduce:grid-cols-2 lg:motion-reduce:gap-12">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
