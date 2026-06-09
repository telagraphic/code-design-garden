export const animationCategories = [
  "text",
  "image-carousel",
  "navigation",
  "button",
  "page-transition",
  "cursor",
  "scroll",
  "loader",
  "filter",
  "media",
  "layout",
  "utility",
] as const;

export const animationTriggers = [
  "scroll",
  "hover",
  "click",
  "drag",
  "mouse-move",
  "load",
  "autoplay",
] as const;

export const animationLibraries = ["gsap", "css-only", "vanilla-js"] as const;

export type AnimationCategory = (typeof animationCategories)[number];
export type AnimationTrigger = (typeof animationTriggers)[number];
export type AnimationLibrary = (typeof animationLibraries)[number];

export function formatCategoryLabel(value: string): string {
  return value
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function formatTriggerLabel(value: string): string {
  return value
    .split("-")
    .map((w) => w.toUpperCase())
    .join(" ");
}
