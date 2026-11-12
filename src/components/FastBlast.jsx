import { useRef } from "react";
import { FaGooglePlay } from "react-icons/fa6";
import { fastblast } from "../content/site.js";
import { fastblastScreens } from "../content/images.js";
import { useParallax } from "../lib/motion.js";

function Phone({ img, alt, speed, className = "" }) {
  const ref = useRef(null);
  useParallax(ref, speed);
  return (
    <div ref={ref} className={`w-[32%] shrink-0 ${className}`}>
      <img
        src={img.src}
        width={img.width}
        height={img.height}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full rounded-[2rem] shadow-[0_30px_80px_-20px_rgba(212,255,63,0.25)]"
      />
    </div>
  );
}

export default function FastBlast() {
  const alts = ["FastBlast app home screen with today's fasting plan", "FastBlast meal logging screen", "FastBlast AI coach chat"];
  return (
    <section id="fastblast" aria-labelledby="fastblast-title" className="relative overflow-hidden border-t border-line px-5 py-24 md:px-10 md:py-36">
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-lime/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-[90rem] items-center gap-16 lg:grid-cols-2 [&>*]:min-w-0">
        <div>
          <p className="eyebrow">{fastblast.kicker}</p>
          <h2 id="fastblast-title" className="display mt-3 text-[clamp(2.5rem,13vw,6rem)]">
            Fast<span className="text-lime">Blast</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/90">{fastblast.blurb}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {fastblast.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-paper/85">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-lime" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-mute">
            <span className="text-paper">{fastblast.role}</span> · {fastblast.stack.join(" · ")}
          </p>
          <a href={fastblast.playUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-xl border border-paper/20 bg-coal px-5 py-3 transition-colors hover:border-lime">
            <FaGooglePlay className="h-6 w-6 text-lime" aria-hidden />
            <span className="leading-tight">
              <span className="block text-[0.65rem] uppercase tracking-widest text-mute">Get it on</span>
              <span className="block text-lg font-semibold">Google Play</span>
            </span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-[3%]">
          <Phone img={fastblastScreens[1]} alt={alts[1]} speed={0.75} className="translate-y-10" />
          <Phone img={fastblastScreens[0]} alt={alts[0]} speed={0.95} className="-translate-y-6" />
          <Phone img={fastblastScreens[2]} alt={alts[2]} speed={1.15} className="translate-y-14" />
        </div>
      </div>
    </section>
  );
}
