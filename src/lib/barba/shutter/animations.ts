import gsap from "gsap";
import { transitionDuration, shutterStaggerAmount } from "./config";
import { resetPage } from "./hooks";
import { isReducedMotion } from "./state";
import { generateShutters } from "./shutters";

export function runPageOnceAnimation(next: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline();

  tl.call(() => {
    resetPage(next);
  }, null, 0);

  return tl;
}

export function runPageLeaveAnimation(
  current: HTMLElement,
  next: HTMLElement,
): gsap.core.Timeline {
  generateShutters();

  const transitionPanel = document.querySelector("[data-transition-panel]");
  const allShutters =
    transitionPanel?.querySelectorAll("[data-transition-shutter]") ?? [];

  const tl = gsap.timeline({
    onComplete: () => {
      current.remove();
    },
  });

  if (isReducedMotion()) {
    return tl.set(current, { autoAlpha: 0 });
  }

  tl.set(next, { autoAlpha: 0 }, 0);

  tl.set(
    transitionPanel,
    {
      opacity: 1,
      pointerEvents: "none",
    },
    0,
  );

  tl.set(
    allShutters,
    {
      scaleY: 1.02,
      yPercent: 50,
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    },
    0,
  );

  tl.to(
    allShutters,
    {
      duration: transitionDuration,
      ease: "power3.in",
      yPercent: 0,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      stagger: {
        amount: shutterStaggerAmount,
        from: "end",
      },
    },
    0,
  );

  tl.fromTo(
    current,
    { y: "0vh" },
    {
      y: "-15vh",
      ease: "power3.in",
      duration: transitionDuration * 1.5,
    },
    0,
  );

  return tl;
}

export function runPageEnterAnimation(next: HTMLElement): Promise<void> {
  const transitionPanel = document.querySelector("[data-transition-panel]");
  const allShutters =
    transitionPanel?.querySelectorAll("[data-transition-shutter]") ?? [];

  const tl = gsap.timeline();

  if (isReducedMotion()) {
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady");
    tl.call(resetPage, [next], "pageReady");
    return new Promise((resolve) => {
      tl.call(resolve, null, "pageReady");
    });
  }

  const totalCoverDuration = transitionDuration + shutterStaggerAmount;
  tl.add("startEnter", totalCoverDuration);

  tl.set(next, { autoAlpha: 1 }, "startEnter");

  tl.to(
    allShutters,
    {
      duration: transitionDuration * 1.5,
      ease: "expo.out",
      clipPath: "polygon(0% 0%, 100% 0%, 100% -2%, 0% -2%)",
      yPercent: -50,
      stagger: {
        amount: shutterStaggerAmount,
        from: "end",
      },
      overwrite: "auto",
    },
    "startEnter",
  );

  tl.add("pageReady");
  tl.call(resetPage, [next], "pageReady");

  return new Promise((resolve) => {
    tl.call(resolve, null, "pageReady");
  });
}
