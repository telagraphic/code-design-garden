import barba from "@barba/core";
import gsap from "gsap";
import { getLenis } from "@/lib/lenis-bridge";
import { dispatchPageLeave } from "@/lib/page-lifecycle";
import { destroySidebarScrollSpy } from "@/lib/sidebar-scroll-spy";
import {
  applyThemeFrom,
  getSiteNavHeight,
  initAfterEnterFunctions,
  initBarbaNavUpdate,
  initBeforeEnterFunctions,
  updateDocumentTitle,
} from "./shutter/hooks";
import { setReducedMotion } from "./shutter/state";
import { shutterTransition } from "./shutterTransition";

function initReducedMotionListener(): void {
  const rmMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  setReducedMotion(rmMQ.matches);

  const onChange = (e: MediaQueryListEvent) => {
    setReducedMotion(e.matches);
  };

  rmMQ.addEventListener("change", onChange);
  rmMQ.addListener?.(onChange);
}

function shouldPreventBarba(el: Element | undefined): boolean {
  if (!el || !(el instanceof HTMLAnchorElement)) return false;

  const href = el.getAttribute("href");
  if (!href || href.startsWith("#")) return true;

  if (el.target === "_blank" || el.hasAttribute("download")) return true;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return true;

  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return true;
  } catch {
    return true;
  }

  if (el.dataset.barbaPrevent !== undefined) return true;

  return false;
}

export function initBarba(): void {
  if (document.body.dataset.barbaInit === "true") return;

  history.scrollRestoration = "manual";
  initReducedMotionListener();

  barba.hooks.before((data) => {
    document.documentElement.classList.add("is-transitioning");
    destroySidebarScrollSpy();
    dispatchPageLeave();
    return data;
  });

  barba.hooks.beforeEnter((data) => {
    const navHeight = getSiteNavHeight();
    gsap.set(data.next.container, {
      position: "fixed",
      top: navHeight,
      left: 0,
      right: 0,
      width: "100%",
    });

    getLenis()?.stop();
    initBeforeEnterFunctions(data.next.container);
    applyThemeFrom(data.next.container);
    return data;
  });

  barba.hooks.afterLeave(() => {
    const scrollTrigger = (
      window as Window & { ScrollTrigger?: { getAll: () => { kill: () => void }[] } }
    ).ScrollTrigger;
    scrollTrigger?.getAll().forEach((trigger) => trigger.kill());
  });

  barba.hooks.enter((data) => {
    initBarbaNavUpdate(data);
    return data;
  });

  barba.hooks.afterEnter((data) => {
    initAfterEnterFunctions(data.next.container);
    updateDocumentTitle(data.next.html);
    document.documentElement.classList.remove("is-transitioning");

    const scrollTrigger = (
      window as Window & { ScrollTrigger?: { refresh: () => void } }
    ).ScrollTrigger;
    scrollTrigger?.refresh();
  });

  barba.hooks.once((data) => {
    initAfterEnterFunctions(data.next.container);
  });

  barba.init({
    debug: import.meta.env.DEV,
    timeout: 7000,
    preventRunning: true,
    prevent: ({ el }) => shouldPreventBarba(el ?? undefined),
    transitions: [shutterTransition],
  });

  document.body.dataset.barbaInit = "true";
  document.documentElement.classList.add("barba-init");
}
