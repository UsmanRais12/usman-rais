# usmanrais.com redesign: design

Date: 2026-11-12
Repo: `UsmanRais12/usman-rais` (local clone `~/Websites/usman-rais`)

## Intent

usmanrais.com is the site prospective clients open to judge Usman's work
before hiring him. Today it is a lightly edited YouTube portfolio template
(files still named `kevinRush…`), with out-of-date facts (Karachi, +92,
"4 years") and none of the recent work (FastBlast, XO Club, Brooklyn Sells,
Stack Pulse Studios). The redesign should make a client think "this person
builds polished, modern products, and here they are, live", and make it easy
to start a conversation.

## Goals

- One page, redesigned from scratch in the "Bold & loud" direction (chosen by
  Usman from three mockups): near-black background, one electric lime accent,
  huge heavy type, a punchy agency feel.
- Parallax motion throughout (requested by Usman).
- The portfolio shows real, live work, with three new entries: FastBlast,
  Brooklyn Sells, XO Club of Clubs (the coming-soon page on its real domain).
- FastBlast gets its own spotlight section.
- A Stack Pulse Studios section, as a secondary offer for clients who need
  a full team. The site is mainly about Usman himself.
- Correct, current personal details.
- All copy rewritten: short, confident, client-focused.

## Non-goals

- No multi-page site, blog, CMS or case-study subpages. It stays one page.
- No contact form backend. Contact is by links (mail, phone, WhatsApp).
- No new hosting provider or domain change.

## Anti-goals (failure even if it "works")

- Invented claims: no made-up metrics, client counts, testimonials, awards or
  results. Only facts listed in this document.
- Motion that makes the page slow, janky on phones, or unreadable, or that
  ignores `prefers-reduced-motion`.
- Anything going live on usmanrais.com before Usman approves a preview.
- Template leftovers (kevinRush files, generic stock bits).

## Constraints and decisions made with Usman

**Page order:**
1. Hero
2. Selected work
3. FastBlast spotlight
4. Stack Pulse Studios
5. About (with photo)
6. Contact

**Hero:** text only, no photo (Usman picked option C of three). It shows:
- "UR." mark and a small "Available for projects" pill
- "USMAN RAIS" in huge heavy type, with "RAIS" in lime
- a one-line pitch; location Verona, Italy, working worldwide
- two buttons: "Start a project" (jumps to contact) and "See work"

The name layer moves slower than the page (parallax).

**Navigation:** Work · FastBlast · Studio · About · Contact, as anchor links,
plus icon links: LinkedIn, GitHub, WhatsApp. Instagram is dropped. That was
Claude's call, which Usman didn't object to.

**Selected work:** a strip that pins and slides sideways while the user
scrolls down (desktop). On phones it becomes a normal vertical list or a
swipeable row; the builder decides which. Each card shows:
- a fresh screenshot of the live site
- the project name
- 1–2 lines on what it is and what Usman did
- true tech tags
- a link to the live site

**Usman built every project listed below himself** (his answer on 2026-11-12,
"everything I built"). That includes the fastblast.com Shopify store as well
as the app, the Brooklyn Sells store, and CMD Health Systems. Cards say
"Designed & built by me" (or similar) plus the platform. XO Club and CMD may
also mention "via Stack Pulse Studios".

Projects, in order (Usman asked for the first three to be added):

| Project | URL | Platform (checked 2026-11-12) |
|---|---|---|
| FastBlast | https://fastblast.com/ | Shopify site; the app is React Native/Expo, live on Google Play |
| XO Club of Clubs | https://xo-clubofclubs.com/ | Next.js (coming-soon page with film and parallax) |
| Brooklyn Sells | https://brooklynsells.com/ | Shopify |
| CMD Health Systems | https://www.cmdhealthsystems.com/ (cmdhealthglobal.com redirects here) | Next.js |
| ACTMORE USA | https://actmoreusa.com/ | Shopify |
| Safecover LLC | https://safecoverllc.com/ | Shopify |
| Digital Media Cafe | https://digitalmediacafe.com/ | Shopify |
| Healthy Performance Culture | https://healthyperformanceculture.com/ | WordPress |

