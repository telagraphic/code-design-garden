import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

export const LENIS_SCROLL_EVENT = "lenis:scroll";

export function getLenis(): Lenis | null {
  return window.__lenis ?? null;
}

export function setLenis(instance: Lenis | null): void {
  window.__lenis = instance;
}
