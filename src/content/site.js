// Every word on usmanrais.com lives here. Facts only: nothing below may claim
// a result, client count or award that Usman hasn't stated (see the design doc).

export const profile = {
  name: "Usman Rais",
  first: "USMAN",
  last: "RAIS",
  role: "Full-stack & mobile developer",
  pitch: "I build web apps, mobile apps and online stores for brands in the US and Europe.",
  location: "Verona, Italy · working worldwide",
  available: "Available for projects",
};

export const contact = {
  email: "contact@usmanrais.com",
  phone: "+39 350 887 3712",
  phoneHref: "tel:+393508873712",
  whatsapp: "+92 332 7979804",
  whatsappHref: "https://wa.me/923327979804",
  linkedin: "https://www.linkedin.com/in/usman-raees/",
  github: "https://github.com/UsmanRais12",
  location: "Verona, Italy",
};

export const nav = [
  { id: "work", label: "Work" },
  { id: "fastblast", label: "FastBlast" },
  { id: "studio", label: "Studio" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const projects = [
  {
    slug: "fastblast",
    name: "FastBlast",
    url: "https://fastblast.com/",
    platform: "Shopify + React Native",
    tags: ["Shopify", "React Native", "Expo"],
    blurb: "An intermittent-fasting brand: smoothies and supplements online, plus a companion app with fasting plans and an AI coach.",
    role: "Designed & built the store and the app",
    image: "fastblast-intermittent-fasting-store.webp",
  },
  {
    slug: "xo-club-of-clubs",
    name: "XO Club of Clubs",
    url: "https://xo-clubofclubs.com/",
    platform: "Next.js",
    tags: ["Next.js", "GSAP", "Vercel"],
    blurb: "A private, invitation-only club for global health access. The launch site opens with a cinematic film and a founding waitlist.",
    role: "Designed & built via Stack Pulse Studios",
    image: "xo-club-of-clubs-coming-soon-site.webp",
  },
  {
    slug: "brooklyn-sells",
    name: "Brooklyn Sells",
    url: "https://brooklynsells.com/",
    platform: "Shopify",
    tags: ["Shopify", "SEO"],
    blurb: "Hand-picked daily deals on toys, kitchen and home, plus digital e-books, in one Shopify storefront.",
    role: "Designed & built the store",
    image: "brooklyn-sells-daily-deals-store.webp",
  },
  {
    slug: "cmd-health-systems",
    name: "CMD Health Systems",
    url: "https://www.cmdhealthsystems.com/",
    platform: "Next.js",
    tags: ["Next.js", "Node.js", "MongoDB"],
    blurb: "A connected healthcare platform linking family offices, hospitals and physicians worldwide.",
    role: "Designed & built via Stack Pulse Studios",
    image: "cmd-health-systems-healthcare-platform.webp",
  },
  {
    slug: "actmore-usa",
    name: "ACTMORE USA",
    url: "https://actmoreusa.com/",
    platform: "Shopify",
    tags: ["Shopify", "Liquid"],
    blurb: "Activewear for women and men: leggings, tees and jackets made for training and everyday comfort.",
    role: "Designed & built the store",
    image: "actmore-usa-activewear-store.webp",
  },
  {
    slug: "safecover",
    name: "Safecover LLC",
    url: "https://safecoverllc.com/",
    platform: "Shopify",
    tags: ["Shopify", "E-commerce ops"],
    blurb: "Heavy-duty tarps, safety vests, gloves and boots, sold online and across Amazon.",
    role: "Designed & built the store",
    image: "safecover-tarps-safety-gear-store.webp",
  },
];

export const fastblast = {
  title: "FastBlast",
  kicker: "Spotlight",
  blurb:
    "FastBlast makes intermittent fasting simple. I led the app from first screen to Google Play: fasting plans that fit the week, meal tracking in seconds, and an AI coach for personal guidance.",
  features: ["5:2 and custom fasting plans", "Quick-add and photo meal logging", "AI coach chat", "Weight and progress tracking"],
  role: "Lead developer",
  stack: ["React Native", "Expo", "Node.js", "AI"],
  playUrl: "https://play.google.com/store/apps/details?id=com.fastblast.app",
  screens: ["fastblast-app-fasting-plan-screen.webp", "fastblast-app-meal-tracking-screen.webp", "fastblast-app-ai-coach-screen.webp"],
};

export const studio = {
  name: "Stack Pulse Studios",
  pitch: "Need a full team? My studio builds it end to end.",
  body: "Design, development and launch under one roof: when a project needs more hands than mine, Stack Pulse Studios brings the team.",
  services: ["Websites", "Mobile apps", "Shopify stores", "Backends & APIs"],
  url: "https://stackpulsestudios.com/",
};

export const about = {
  title: "Hi, I'm Usman.",
  body: [
    "Since 2019 I've been turning ideas into products people use: online stores, web platforms and mobile apps.",
    "By day I lead the tech team at Masterofecom, a US e-commerce company. I also take on client projects and study for an MSc in Data Science at the University of Verona.",
  ],
};

export const experience = [
  { period: "2023 – now", role: "Technical Lead", org: "Masterofecom", note: "US e-commerce, remote" },
  { period: "2022 – 2023", role: "Senior Software Engineer", org: "Masterofecom", note: "" },
  { period: "2020 – 2022", role: "Web Developer", org: "Masterofecom", note: "" },
  { period: "2019 – 2020", role: "React Native Developer (intern)", org: "Ayeece", note: "" },
  { period: "2020 – now", role: "Freelance developer", org: "Upwork · Fiverr", note: "100% Job Success on Upwork · Level 1 on Fiverr" },
];

export const education = [
  { period: "2025 – 2027", title: "MSc Data Science", org: "University of Verona" },
  { period: "2020 – 2024", title: "BS Computer Science", org: "Indus University" },
];

export const certificates = "Certified in React Native (Udemy), WordPress and Freelancing (DigiSkills).";

export const skills = ["React", "React Native", "Next.js", "Node.js", "TypeScript", "Shopify", "WordPress", "MongoDB", "Firebase", "Figma"];
