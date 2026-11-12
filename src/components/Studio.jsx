import { studio } from "../content/site.js";
import { studioLogo } from "../content/images.js";

export default function Studio() {
  return (
    <section id="studio" aria-labelledby="studio-title" className="border-t border-line px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[90rem] rounded-3xl bg-lime p-8 text-ink md:p-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <img src={studioLogo.src} width={studioLogo.width} height={studioLogo.height} alt={studio.name} loading="lazy" className="h-11 w-auto rounded-lg bg-ink px-3 py-2 md:h-14" />
            <h2 id="studio-title" className="display mt-8 text-5xl md:text-7xl">
              {studio.pitch}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-ink/80">{studio.body}</p>
          </div>
          <div className="flex flex-col items-start gap-6">
            <ul className="flex flex-wrap gap-2" aria-label="Services">
              {studio.services.map((s) => (
                <li key={s} className="rounded-full border border-ink/25 px-4 py-1.5 text-sm font-medium">
                  {s}
                </li>
              ))}
            </ul>
            <a href={studio.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-lime transition-transform hover:-translate-y-0.5">
              Visit Stack Pulse Studios ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
