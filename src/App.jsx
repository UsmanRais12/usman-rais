import { useEffect } from "react";
import { initSmoothScroll, scrollToHashOnLoad } from "./lib/motion.js";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import FastBlast from "./components/FastBlast.jsx";
import Studio from "./components/Studio.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  useEffect(() => {
    const stopScroll = initSmoothScroll();
    const stopHash = scrollToHashOnLoad();
    return () => {
      stopHash();
      stopScroll();
    };
  }, []);
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <FastBlast />
        <Studio />
        <About />
        <Contact />
      </main>
    </>
  );
}
