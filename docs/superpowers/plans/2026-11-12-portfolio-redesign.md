# usmanrais.com Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild usmanrais.com as a one-page "Bold & loud" portfolio. It has
parallax motion, a pinned sideways work strip, a FastBlast spotlight, a Stack
Pulse Studios block, an About section with a photo, and current contact
details.

**Architecture:**
- All copy and data live in one content module (`src/content/site.js`). The
  section components only render it.
- Motion is centralised in `src/lib/motion.js`: Lenis smooth scroll plus GSAP
  ScrollTrigger. Every effect is skipped under `prefers-reduced-motion`.
- Project screenshots are captured from the live sites by a Playwright script
  and committed as WebP.

**Tech Stack:**
- Existing: React 18, Vite 5, Tailwind 3
- Added: gsap (+ ScrollTrigger), lenis, vitest, @playwright/test, sharp (dev,
  WebP encoding)
- Removed: framer-motion

**Spec:** `docs/superpowers/specs/2026-11-12-portfolio-redesign-design.md`

## Global Constraints

- One page only. Section order: Hero → Work → FastBlast → Studio → About →
  Contact. Anchor ids: `work`, `fastblast`, `studio`, `about`, `contact`.
- Palette:
  - background `#0a0a0a`
  - accent lime `#d4ff3f`
  - text `#fafafa`
  - muted greys (builder's choice) must reach WCAG AA on `#0a0a0a`
- Hero is text only: "USMAN RAIS" with "RAIS" in lime, an "Available for
  projects" pill, "Start a project" (→ `#contact`) and "See work"
  (→ `#work`).
- No invented claims. The only allowed credentials:
  - Technical Lead at Masterofecom (Sep 2023–present); Senior Software
    Engineer (Mar 2022–Sep 2023); Web Developer (Nov 2020–Mar 2022)
  - React Native Developer intern at Ayeece (Jul 2019–Oct 2020)
  - Upwork 100% Job Success; Fiverr Level 1
  - MSc Data Science, University of Verona (2025–2027); BS Computer Science,
    Indus University (2020–2024)
  - Udemy React Native; DigiSkills WordPress and Freelancing
  - Usman designed and built every listed project
  - FastBlast is live on Google Play
- Contact, exactly:
  - email `contact@usmanrais.com`
  - phone `+39 350 887 3712` (tel `+393508873712`)
  - WhatsApp `+92 332 7979804` (link `https://wa.me/923327979804`)
  - LinkedIn `https://www.linkedin.com/in/usman-raees/`
  - GitHub `https://github.com/UsmanRais12`
  - location "Verona, Italy"
- No Instagram, no Karachi, no +92 phone number (+92 appears only as WhatsApp),
  no "passionate", no `kevinRush` anything.
- Studio link: `https://stackpulsestudios.com/`.
- Google Play link: `https://play.google.com/store/apps/details?id=com.fastblast.app`.
- Images: WebP, lowercase-hyphenated descriptive names, `loading="lazy"`
  below the fold, with explicit width/height or aspect-ratio.
- `prefers-reduced-motion: reduce` disables Lenis, all parallax and the pin;
  all content stays visible and in normal flow.
- Never push to `main` (Netlify deploys `main` to production). Work on
  `redesign-2026`.

## Review Focus

1. **Phone widths (360–390 px):** the page must never scroll sideways. The
   work strip becomes a vertical list below the `lg` breakpoint (1024 px).
   → Task 6 e2e test `no horizontal overflow at 360px and 390px`.
2. **Reduced motion:** nothing is pinned or moved, and all 8 project cards
   are visible by scrolling normally.
   → Task 6 e2e test `reduced motion shows every project without pinning`.
3. **Nav anchors through the pinned section:** clicking "Contact" or
   "FastBlast" lands with the section's heading in the viewport, even though
   the pin adds scroll length.
   → Task 6 e2e test `nav links land on their sections`.
4. **Resize or rotate after load:** the strip's scroll length must recompute
   so the last card is reachable and nothing overlaps the next section. Call
   `ScrollTrigger.refresh()` on resize; `scrub` with `invalidateOnRefresh`.
   → Task 6 e2e test `last project card reachable after resize`.
5. **Slow or failed images:** cards keep their size (fixed aspect ratio), and
   the layout does not jump. → Task 3 unit test `every project has an image
   with width and height`.

---

## File Map

| File | Responsibility |
|---|---|
| `src/content/site.js` | All copy and data: `profile`, `contact`, `projects`, `fastblast`, `studio`, `experience`, `education`, `certificates`, `skills`, `nav` |
| `src/content/site.test.js` | Content rules (facts, contact values, banned words, project list) |
| `src/lib/motion.js` | `prefersReducedMotion()`, `initSmoothScroll()`, `useParallax(ref, speed)`, `scrollToId(id)` |
| `src/components/Nav.jsx` | Sticky top bar, anchor links, icon links |
| `src/components/Hero.jsx` | Type-only hero with parallax name |
| `src/components/Work.jsx` + `ProjectCard.jsx` | Pinned sideways strip (≥ lg), vertical list (< lg) |
| `src/components/FastBlast.jsx` | Spotlight with 3 floating phone screens and a Play badge |
| `src/components/Studio.jsx` | Stack Pulse Studios block |
| `src/components/About.jsx` + `SkillsTicker.jsx` | Photo, timeline, education, certificates line, ticker |
| `src/components/Contact.jsx` | Big CTA and contact links, footer line |
| `src/App.jsx`, `src/index.css`, `tailwind.config.js`, `index.html` | Shell, tokens, fonts, meta |
| `scripts/capture-screenshots.mjs` | Playwright capture of live sites and Play listing images → WebP |
| `src/assets/work/*.webp`, `src/assets/fastblast/*.webp`, `src/assets/about/*.webp`, `src/assets/studio/*.webp` | Images |
| `tests/e2e/page.spec.js`, `playwright.config.js` | Browser checks against `vite preview` |

Delete: `src/constants/`, the old components (Aboutus, Technologies,
Experience, Certificates, Projects, Hero, Navbar, Contact), `src/assets/kevinRush*`,
`src/assets/react.svg`, and `src/assets/projects/` once replaced.

---

### Task 1: Content module and tooling

**Files:**
- Create: `src/content/site.js`, `src/content/site.test.js`
- Modify: `package.json` (add `vitest` dev dep; scripts `"test": "vitest run"`)

**Interfaces:**
- Produces, named exports from `src/content/site.js`:
  - `profile = { name, role, pitch, location, available: true }`
  - `contact = { email, phone, phoneHref, whatsapp, whatsappHref, linkedin, github, location }`
  - `nav = [{ id, label }]`, with ids `work`, `fastblast`, `studio`, `about`, `contact`
  - `projects = [{ slug, name, url, platform, tags: string[], blurb, role, image }]`
    in this order: fastblast, xo-club-of-clubs, brooklyn-sells,
    cmd-health-systems, actmore-usa, safecover, digital-media-cafe,
    healthy-performance-culture.
    `image` is a filename string like `fastblast-shopify-store.webp`;
    Task 3 wires the imports.
  - `fastblast = { title, blurb, features: string[], role, stack: string[], playUrl, screens: string[] }`
  - `studio = { name, pitch, services: string[], url }`
  - `experience = [{ period, role, org, note }]`, `education = [...]`,
    `certificates: string`, `skills: string[]`

- [ ] **Step 1: Write the failing tests in `src/content/site.test.js`**
  - `contact values are exact`: assert each value equals the Global
    Constraints value.
  - `projects are the 8 live sites in order`: `projects.map(p => p.slug)`
    equals the list above. URLs:
    - `https://fastblast.com/`
    - `https://xo-clubofclubs.com/`
    - `https://brooklynsells.com/`
    - `https://www.cmdhealthsystems.com/`
    - `https://actmoreusa.com/`
    - `https://safecoverllc.com/`
    - `https://digitalmediacafe.com/`
    - `https://healthyperformanceculture.com/`
  - `platform tags are truthful`:
    - fastblast, brooklyn-sells, actmore-usa, safecover and
      digital-media-cafe include `Shopify`
    - xo-club-of-clubs and cmd-health-systems include `Next.js`
    - healthy-performance-culture includes `WordPress`
    - no project includes `Vue.js`, `Express`, `Angular` or `mySQL`
  - `no banned copy`: `JSON.stringify(allExports)` matches none of
    `/passionate/i`, `/karachi/i`, `/instagram/i`, `/kevin/i`, `/\+92 3\d{2} \d+/`
    outside `contact.whatsapp` (test it with WhatsApp removed).
  - `fastblast links to Google Play`: `fastblast.playUrl` equals the Play URL;
    `fastblast.screens.length === 3`.
  - `studio links to stackpulsestudios.com`.
- [ ] **Step 2:** Run `npx vitest run src/content`. Expected: FAIL (module
  missing).
- [ ] **Step 3:** Write `src/content/site.js`.
  - Copy rules: short, confident, client-facing. Each project `blurb` is 1–2
    sentences on what the business is. `role` reads like "Designed & built
    the Shopify store" or "Designed & built via Stack Pulse Studios" (XO Club
    and CMD).
  - Hero `pitch`: "I build web apps, mobile apps and online stores for brands
    in the US and Europe." Light edits are allowed; keep the meaning.
