import type { BarbaPageUrl, BarbaTransitionData } from "./types";

export type TransitionKind = "pixel" | "shutter" | "slidingColumns" | "none";

export function getDomainFromPath(pathname: string): string {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment ?? "home";
}

export function getPathnameFromPageUrl(
  url: BarbaPageUrl | string,
): string {
  if (typeof url === "string") {
    return new URL(url, window.location.origin).pathname;
  }
  if (url.path) return url.path;
  if (url.href) {
    return new URL(url.href, window.location.origin).pathname;
  }
  return window.location.pathname;
}

/** Destination URL decides which transition runs (code → pixel, design → shutter, ai → sliding columns). */
export function resolveTransition(data: BarbaTransitionData): TransitionKind {
  const pathname = getPathnameFromPageUrl(data.next.url);
  let nextDomain = getDomainFromPath(pathname);

  // Fallback when path is empty but namespace is set on the container
  if (nextDomain === "home" && data.next.namespace) {
    nextDomain = data.next.namespace;
  }

  if (nextDomain === "code") return "pixel";
  if (nextDomain === "design") return "shutter";
  if (nextDomain === "ai") return "slidingColumns";
  return "none";
}
