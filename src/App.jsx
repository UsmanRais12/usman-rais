import { useEffect } from "react";
import { initSmoothScroll } from "./lib/motion.js";
import { nav } from "./content/site.js";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";

// Sections not built yet keep their anchor id.
function Stub({ id, label }) {
  return (
    <section id={id} className="flex min-h-[60vh] items-center border-t border-line px-5 md:px-10">
      <h2 className="display text-6xl">{label}</h2>
    </section>
  );
}

export default function App() {
  useEffect(() => initSmoothScroll(), []);
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        {nav
          .filter((n) => n.id !== "work")
          .map((n) => (
            <Stub key={n.id} {...n} />
          ))}
      </main>
    </>
  );
}