- [ ] **Step 4:** Run `npx vitest run src/content`. Expected: PASS.
- [ ] **Step 5:** Commit `feat: content module for redesign`.

### Task 2: Screenshots and images

**Files:**
- Create: `scripts/capture-screenshots.mjs`, `src/assets/work/*.webp`,
  `src/assets/fastblast/*.webp`, `src/assets/about/usman-rais-portrait.webp`,
  `src/assets/studio/stack-pulse-studios-logo.webp`
- Modify: `package.json` (dev deps `@playwright/test`, `sharp`; script `"shots": "node scripts/capture-screenshots.mjs"`)

**Interfaces:**
- Consumes: `projects[].url`, `projects[].image`, and `fastblast.screens`
  from Task 1.
- Produces: one 1600×1000 WebP per project at `src/assets/work/<image>`, and
  three Play listing screenshots at `src/assets/fastblast/<screens[i]>`.

- [ ] **Step 1:** Write the script:
  - Chromium at 1440×900. Dismiss cookie and newsletter popups by pressing
    Escape and clicking buttons named Accept, Close or ×; decline where
    offered.
  - Wait for network idle plus 2 s, then screenshot the viewport.
  - Use sharp to resize to 1600 wide, crop to 1600×1000 and encode WebP
    q=80.
  - For FastBlast screens: open the Play listing URL and collect the first
    3 screenshot `img` srcs (append `=w720` to the googleusercontent URL).
    Download them and encode WebP.
