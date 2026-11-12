import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { contact, studio } from "../content/site.js";

export default function Contact() {
  const links = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Phone", value: contact.phone, href: contact.phoneHref },
    { label: "WhatsApp", value: contact.whatsapp, href: contact.whatsappHref, Icon: FaWhatsapp, external: true },
    { label: "LinkedIn", value: "in/usman-raees", href: contact.linkedin, Icon: FaLinkedinIn, external: true },
    { label: "GitHub", value: "UsmanRais12", href: contact.github, Icon: FaGithub, external: true },
  ];
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-5 pb-10 pt-28 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[90rem]">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title" className="display mt-4 text-[clamp(2.5rem,12.5vw,12rem)]">
          <span className="block">Let's build</span>
          <span className="block text-lime">something.</span>
        </h2>
        <a href={`mailto:${contact.email}`} className="btn-lime mt-10 text-base">
          {contact.email} <span aria-hidden>→</span>
        </a>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {links.map(({ label, value, href, Icon, external }) => (
            <li key={label} className="bg-ink">
              <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-coal">
                <span className="eyebrow flex items-center gap-2">
                  {Icon && <Icon className="h-3.5 w-3.5" aria-hidden />}
                  {label}
                </span>
                <span className="break-words text-lg font-semibold group-hover:text-lime">{value}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-mute">Based in {contact.location}. Working with clients worldwide.</p>

        <footer className="mt-24 flex flex-col gap-3 border-t border-line pt-6 text-sm text-mute sm:flex-row sm:justify-between">
          <span>© 2026 Usman Rais</span>
          <span>
            Also building at{" "}
            <a href={studio.url} target="_blank" rel="noopener noreferrer" className="text-paper hover:text-lime">
              {studio.name}
            </a>
          </span>
        </footer>
      </div>
    </section>
  );
}
