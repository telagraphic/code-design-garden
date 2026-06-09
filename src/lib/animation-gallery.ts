import { PAGE_ENTER_EVENT } from "@/lib/page-lifecycle";

let activeVideo: HTMLVideoElement | null = null;
let boundRoot: HTMLElement | null = null;
let gallerySearchKeyHandler: ((event: KeyboardEvent) => void) | null = null;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pauseVideo(video: HTMLVideoElement) {
  video.pause();
  video.currentTime = 0;
}

function ensureVideoSrc(video: HTMLVideoElement): boolean {
  const src = video.dataset.src;
  if (!src) return false;
  if (!video.getAttribute("src")) {
    video.setAttribute("src", src);
    video.load();
    return true;
  }
  return false;
}

function playWhenReady(video: HTMLVideoElement) {
  const tryPlay = () => {
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});
  };

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    tryPlay();
    return;
  }

  video.addEventListener("canplay", tryPlay, { once: true });
}

function onCardEnter(card: HTMLElement, video: HTMLVideoElement) {
  if (prefersReducedMotion()) return;
  if (activeVideo && activeVideo !== video) {
    pauseVideo(activeVideo);
    activeVideo.closest("[data-animation-card]")?.classList.remove(
      "animation-card--playing",
    );
  }
  activeVideo = video;
  card.classList.add("animation-card--playing");
  ensureVideoSrc(video);
  playWhenReady(video);
}

function onCardLeave(card: HTMLElement, video: HTMLVideoElement) {
  card.classList.remove("animation-card--playing");
  pauseVideo(video);
  if (activeVideo === video) activeVideo = null;
}

function bindGallery(root: ParentNode) {
  const gallery = root.querySelector(".animation-gallery");
  if (!(gallery instanceof HTMLElement)) return;

  if (boundRoot === gallery) return;
  destroyAnimationGallery();

  boundRoot = gallery;
  const reduced = prefersReducedMotion();

  for (const card of gallery.querySelectorAll(".animation-card")) {
    if (!(card instanceof HTMLElement)) continue;
    const video = card.querySelector("video.animation-card__video");
    if (!(video instanceof HTMLVideoElement)) continue;

    if (reduced) {
      video.removeAttribute("src");
      continue;
    }

    card.addEventListener("mouseenter", () => onCardEnter(card, video));
    card.addEventListener("mouseleave", () => onCardLeave(card, video));
    card.addEventListener("focusin", () => onCardEnter(card, video));
    card.addEventListener("focusout", (e) => {
      if (!card.contains(e.relatedTarget as Node)) onCardLeave(card, video);
    });
  }

  initGalleryFilters(gallery);
}

function unbindGallerySearchShortcut() {
  if (!gallerySearchKeyHandler) return;
  document.removeEventListener("keydown", gallerySearchKeyHandler);
  gallerySearchKeyHandler = null;
}

function bindGallerySearchShortcut(
  gallery: HTMLElement,
  searchInput: HTMLInputElement,
) {
  unbindGallerySearchShortcut();

  gallerySearchKeyHandler = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() !== "s") return;
    if (!(event.metaKey || event.ctrlKey)) return;
    if (event.altKey || event.shiftKey) return;

    event.preventDefault();
    searchInput.focus({ preventScroll: true });
    searchInput.select();
  };

  document.addEventListener("keydown", gallerySearchKeyHandler);
}

function initGalleryFilters(gallery: HTMLElement) {
  if (gallery.dataset.filtersInit === "true") return;
  gallery.dataset.filtersInit = "true";

  const cards = [
    ...gallery.querySelectorAll<HTMLElement>("[data-animation-card]"),
  ];
  const chips = [...gallery.querySelectorAll<HTMLButtonElement>("[data-filter]")];
  const searchInput = gallery.querySelector<HTMLInputElement>(
    "[data-gallery-search]",
  );

  if (searchInput) {
    searchInput.setAttribute("aria-keyshortcuts", "Meta+S Control+S");
    bindGallerySearchShortcut(gallery, searchInput);
  }

  const applyFilters = () => {
    const params = new URLSearchParams(window.location.search);
    const q = (params.get("q") || searchInput?.value || "").trim().toLowerCase();
    const category = params.get("category") || "";
    const trigger = params.get("trigger") || "";

    if (searchInput && searchInput !== document.activeElement) {
      searchInput.value = params.get("q") || "";
    }

    for (const chip of chips) {
      const type = chip.dataset.filterType;
      const value = chip.dataset.filter || "";
      const active =
        (type === "category" && category === value) ||
        (type === "trigger" && trigger === value) ||
        (type === "all" && !category && !trigger);
      chip.classList.toggle("animation-gallery__chip--active", active);
    }

    let visible = 0;
    for (const card of cards) {
      const title = (card.dataset.title || "").toLowerCase();
      const keywords = (card.dataset.keywords || "").toLowerCase();
      const categories = card.dataset.categories || "";
      const triggers = card.dataset.triggers || "";
      const matchQ = !q || title.includes(q) || keywords.includes(q);
      const matchCat = !category || categories.split(",").includes(category);
      const matchTrig = !trigger || triggers.split(",").includes(trigger);
      const show = matchQ && matchCat && matchTrig;
      card.dataset.hidden = show ? "false" : "true";
      if (show) visible++;
    }

    const empty = gallery.querySelector("[data-gallery-empty]");
    if (empty instanceof HTMLElement) {
      empty.hidden = visible > 0;
    }
  };

  const syncUrl = (patch: Record<string, string>) => {
    const params = new URLSearchParams(window.location.search);
    for (const [key, val] of Object.entries(patch)) {
      if (val) params.set(key, val);
      else params.delete(key);
    }
    const qs = params.toString();
    const url = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    window.history.replaceState({}, "", url);
    applyFilters();
  };

  for (const chip of chips) {
    chip.addEventListener("click", () => {
      const type = chip.dataset.filterType;
      const value = chip.dataset.filter || "";
      if (type === "all") {
        syncUrl({ category: "", trigger: "" });
        return;
      }
      if (type === "category") {
        const params = new URLSearchParams(window.location.search);
        const current = params.get("category");
        syncUrl({
          category: current === value ? "" : value,
        });
      }
      if (type === "trigger") {
        const params = new URLSearchParams(window.location.search);
        const current = params.get("trigger");
        syncUrl({
          trigger: current === value ? "" : value,
        });
      }
    });
  }

  searchInput?.addEventListener("input", () => {
    syncUrl({ q: searchInput.value.trim() });
  });

  applyFilters();
}

export function destroyAnimationGallery(): void {
  unbindGallerySearchShortcut();
  if (activeVideo) {
    const card = activeVideo.closest("[data-animation-card]");
    if (card instanceof HTMLElement) {
      card.classList.remove("animation-card--playing");
    }
    pauseVideo(activeVideo);
    activeVideo = null;
  }
  boundRoot = null;
}

export function initAnimationGallery(root: ParentNode = document): void {
  bindGallery(root);

  const detailVideo = root.querySelector(
    "video.animation-detail__video",
  );
  if (
    detailVideo instanceof HTMLVideoElement &&
    !prefersReducedMotion()
  ) {
    const playPromise = detailVideo.play();
    if (playPromise) playPromise.catch(() => {});
  }
}

function onPageEnter(event: Event) {
  const root =
    (event as CustomEvent<{ root: ParentNode }>).detail?.root ?? document;
  initAnimationGallery(root);
}

if (typeof document !== "undefined") {
  initAnimationGallery();
  document.addEventListener(PAGE_ENTER_EVENT, onPageEnter);
}