- [ ] **Step 2:** Run `npx playwright install chromium && npm run shots`.
  Expected: 8 + 3 files written; the log lists each one.
- [ ] **Step 3:** Open each WebP and check it by eye. No popup may cover the
  page. If one does, add that site's selector to the script and rerun.
- [ ] **Step 4:** Convert the photo and logo:
  - `about.jpg` → `usman-rais-portrait.webp`: 800×800, centre crop on the
    face
  - `~/StackPulse/Website/stackpulse-site/src/assets/logo-nav-light.png` →
    `stack-pulse-studios-logo.webp`
- [ ] **Step 5:** Commit `feat: project screenshots and images`.

### Task 3: Shell, tokens and motion library

**Files:**
- Create: `src/lib/motion.js`, `src/lib/motion.test.js`, `src/content/images.js`, `src/content/images.test.js`
- Modify: `src/App.jsx`, `src/main.jsx`, `src/index.css`, `tailwind.config.js`, `index.html`, `package.json` (add `gsap`, `lenis`; remove `framer-motion`)
- Delete: the old template files listed in the File Map

**Interfaces:**
- Produces:
  - `prefersReducedMotion(): boolean`
  - `initSmoothScroll(): () => void`: starts Lenis, wires
    `lenis.on('scroll', ScrollTrigger.update)` and the GSAP ticker, and
    returns a cleanup function. It is a no-op returning `() => {}` when
    reduced motion is on.
  - `useParallax(ref, speed = 0.8)`: a React hook; a GSAP y-tween scrubbed
    over the element's scroll range, skipped under reduced motion.
  - `scrollToId(id: string)`: Lenis `scrollTo('#'+id, { offset: -72 })`;
    falls back to `element.scrollIntoView()`.
  - `projectImages: Record<string, { src, width: 1600, height: 1000 }>` from
    `src/content/images.js`, keyed by slug, plus `fastblastScreens` and
    `portrait`.
  - Tailwind colours `ink` `#0a0a0a`, `lime` `#d4ff3f`, `paper` `#fafafa`.
  - Display font: a heavy grotesk from Google Fonts (builder's choice, e.g.
    "Archivo Black" or "Anton" for display, "Inter" for text).

