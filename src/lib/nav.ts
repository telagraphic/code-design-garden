import { domains } from "@/config/home";

export type NavArea = "blog" | "garden";

const gardenRoots = new Set([
  "garden",
  ...domains.map((domain) => domain.slug),
]);

/** Which top-level nav item is active for the current path. */
export function getNavArea(pathname: string): NavArea {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (!segment) return "blog";
  if (segment === "blog") return "blog";
  if (gardenRoots.has(segment)) return "garden";
  return "blog";
}
