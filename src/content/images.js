// Image imports with intrinsic sizes, so every <img> reserves its space and
// the layout never jumps while images load.
import fastblastStore from "../assets/work/fastblast-intermittent-fasting-store.webp";
import xoClub from "../assets/work/xo-club-of-clubs-coming-soon-site.webp";
import brooklyn from "../assets/work/brooklyn-sells-daily-deals-store.webp";
import cmd from "../assets/work/cmd-health-systems-healthcare-platform.webp";
import actmore from "../assets/work/actmore-usa-activewear-store.webp";
import safecover from "../assets/work/safecover-tarps-safety-gear-store.webp";
import fbPlan from "../assets/fastblast/fastblast-app-fasting-plan-screen.webp";
import fbMeals from "../assets/fastblast/fastblast-app-meal-tracking-screen.webp";
import fbCoach from "../assets/fastblast/fastblast-app-ai-coach-screen.webp";
import portraitSrc from "../assets/about/usman-rais-portrait.webp";
import logoSrc from "../assets/studio/stack-pulse-studios-logo.webp";

const shot = (src) => ({ src, width: 1600, height: 1000 });
const phone = (src) => ({ src, width: 424, height: 912 });

export const projectImages = {
  fastblast: shot(fastblastStore),
  "xo-club-of-clubs": shot(xoClub),
  "brooklyn-sells": shot(brooklyn),
  "cmd-health-systems": shot(cmd),
  "actmore-usa": shot(actmore),
  safecover: shot(safecover),
};

export const fastblastScreens = [phone(fbPlan), phone(fbMeals), phone(fbCoach)];
export const portrait = { src: portraitSrc, width: 800, height: 800 };
export const studioLogo = { src: logoSrc, width: 691, height: 138 };
