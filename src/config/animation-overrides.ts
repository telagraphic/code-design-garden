import type {
  AnimationCategory,
  AnimationLibrary,
  AnimationTrigger,
} from "./animation-taxonomy";

export type PilotOverride = {
  title: string;
  description: string;
  order: number;
  categories: AnimationCategory[];
  triggers: AnimationTrigger[];
  libraries: AnimationLibrary[];
  keywords?: string[];
};

/** Original 10 published slugs (curated metadata). Full library: re-run migrate script. */
export const animationOverrideSlugs = [
  "sticky-features",
  "sticky-title-scroll-effect",
  "mega-navigation-menu",
  "scramble-text",
  "shutter-page-transition",
  "page-transitions/cross-fade-page-transition",
  "draggable-marquee",
  "infinite-draggable-grid",
  "buttons/button-001",
  "3D-image-carousel",
] as const;

export const animationPilotOverrides: Record<string, PilotOverride> = {
  "sticky-features": {
    title: "Sticky Features",
    description:
      "Scroll-driven sticky panel with image and copy columns, synced with GSAP ScrollTrigger.",
    order: 102,
    categories: ["scroll", "image-carousel", "layout"],
    triggers: ["scroll"],
    libraries: ["gsap"],
    keywords: ["sticky", "features", "scrolltrigger"],
  },
  "sticky-title-scroll-effect": {
    title: "Sticky Title Scroll Effect",
    description: "Large title stays pinned while content scrolls beneath it.",
    order: 101,
    categories: ["text", "scroll"],
    triggers: ["scroll"],
    libraries: ["gsap"],
    keywords: ["sticky", "title", "typography"],
  },
  "mega-navigation-menu": {
    title: "Mega Navigation Menu",
    description: "Full-width navigation with animated mega menu panels.",
    order: 100,
    categories: ["navigation"],
    triggers: ["hover", "click"],
    libraries: ["gsap"],
    keywords: ["nav", "menu", "mega"],
  },
  "scramble-text": {
    title: "Scramble Text",
    description: "Decoding-style text scramble on interaction.",
    order: 99,
    categories: ["text"],
    triggers: ["hover", "load"],
    libraries: ["vanilla-js"],
    keywords: ["scramble", "decode", "typography"],
  },
  "shutter-page-transition": {
    title: "Shutter Page Transition",
    description: "Panel shutter wipe between pages with GSAP.",
    order: 98,
    categories: ["page-transition"],
    triggers: ["click", "load"],
    libraries: ["gsap"],
    keywords: ["barba", "shutter", "transition"],
  },
  "page-transitions/cross-fade-page-transition": {
    title: "Cross Fade Page Transition",
    description: "Overlapping leave and enter fades for route changes.",
    order: 97,
    categories: ["page-transition"],
    triggers: ["click", "load"],
    libraries: ["gsap"],
    keywords: ["crossfade", "transition", "barba"],
  },
  "draggable-marquee": {
    title: "Draggable Marquee",
    description: "Horizontally draggable looping marquee strip.",
    order: 96,
    categories: ["layout"],
    triggers: ["drag"],
    libraries: ["gsap"],
    keywords: ["marquee", "draggable", "loop"],
  },
  "infinite-draggable-grid": {
    title: "Infinite Draggable Grid",
    description: "Draggable infinite grid of tiles with momentum.",
    order: 95,
    categories: ["layout", "image-carousel"],
    triggers: ["drag"],
    libraries: ["gsap"],
    keywords: ["grid", "infinite", "draggable"],
  },
  "buttons/button-001": {
    title: "Button 001",
    description: "Layered circle button with hover depth animation.",
    order: 94,
    categories: ["button"],
    triggers: ["hover"],
    libraries: ["css-only"],
    keywords: ["button", "hover", "circles"],
  },
  "3D-image-carousel": {
    title: "3D Image Carousel",
    description: "Perspective carousel of images with drag and snap.",
    order: 93,
    categories: ["image-carousel"],
    triggers: ["drag", "scroll"],
    libraries: ["gsap"],
    keywords: ["carousel", "3d", "gallery"],
  },
};
