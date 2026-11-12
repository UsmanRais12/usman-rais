import { projectImages } from "../content/images.js";

export default function ProjectCard({ project, index }) {
  const img = projectImages[project.slug];
  return (
    <article data-project={project.slug} className="group flex w-full shrink-0 flex-col lg:w-[min(46rem,62vw)]">
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-line bg-coal" aria-label={`Visit ${project.name}`}>
        <img
          src={img.src}
          width={img.width}
          height={img.height}
          alt={`${project.name} website`}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </a>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow">
            {String(index + 1).padStart(2, "0")} · {project.role}
          </p>
          <h3 className="display mt-2 text-4xl md:text-5xl">{project.name}</h3>
        </div>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-6 shrink-0 text-sm font-semibold text-lime hover:underline">
          Visit site ↗
        </a>
      </div>
      <p className="mt-3 max-w-xl text-mute">{project.blurb}</p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Built with">
        {project.tags.map((t) => (
          <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-paper/80">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}
