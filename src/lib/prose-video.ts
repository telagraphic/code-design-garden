import Hls from "hls.js";
import {
  getBunnyVideoUrls,
} from "@/config/video.mjs";
import { PAGE_LEAVE_EVENT } from "@/lib/page-lifecycle";

const hlsInstances = new WeakMap<HTMLElement, Hls>();

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function resolveFigureUrls(figure: HTMLElement): {
  hls?: string;
  mp4?: string;
} {
  const hls = figure.dataset.hls;
  const mp4 = figure.dataset.mp4;
  if (hls || mp4) return { hls, mp4 };

  const name = figure.dataset.video;
  if (!name) return {};

  const urls = getBunnyVideoUrls(name);
  return urls ?? {};
}

function tryPlay(video: HTMLVideoElement, reducedMotion: boolean) {
  if (reducedMotion) return;
  const playPromise = video.play();
  if (playPromise) playPromise.catch(() => {});
}

function useMp4(
  figure: HTMLElement,
  video: HTMLVideoElement,
  mp4Url: string,
  reducedMotion: boolean,
) {
  video.src = mp4Url;
  video.addEventListener("canplay", () => tryPlay(video, reducedMotion), {
    once: true,
  });
  figure.dataset.proseVideoInit = "true";
}

function destroyFigure(figure: HTMLElement) {
  const hls = hlsInstances.get(figure);
  if (hls) {
    hls.destroy();
    hlsInstances.delete(figure);
  }
  delete figure.dataset.proseVideoInit;
}

function initFigure(figure: HTMLElement) {
  if (figure.dataset.proseVideoInit === "true") return;

  const video = figure.querySelector("video");
  if (!(video instanceof HTMLVideoElement)) return;

  const { hls: hlsUrl, mp4: mp4Url } = resolveFigureUrls(figure);
  if (!hlsUrl && !mp4Url) return;

  const reducedMotion = prefersReducedMotion();
  if (reducedMotion) {
    video.removeAttribute("autoplay");
  }

  if (hlsUrl && video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = hlsUrl;
    video.addEventListener("canplay", () => tryPlay(video, reducedMotion), {
      once: true,
    });
    figure.dataset.proseVideoInit = "true";
    return;
  }

  if (hlsUrl && Hls.isSupported()) {
    const hls = new Hls({ maxBufferLength: 10 });
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(hlsUrl);
    });
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      tryPlay(video, reducedMotion);
    });
    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (!data.fatal) return;
      hls.destroy();
      hlsInstances.delete(figure);
      if (mp4Url) {
        useMp4(figure, video, mp4Url, reducedMotion);
      }
    });
    hlsInstances.set(figure, hls);
    figure.dataset.proseVideoInit = "true";
    return;
  }

  if (hlsUrl) {
    video.src = hlsUrl;
    video.addEventListener("canplay", () => tryPlay(video, reducedMotion), {
      once: true,
    });
    figure.dataset.proseVideoInit = "true";
    return;
  }

  if (mp4Url) {
    useMp4(figure, video, mp4Url, reducedMotion);
  }
}

export function destroyProseVideo(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-prose-video]").forEach(destroyFigure);
}

export function initProseVideo(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-prose-video]").forEach(initFigure);
}

if (typeof document !== "undefined") {
  document.addEventListener(PAGE_LEAVE_EVENT, () => {
    destroyProseVideo(document);
  });
}
