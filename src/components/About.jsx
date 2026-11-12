import { useRef } from "react";
import { about, certificates, education, experience } from "../content/site.js";
import { portrait } from "../content/images.js";
import { useParallax } from "../lib/motion.js";
import SkillsTicker from "./SkillsTicker.jsx";

export default function About() {
  const photoRef = useRef(null);
  useParallax(photoRef, 0.85);

  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line pt-24 md:pt-32">
      <div className="mx-auto grid max-w-[90rem] gap-16 px-5 md:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <p className="eyebrow">About</p>
          <div ref={photoRef} className="mt-8 w-56 md:w-72">
            <img
              src={portrait.src}
              width={portrait.width}
              height={portrait.height}
              alt="Usman Rais"
              loading="lazy"
              className="aspect-square w-full rounded-full object-cover ring-[3px] ring-lime ring-offset-[6px] ring-offset-ink"
            />
          </div>
          <h2 id="about-title" className="display mt-10 text-5xl md:text-7xl">
            {about.title}
          </h2>
          {about.body.map((p) => (
            <p key={p} className="mt-5 max-w-lg text-lg leading-relaxed text-paper/85">
              {p}
            </p>
          ))}
        </div>

        <div className="lg:pt-16">
          <h3 className="eyebrow">Experience</h3>
          <ol className="mt-4 divide-y divide-line border-y border-line">
            {experience.map((e) => (
              <li key={e.period + e.role} className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr]">
                <span className="text-sm text-mute">{e.period}</span>
                <span>
                  <span className="block text-lg font-semibold">
                    {e.role} <span className="font-normal text-mute">· {e.org}</span>
                  </span>
                  {e.note && <span className="mt-1 block text-sm text-lime/90">{e.note}</span>}
                </span>
              </li>
            ))}
          </ol>

          <h3 className="eyebrow mt-12">Education</h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {education.map((e) => (
              <li key={e.title} className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr]">
                <span className="text-sm text-mute">{e.period}</span>
                <span className="text-lg">
                  <span className="font-semibold">{e.title}</span> <span className="text-mute">· {e.org}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-mute">{certificates}</p>
        </div>
      </div>
      <div className="mt-24">
        <SkillsTicker />
      </div>
    </section>
  );
}