- [ ] **Step 1: Write the failing tests**
  - `motion.test.js`: `prefersReducedMotion() is true when matchMedia
    matches reduce` (stub `window.matchMedia`) and `initSmoothScroll returns
    a no-op under reduced motion` (jsdom; assert no Lenis instance is
    created).
  - `images.test.js`: `every project has an image with width and height`.
    For each slug in `projects`, `projectImages[slug]` exists with `width`
    and `height` > 0, and `fastblastScreens.length === 3`.
  - Add `no template leftovers`: recursively read `src/` and assert no file
    content or name matches `/kevinRush|framer-motion/`.
- [ ] **Step 2:** Run `npx vitest run`. Expected: FAIL.
- [ ] **Step 3:** Implement the motion library, `images.js`, tokens and the
  `App` shell. `App` renders `Nav`, the sections in order with their ids, and
  `Contact`; for now the sections are stubs returning `<section id>` with a
  heading. Delete the old files and run
  `npm i gsap lenis && npm rm framer-motion`. Add `vitest` environment
  `jsdom` (`npm i -D jsdom`).
- [ ] **Step 4:** Run `npx vitest run && npm run build`. Expected: all tests
  PASS; the build succeeds.
- [ ] **Step 5:** Commit `feat: shell, design tokens, motion library`.

### Task 4: Nav, Hero and Work strip

**Files:**
- Create: `src/components/Nav.jsx`, `Hero.jsx`, `Work.jsx`, `ProjectCard.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `profile`, `nav`, `contact`, `projects`, `projectImages`,
  `useParallax`, `scrollToId`, `prefersReducedMotion`.

- [ ] **Step 1: Build the Nav.** Sticky, transparent over the hero, solid ink
  after 24 px of scroll.
  - Contents: the "UR." mark, anchor links from `nav` (they call
    `scrollToId`), and icons for LinkedIn, GitHub and WhatsApp (react-icons).
  - Phones: anchor links collapse into a menu button.
- [ ] **Step 2: Build the Hero.** It fills the screen.
  - "USMAN" and "RAIS" lines in display type, `clamp(4rem, 16vw, 15rem)`.
  - The name wrapper uses `useParallax(ref, 0.6)`.
  - Also: the pitch, the location line, the lime "Available for projects"
    pill, and the two buttons.
- [ ] **Step 3: Build the Work strip.**
  - Each card shows the 16:10 screenshot (`aspect-[16/10]`, with width and
    height attributes), the name, the role line, the blurb, tag chips, and
    "Visit site ↗" (`target="_blank" rel="noopener"`).
  - At `≥ 1024px` without reduced motion: pin the section and tween the track
    `x` to `-(track.scrollWidth - window.innerWidth + padding)`.
  - Tween settings: `scrub: 1`, `end: () => '+=' + track.scrollWidth`,
    `invalidateOnRefresh: true`. Use `gsap.matchMedia()` so it reverts below
    1024 px or under reduced motion.
  - Fallback: a vertical stack.
- [ ] **Step 4:** Run `npm run dev` and check by eye at 1440 and 390 widths.
  - Desktop: the strip pins and scrolls to the last card, then releases.
  - Phone: cards stack, with no sideways page scroll.
- [ ] **Step 5:** Commit `feat: nav, hero, pinned work strip`.

### Task 5: FastBlast, Studio, About and Contact

**Files:**
- Create: `src/components/FastBlast.jsx`, `Studio.jsx`, `About.jsx`, `SkillsTicker.jsx`, `Contact.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `fastblast`, `fastblastScreens`, `studio`, `experience`,
  `education`, `certificates`, `skills`, `portrait`, `contact`,
  `useParallax`.

