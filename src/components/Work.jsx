import { useLayoutEffect, useRef } from "react";
import { projects } from "../content/site.js";
import { gsap } from "../lib/motion.js";
import ProjectCard from "./ProjectCard.jsx";

// Desktop (≥1024px, motion allowed): the section pins and the track slides
// sideways while the page scrolls down. Otherwise: a plain vertical list.
export default function Work() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const track = trackRef.current;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} aria-labelledby="work-title" className="relative overflow-hidden border-t border-line py-20 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:pb-6 lg:pt-24">
      <div className="mx-auto w-full max-w-[90rem] px-5 md:px-10">
        <p className="eyebrow">Selected work</p>
        <h2 id="work-title" className="display mt-3 text-5xl md:text-7xl">
          Things I've <span className="text-lime">shipped</span>
        </h2>
      </div>
      <div ref={trackRef} className="mt-12 flex flex-col gap-16 px-5 md:px-10 lg:w-max lg:flex-row lg:gap-12 lg:pr-[20vw]">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
