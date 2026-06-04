import gsap from "gsap";
import { resetPage } from "../shutter/hooks";
import { isReducedMotion } from "../shutter/state";
import {
  getSlidingColumnsEnterStart,
  staggerEach,
  transitionDuration,
} from "./config";
import { mountSlidingColumns, unmountSlidingColumns } from "./columns";

export function runPageOnceAnimation(next: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline();
  tl.call(() => resetPage(next), null, 0);
  return tl;
}

export function runPageLeaveAnimation(
  current: HTMLElement,
  next: HTMLElement,
): gsap.core.Timeline {
  const panel = mountSlidingColumns();
  const columns =
    panel?.querySelectorAll("[data-transition-column]") ?? [];

  const tl = gsap.timeline({
    onComplete: () => {
      current.remove();
    },
  });

  if (isReducedMotion()) {
    return tl.set(current, { autoAlpha: 0 });
  }

  if (!panel || columns.length === 0) {
    return tl.set(current, { autoAlpha: 0 });
  }

  tl.set(next, { autoAlpha: 0 }, 0);
  tl.set(panel, { opacity: 1, pointerEvents: "none" }, 0);

  tl.fromTo(
    columns,
    { yPercent: 0 },
    {
      yPercent: 100,
      duration: transitionDuration,
      stagger: {
        each: staggerEach,
        from: "end",
      },
    },
    0,
  );

  return tl;
}

export function runPageEnterAnimation(next: HTMLElement): Promise<void> {
  const panel = mountSlidingColumns({ resetTransforms: false });
  const columns =
    panel?.querySelectorAll("[data-transition-column]") ?? [];

  const tl = gsap.timeline();
  const enterStart = getSlidingColumnsEnterStart();

  if (isReducedMotion()) {
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady");
    tl.call(resetPage, [next], "pageReady");
    tl.call(unmountSlidingColumns, null, "pageReady");
    return new Promise((resolve) => {
      tl.call(resolve, null, "pageReady");
    });
  }

  if (!panel || columns.length === 0) {
    tl.set(next, { autoAlpha: 1 }, 0);
    tl.add("pageReady", 0);
    tl.call(resetPage, [next], "pageReady");
    return new Promise((resolve) => {
      tl.call(resolve, null, "pageReady");
    });
  }

  tl.set(next, { autoAlpha: 0 }, 0);

  const linesWrap = panel.querySelector(".transition__lines");

  tl.add("startEnter", enterStart);
  tl.set(next, { autoAlpha: 1 }, "startEnter");
  if (linesWrap) {
    tl.set(linesWrap, { opacity: 0 }, "startEnter");
  }

  tl.to(
    columns,
    {
      yPercent: 200,
      duration: transitionDuration,
      stagger: staggerEach,
      overwrite: "auto",
    },
    "startEnter",
  );

  tl.add("pageReady");
  tl.call(resetPage, [next], "pageReady");
  tl.call(unmountSlidingColumns, null, "pageReady");
  tl.set(panel, { opacity: 0 }, "pageReady");

  return new Promise((resolve) => {
    tl.call(resolve, null, "pageReady");
  });
}
