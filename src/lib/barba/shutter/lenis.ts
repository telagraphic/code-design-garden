import Lenis from "lenis";
import gsap from "gsap";
import { LENIS_SCROLL_EVENT, setLenis } from "@/lib/lenis-bridge";
import {
  getLenisInstance,
  isOnceInitialized,
  markOnceInitialized,
  setLenisInstance,
} from "./state";

export function initLenis(): void {
  if (getLenisInstance()) return;

  const instance = new Lenis({
    lerp: 0.165,
    wheelMultiplier: 1.25,
    allowNestedScroll: true,
  });

  gsap.ticker.add((time) => {
    instance.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  instance.on("scroll", () => {
    window.dispatchEvent(new Event(LENIS_SCROLL_EVENT));
  });

  setLenisInstance(instance);
  setLenis(instance);
}

export function initOnceFunctions(): void {
  initLenis();
  if (isOnceInitialized()) return;
  markOnceInitialized();
}
