import { useEffect } from "react";
import { initSmoothScroll } from "./lib/motion.js";
import { nav } from "./content/site.js";

// Sections are filled in by later tasks; each keeps its anchor id.
function Stub({ id, label }) {
  return (
    <section id={id} className="flex min-h-[60vh] items-center px-5 md:px-10">
      <h2 className="display text-6xl">{label}</h2>
    </section>
  );
}

export default function App() {
  useEffect(() => initSmoothScroll(), []);
  return (
    <main id="main">
      <section className="flex min-h-screen items-center px-5 md:px-10">
        <h1 className="display text-[16vw]">
          USMAN <span className="text-lime">RAIS</span>
        </h1>
      </section>
      {nav.map((n) => (
        <Stub key={n.id} {...n} />
      ))}
    </main>
  );
}