**Dropped (Claude's call):** Productfare and Man of Space no longer load
(checked 2026-11-12). Dead links hurt a portfolio, so they are left out. They
can come back if Usman asks.

**FastBlast spotlight:** its own section:
- 2–3 phone screens floating at different parallax speeds
- the story: an intermittent-fasting app with fasting plans, meal tracking and
  an AI coach
- Usman's role: lead developer (React Native / Expo)
- "Get it on Google Play" badge linking to
  https://play.google.com/store/apps/details?id=com.fastblast.app

The phone screens come from the public Google Play listing screenshots
(Claude's call). The old local folder `~/Desktop/FastBlast Builds/Store
listing/` no longer exists.

**Stack Pulse Studios:** a short block: "Need a full team? My studio builds
it end to end". It covers websites, apps and Shopify stores. Brand assets are
in `~/StackPulse/Website/stackpulse-site/src/assets` (`logo-nav-light.png`
for dark backgrounds). There is no public studio URL; see open questions.

**About:**
- Photo: the relaxed office photo (`src/assets/about.jpg`) in a circle with a
  lime ring. The suit cutout is not used.
- A short timeline:
  - Technical Lead at Masterofecom (US e-commerce, remote), Sep 2023–present;
    earlier Senior Software Engineer Mar 2022–Sep 2023 and Web Developer
    Nov 2020–Mar 2022
  - React Native Developer intern at Ayeece, Jul 2019–Oct 2020
  - Freelance: Upwork 100% Job Success, Fiverr Level 1
- Education: MSc Data Science, University of Verona (2025–2027); BS Computer
  Science, Indus University (2020–2024).
- Certificates collapse to one line: Udemy React Native; DigiSkills WordPress
  and Freelancing.
- A skills ticker that runs across the screen: React, React Native, Next.js,
  Node.js, TypeScript, Shopify, WordPress, MongoDB, Firebase, Figma.

**Contact:** a big "LET'S BUILD SOMETHING." call to action, plus:
- Email: contact@usmanrais.com
- Phone: +39 350 887 3712
- WhatsApp: +92 332 7979804 (a different number from the phone, by Usman's
  instruction)
- LinkedIn: https://www.linkedin.com/in/usman-raees/
- GitHub: https://github.com/UsmanRais12
- Location: Verona, Italy

**Copy:** Claude writes all of it; Usman reviews it in the preview. The tone
is short, confident and client-focused, without "passionate developer"
filler. Hero pitch direction: "I build web apps, mobile apps and online
stores for brands in the US and Europe."

**Tech (Claude's call, stated to Usman):**
- Keep React + Vite + Tailwind.
- Add GSAP + ScrollTrigger and Lenis for smooth scroll, parallax and the
  pinned sideways strip. Framer Motion may be dropped.
- Images are WebP with descriptive file names, lazy-loaded below the fold.
- `prefers-reduced-motion` turns off parallax and pinning; content stays
  readable.
- Mobile-first; no horizontal page overflow.

**Release (Claude's call; Usman didn't answer the deploy question):**
- The live site is on Netlify behind Cloudflare (Netlify edge headers seen
  on 2026-11-12). There is no Netlify CLI or login on this Mac, and it's
  unknown whether `main` auto-deploys.
- So: **never push to `main`.** Work on the branch `redesign-2026`, pushed to
  GitHub. Review it in a local preview (`vite preview`) and, if Usman wants a
  shareable link, a preview-only deploy on his Vercel Hobby team.
  Production stays on Netlify.
- Usman does the final switch himself: merge to `main`, or let Claude do it
  once he confirms how Netlify deploys.

## Left to the builder

- Exact fonts within the "huge heavy grotesk" brief; the exact lime shade
  (mockup used `#d4ff3f`) and contrast-safe text greys.
- How screenshots are captured (headless browser at a desktop viewport) and
  cropped.
- The phone pattern for the work strip.
- Section transitions, hover states, cursor effects, the loading sequence.
- Favicon, meta tags, Open Graph image, basic SEO (title, description).
- Removing unused dependencies and the old template assets.

## Settled after review

- Stack Pulse Studios block: its button scrolls to the contact block
  (Claude's call; there is no public studio URL).
