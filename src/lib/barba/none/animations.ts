import gsap from "gsap";
import { resetPage } from "../shutter/hooks";
import { isReducedMotion } from "../shutter/state";

export function runPageOnceAnimation(next: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline();
  tl.call(() => resetPage(next), null, 0);
  return tl;
}

export function runPageLeaveAnimation(
  current: HTMLElement,
  _next: HTMLElement,
): gsap.core.Timeline {
  const tl = gsap.timeline({
    onComplete: () => {
      current.remove();
    },
  });

  if (isReducedMotion()) {
    return tl.set(current, { autoAlpha: 0 });
  }

  return tl.set(current, { autoAlpha: 0 }, 0);
}

export function runPageEnterAnimation(next: HTMLElement): Promise<void> {
  const tl = gsap.timeline();

  tl.set(next, { autoAlpha: 1 }, 0);
  tl.add("pageReady", 0);
  tl.call(resetPage, [next], "pageReady");

  return new Promise((resolve) => {
    tl.call(resolve, null, "pageReady");
  });
}
