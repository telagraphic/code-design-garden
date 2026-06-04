import gsap from "gsap";
import { getLenis, LENIS_SCROLL_EVENT } from "@/lib/lenis-bridge";
import { dispatchPageEnter } from "@/lib/page-lifecycle";
import { initSidebarScrollSpy } from "@/lib/sidebar-scroll-spy";
import { getLenisInstance, setNextPage } from "./state";

const themeConfig = {
  light: {
    nav: "dark",
    transition: "light",
  },
  dark: {
    nav: "light",
    transition: "dark",
  },
} as const;

export function getSiteNavHeight(): number {
  const nav = document.querySelector(".site-nav");
  return nav instanceof HTMLElement ? nav.offsetHeight : 0;
}

export function applyThemeFrom(container: HTMLElement | null | undefined): void {
  const pageTheme = container?.dataset?.pageTheme || "light";
  const config =
    themeConfig[pageTheme as keyof typeof themeConfig] || themeConfig.light;

  document.body.dataset.pageTheme = pageTheme;

  const transitionEl = document.querySelector("[data-theme-transition]");
  if (transitionEl instanceof HTMLElement) {
    transitionEl.dataset.themeTransition = config.transition;
  }

  const nav = document.querySelector("[data-theme-nav]");
  if (nav instanceof HTMLElement) {
    nav.dataset.themeNav = config.nav;
  }
}

export function resetPage(container: HTMLElement): void {
  window.scrollTo(0, 0);
  gsap.set(container, {
    clearProps: "position,top,left,right,width,transform,y,yPercent",
  });

  const lenis = getLenisInstance() ?? getLenis();
  if (lenis) {
    lenis.resize();
    lenis.start();
    window.dispatchEvent(new Event(LENIS_SCROLL_EVENT));
  }
}

export function initBarbaNavUpdate(data: {
  next: { html: string };
}): void {
  const tpl = document.createElement("template");
  tpl.innerHTML = data.next.html.trim();
  const nextNodes = tpl.content.querySelectorAll("[data-barba-update]");
  const currentNodes = document.querySelectorAll("[data-barba-update]");

  currentNodes.forEach((curr, index) => {
    const next = nextNodes[index];
    if (!next) return;

    const newStatus = next.getAttribute("aria-current");
    if (newStatus !== null) {
      curr.setAttribute("aria-current", newStatus);
    } else {
      curr.removeAttribute("aria-current");
    }

    curr.setAttribute("class", next.getAttribute("class") || "");
  });
}

export function updateDocumentTitle(html: string): void {
  const tpl = document.createElement("template");
  tpl.innerHTML = html.trim();
  const title = tpl.content.querySelector("title")?.textContent;
  if (title) document.title = title;
}

export function initBeforeEnterFunctions(next: HTMLElement): void {
  setNextPage(next);
}

export function initAfterEnterFunctions(next: HTMLElement): void {
  setNextPage(next);
  initSidebarScrollSpy(next);
  dispatchPageEnter(next);
}
