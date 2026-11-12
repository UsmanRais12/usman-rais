import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { contact, nav } from "../content/site.js";
import { scrollToId } from "../lib/motion.js";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  const icons = [
    { href: contact.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
    { href: contact.github, label: "GitHub", Icon: FaGithub },
    { href: contact.whatsappHref, label: "WhatsApp", Icon: FaWhatsapp },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid || open ? "bg-ink/90 backdrop-blur" : ""}`}>
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-5 md:px-10">
        <a href="#top" onClick={go("top")} className="font-display text-xl tracking-tight" aria-label="Usman Rais, back to top">
          UR<span className="text-lime">.</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className="text-sm text-mute transition-colors hover:text-paper">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {icons.map(({ href, label, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="hidden rounded-full p-2 text-mute transition-colors hover:text-lime sm:block">
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <button
            type="button"
            className="ml-2 rounded-full border border-line px-4 py-2 text-xs font-semibold uppercase tracking-widest md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Sections" className="border-t border-line px-5 pb-6 md:hidden">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className="display block py-3 text-4xl">
              {n.label}
            </a>
          ))}
          <div className="mt-4 flex gap-3">
            {icons.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="rounded-full border border-line p-3">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