- [ ] **Step 1: Build the FastBlast section.**
  - Three phone frames (rounded rect, 9:19.5, ink border) holding the screens.
  - Parallax speeds 0.7, 0.9 and 1.15 make them drift apart.
  - Also: the title, blurb, features list, role/stack line, and an official
    "Get it on Google Play" badge (an inline SVG or text-button styled pill,
    not a hotlinked image) linking to `playUrl`.
- [ ] **Step 2: Build the Studio section.** The logo, "Need a full team?
  My studio builds it end to end.", the service chips, and a lime button to
  `studio.url`.
- [ ] **Step 3: Build the About section.**
  - The portrait in a circle with a 3 px lime ring, with slight parallax.
  - A timeline from `experience`, plus the education and certificates lines.
  - `SkillsTicker`: a CSS marquee using `transform` only, paused under
    reduced motion.
- [ ] **Step 4: Build the Contact section.**
  - "LET'S BUILD" / "SOMETHING." (lime) at hero scale.
  - Big links: mailto, tel, WhatsApp, LinkedIn, GitHub, plus the location.
  - Footer line: `© 2026 Usman Rais` with a "Stack Pulse Studios" link.
- [ ] **Step 5:** Run `npx vitest run && npm run build`, and check by eye at
  1440 and 390. Expected: tests PASS, the build succeeds, every section
  renders.
- [ ] **Step 6:** Commit `feat: fastblast spotlight, studio, about, contact`.

### Task 6: Meta, browser checks, push

**Files:**
- Create: `playwright.config.js`, `tests/e2e/page.spec.js`, `public/og-usman-rais.png` (1200×630, the hero rendered by the e2e setup or by hand)
- Modify: `index.html` (title "Usman Rais — Full-stack & mobile developer", meta description from `profile.pitch`, OG/Twitter tags, `theme-color` `#0a0a0a`), `public/favicon.png` (lime "UR" on ink), `package.json` (`"e2e": "playwright test"`)

**Interfaces:**
- Consumes: the built site (`webServer: npm run build && npm run preview -- --port 4173`).

- [ ] **Step 1: Write the e2e tests (Review Focus 1–4)**
  - `no horizontal overflow at 360px and 390px`: for each width,
    `document.documentElement.scrollWidth <= window.innerWidth`.
  - `reduced motion shows every project without pinning`: use
    `test.use({ reducedMotion: 'reduce' })`. Expect 8 `[data-project]`
    elements, each `toBeVisible()` after `scrollIntoViewIfNeeded()`, and no
    `.pin-spacer` in the DOM.
  - `nav links land on their sections`: at 1440×900, for `fastblast` and
    `contact`, click the nav link, wait 1500 ms, and check that the
    section's `h2` bounding box top is between 0 and 900.
  - `last project card reachable after resize`: load at 1440×900, resize to
    1280×800, then scroll through `#work` with `mouse.wheel` steps until the
    last `[data-project]` is in the viewport.
  - `contact links are exact`: assert the hrefs `mailto:contact@usmanrais.com`,
    `tel:+393508873712` and `https://wa.me/923327979804`.
- [ ] **Step 2:** Run `npm run e2e`. Expected: any failures point to real
  bugs; fix them in the owning component until everything passes.
- [ ] **Step 3:** Add the meta, favicon and OG image, then run
  `npx vitest run && npm run build && npm run e2e`. Expected: all PASS.
- [ ] **Step 4:** Commit `feat: meta tags and browser checks`, then
  `git push origin redesign-2026` (**never `main`**).
- [ ] **Step 5:** Run `npm run preview` and give Usman the local URL, plus
  the Netlify branch-deploy URL if Netlify builds the branch. Merge to `main`
  only after Usman approves.
