import Lenis from "lenis";
import gsap from "gsap";
import { LENIS_SCROLL_EVENT, setLenis } from "@/lib/lenis-bridge";
import {
  getLenisInstance,
  isOnceInitialized,
  markOnceInitialized,
  setLenisInstance,
} from "./state";

let tickerFn: ((time: number) => void) | null = null;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function destroyLenis(): void {
  const instance = getLenisInstance();
  if (!instance) return;

  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }

  instance.destroy();
  setLenisInstance(null);
  setLenis(null);
}

export function initLenis(): void {
  if (prefersReducedMotion()) {
    destroyLenis();
    return;
  }
  if (getLenisInstance()) return;

  const instance = new Lenis({
    lerp: 0.165,
    wheelMultiplier: 1.25,
    allowNestedScroll: true,
  });

  tickerFn = (time: number) => {
    instance.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  instance.on("scroll", () => {
    window.dispatchEvent(new Event(LENIS_SCROLL_EVENT));
  });

  setLenisInstance(instance);
  setLenis(instance);
}

export function syncLenisWithMotionPreference(reduced: boolean): void {
  if (reduced) destroyLenis();
  else initLenis();
}

export function initOnceFunctions(): void {
  initLenis();
  if (isOnceInitialized()) return;
  markOnceInitialized();
}
