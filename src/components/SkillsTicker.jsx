import { skills } from "../content/site.js";

// Two copies of the list slide left forever (transform only); the CSS pauses
// it under prefers-reduced-motion.
export default function SkillsTicker() {
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {skills.map((s) => (
        <li key={s} className="display flex items-center px-6 text-4xl text-paper/90 md:text-6xl">
          {s}
          <span className="ml-12 text-lime" aria-hidden>
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-line py-6" aria-label="Skills">
      <div className="marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
