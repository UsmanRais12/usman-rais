import { useRef } from "react";
import { profile } from "../content/site.js";
import { scrollToId, useParallax } from "../lib/motion.js";

export default function Hero() {
  const nameRef = useRef(null);
  const metaRef = useRef(null);
  useParallax(nameRef, 0.55);
  useParallax(metaRef, 0.9);

  const go = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section id="top" aria-labelledby="hero-name" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-12 pt-28 md:px-10 md:pb-16">
      {/* soft lime glow, drifts with the name */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full bg-lime/10 blur-3xl" />

      <div className="mx-auto w-full max-w-[90rem]">
        <p className="mb-8 inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1 text-xs font-semibold text-ink">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" aria-hidden />
          {profile.available}
        </p>

        <h1 id="hero-name" ref={nameRef} className="display text-[clamp(4.5rem,22vw,15.5rem)]">
          <span className="block">{profile.first}</span>
          <span className="block text-lime">{profile.last}</span>
        </h1>

        <div ref={metaRef} className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">{profile.role}</p>
            <p className="mt-3 text-xl leading-snug text-paper md:text-2xl">{profile.pitch}</p>
            <p className="mt-3 text-sm text-mute">{profile.location}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" onClick={go("contact")} className="btn-lime">
              Start a project <span aria-hidden>→</span>
            </a>
            <a href="#work" onClick={go("work")} className="btn-ghost">
              See work <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
