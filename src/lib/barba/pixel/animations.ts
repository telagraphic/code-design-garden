import gsap from "gsap";
import { resetPage } from "../shutter/hooks";
import { isReducedMotion } from "../shutter/state";
import {
  getPixelClipRevealEnd,
  getPixelTransitionEnd,
  pixelFadeDuration,
  pixelHorizontalAmount,
  pixelOverlap,
  transitionDuration,
} from "./config";
import { pixelGrid } from "./pixelGrid";

export function runPageOnceAnimation(next: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline();
  tl.call(() => resetPage(next), null, 0);
  return tl;
}

export function runPageLeaveAnimation(
  current: HTMLElement,
  next: HTMLElement,
): gsap.core.Timeline {
  const tl = gsap.timeline();

  if (isReducedMotion()) {
    tl.set(current, { autoAlpha: 0 });
    tl.call(() => current.remove(), null, 0);
    return tl;
  }

  const isPortrait = window.innerHeight > window.innerWidth;
  pixelGrid(isPortrait);

  const transitionWrap = document.querySelector("[data-transition-wrap]");
  const transitionPanel = transitionWrap?.querySelector(
    "[data-transition-panel]",
  );
  if (!transitionPanel) {
    tl.set(current, { autoAlpha: 0 });
    tl.call(() => current.remove(), null, 0);
    return tl;
  }

  const lines = Array.from(
    transitionPanel.querySelectorAll("[data-transition-col]"),
  );
  const allPixels = transitionPanel.querySelectorAll("[data-transition-pixel]");

  const overlap = Math.max(0, Math.min(1, pixelOverlap));
  const clipFrom = isPortrait
    ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
    : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
  const clipTo = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
  const clipStart = Math.min(pixelFadeDuration, transitionDuration * 0.5);
  const clipDuration = Math.max(0.001, transitionDuration - 2 * clipStart);
  const stepDur = clipDuration / Math.max(1, pixelHorizontalAmount);
  const transitionEnd = getPixelTransitionEnd();
  const clipRevealEnd = getPixelClipRevealEnd();

  gsap.set(allPixels, { opacity: 0, willChange: "opacity" });
  gsap.set(transitionPanel, { opacity: 1, willChange: "opacity" });
  tl.set(current, { zIndex: 1, autoAlpha: 1 }, 0);

  gsap.set(next, {
    autoAlpha: 0,
    clipPath: clipFrom,
    webkitClipPath: clipFrom,
    zIndex: 2,
    willChange: "clip-path",
    force3D: true,
    maxHeight: "100dvh",
  });

  lines.forEach((line, i) => {
    const pixels = Array.from(
      line.querySelectorAll("[data-transition-pixel]"),
    );
    if (!pixels.length) return;

    const revealTime = clipStart + i * stepDur;
    const fillStart = Math.max(0, revealTime - pixelFadeDuration);
    const perPixelMin = pixelFadeDuration / pixels.length;
    const perPixelDur =
      perPixelMin * (1 - overlap) + pixelFadeDuration * overlap;
    const spread = Math.max(0, pixelFadeDuration - perPixelDur);

    tl.to(
      pixels,
      {
        opacity: 1,
        duration: Math.max(0.001, perPixelDur),
        ease: "none",
        stagger: {
          amount: spread,
          from: "random",
        },
      },
      fillStart,
    );
  });

  tl.set(current, { autoAlpha: 0 }, clipStart);
  tl.set(next, { autoAlpha: 1 }, clipStart);

  tl.to(
    next,
    {
      clipPath: clipTo,
      webkitClipPath: clipTo,
      ease: `steps(${pixelHorizontalAmount}, start)`,
      duration: clipDuration,
    },
    clipStart,
  );

  tl.set(
    next,
    { clearProps: "clipPath,webkitClipPath,willChange,force3D,maxHeight,zIndex" },
    clipRevealEnd,
  );

  tl.call(() => current.remove(), null, clipRevealEnd);

  tl.to(
    allPixels,
    {
      opacity: 0,
      duration: pixelFadeDuration,
      ease: "none",
      stagger: {
        amount: pixelFadeDuration * 0.75,
        from: "random",
      },
    },
    clipRevealEnd,
  );

  tl.set(allPixels, { clearProps: "willChange" }, transitionEnd);
  tl.set(
    transitionPanel,
    { clearProps: "willChange", opacity: 0 },
    transitionEnd,
  );

  return tl;
}

export function runPageEnterAnimation(next: HTMLElement): Promise<void> {
  const tl = gsap.timeline();
  const clipRevealEnd = getPixelClipRevealEnd();

  if (isReducedMotion()) {
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady");
    tl.call(resetPage, [next], "pageReady");
    return new Promise((resolve) => {
      tl.call(resolve, null, "pageReady");
    });
  }

  tl.add("pageReady", clipRevealEnd);
  tl.call(resetPage, [next], "pageReady");

  return new Promise((resolve) => {
    tl.call(resolve, null, "pageReady");
  });
}
