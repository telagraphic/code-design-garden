import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitText, type TextSplit } from "kugiri";
import { LENIS_SCROLL_EVENT } from "@/lib/lenis-bridge";

gsap.registerPlugin(ScrollTrigger);

const SELECTOR = "[data-split-reveal]";
const GROUP = "[data-split-group]";
const REVEAL_WITH = "[data-reveal-with]";
const EASE = "expo.out";

type RevealConfig = {
  yPercent: number;
  duration: number;
  stagger: number;
  start: string;
};

let session = 0;
let root: ParentNode | null = null;
let splits: TextSplit[] = [];
let triggers: ScrollTrigger[] = [];
let resizeObserver: ResizeObserver | null = null;
let resizeFrame = 0;
let lenisBound = false;
let revealed = new WeakSet<HTMLElement>();

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function targetsIn(scope: ParentNode): HTMLElement[] {
  return [...scope.querySelectorAll<HTMLElement>(SELECTOR)].filter(
    (el) => getComputedStyle(el).display !== "none",
  );
}

function markReady(targets: HTMLElement[]): void {
  for (const el of targets) {
    el.dataset.splitReady = "";
  }
}

function markComplete(group: HTMLElement[]): void {
  for (const el of group) {
    el.dataset.splitComplete = "";
  }
}

function readConfig(el: HTMLElement): RevealConfig {
  const cs = getComputedStyle(el);
  const start = cs.getPropertyValue("--reveal-start").trim() || "85%";
  return {
    yPercent: Number.parseFloat(cs.getPropertyValue("--reveal-y")) || 150,
    duration: Number.parseFloat(cs.getPropertyValue("--reveal-duration")) || 0.8,
    stagger: Number.parseFloat(cs.getPropertyValue("--reveal-stagger")) || 0.06,
    start: `top ${start}`,
  };
}

function isPastStart(trigger: HTMLElement, start: string): boolean {
  const ratio = Number.parseFloat(start.replace(/[^\d.]/g, "")) / 100 || 0.85;
  return trigger.getBoundingClientRect().top <= window.innerHeight * ratio;
}

function groupTargets(targets: HTMLElement[]): HTMLElement[][] {
  const groups: HTMLElement[][] = [];
  const used = new Set<HTMLElement>();

  for (const el of targets) {
    if (used.has(el)) continue;

    const host = el.closest<HTMLElement>(GROUP);
    if (!host) {
      used.add(el);
      groups.push([el]);
      continue;
    }

    const members = targets.filter((target) => host.contains(target));
    for (const member of members) used.add(member);
    groups.push(members);
  }

  return groups;
}

function triggerOf(group: HTMLElement[]): HTMLElement {
  return group[0].closest<HTMLElement>(GROUP) ?? group[0];
}

function extrasOf(el: HTMLElement): HTMLElement[] {
  return [...el.querySelectorAll<HTMLElement>(`:scope > ${REVEAL_WITH} > span`)];
}

function linesOf(
  el: HTMLElement,
  splitOf: Map<HTMLElement, TextSplit>,
): HTMLElement[] {
  return [...(splitOf.get(el)?.lines ?? []), ...extrasOf(el)];
}

function bindLenis(): void {
  if (lenisBound) return;
  window.addEventListener(LENIS_SCROLL_EVENT, ScrollTrigger.update);
  lenisBound = true;
}

function unbindLenis(): void {
  if (!lenisBound) return;
  window.removeEventListener(LENIS_SCROLL_EVENT, ScrollTrigger.update);
  lenisBound = false;
}

function playReveal(
  lines: HTMLElement[],
  group: HTMLElement[],
  config: RevealConfig,
): void {
  gsap.to(lines, {
    yPercent: 0,
    duration: config.duration,
    stagger: config.stagger,
    ease: EASE,
    lazy: false,
    onComplete: () => markComplete(group),
  });
}

function killPlayback(revertDom: boolean): void {
  window.cancelAnimationFrame(resizeFrame);
  resizeFrame = 0;

  for (const trigger of triggers) trigger.kill();
  triggers = [];

  for (const split of splits) {
    gsap.killTweensOf(split.lines);
  }
  if (root) {
    gsap.killTweensOf(root.querySelectorAll(`${REVEAL_WITH} > span`));
  }

  if (revertDom) {
    for (const split of splits) split.revert();
  }

  splits = [];
}

function applySplit(targets: HTMLElement[], replay: boolean): void {
  const live = targets.filter((el) => el.isConnected);
  if (!live.length) return;

  const result = splitText(live, {
    type: ["lines"],
    mask: "lines",
    ignore: REVEAL_WITH,
  });
  splits = Array.isArray(result) ? result : [result];

  const splitOf = new Map<HTMLElement, TextSplit>();
  live.forEach((el, index) => {
    delete el.dataset.splitComplete;
    splitOf.set(el, splits[index]);
    for (const mask of splits[index]?.masks ?? []) {
      mask.style.removeProperty("clip-path");
    }
  });

  const config = readConfig(live[0]);
  bindLenis();

  for (const group of groupTargets(live)) {
    const lines = group.flatMap((el) => linesOf(el, splitOf));
    if (!lines.length) continue;

    const trigger = triggerOf(group);
    const snap =
      !replay && (revealed.has(trigger) || isPastStart(trigger, config.start));

    if (snap) {
      gsap.set(lines, { yPercent: 0 });
      markComplete(group);
      continue;
    }

    gsap.set(lines, { yPercent: config.yPercent });

    const st = ScrollTrigger.create({
      trigger,
      start: config.start,
      once: true,
      onEnter: () => {
        revealed.add(trigger);
        playReveal(lines, group, config);
      },
    });
    triggers.push(st);
  }

  markReady(live);
  ScrollTrigger.update();
}

function observeWidth(container: HTMLElement): void {
  if (resizeObserver) return;

  let width = container.clientWidth;
  let armed = false;

  function arm(): void {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        width = container.clientWidth;
        armed = true;
      });
    });
  }

  resizeObserver = new ResizeObserver(() => {
    if (!armed) return;
    if (Math.abs(container.clientWidth - width) < 2) return;
    width = container.clientWidth;
    armed = false;
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(() => {
      if (!root) return;
      killPlayback(true);
      const next = targetsIn(root);
      if (next.length) applySplit(next, false);
      arm();
    });
  });

  resizeObserver.observe(container);
  arm();
}

export function destroySplitReveal(): void {
  session += 1;
  revealed = new WeakSet();
  killPlayback(false);
  resizeObserver?.disconnect();
  resizeObserver = null;
  unbindLenis();
  root = null;
}

export async function initSplitReveal(scope: ParentNode): Promise<void> {
  destroySplitReveal();

  const targets = targetsIn(scope);
  if (!targets.length) return;

  if (prefersReducedMotion()) {
    markReady(targets);
    return;
  }

  const current = session;
  root = scope;
  await document.fonts.ready;
  if (current !== session) return;

  const live = targets.filter((el) => el.isConnected);
  if (!live.length) return;

  applySplit(live, true);
  const container =
    live[0].closest<HTMLElement>(".blog-column") ?? live[0];
  observeWidth(container);
}
