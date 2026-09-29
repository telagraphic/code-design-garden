import { domains } from "@/config/home";

export type NavArea = "blog" | "garden" | "about";

export const navItems = [
  { href: "/", label: "About", area: "about" },
  { href: "/posts", label: "Posts", area: "blog" },
  { href: "/garden", label: "Garden", area: "garden" },
] as const satisfies readonly { href: string; label: string; area: NavArea }[];

export const postsLabel =
  navItems.find((item) => item.area === "blog")?.label ?? "Posts";

const gardenRoots = new Set([
  "garden",
  ...domains.map((domain) => domain.slug),
]);

/** Which top-level nav item is active for the current path. */
export function getNavArea(pathname: string): NavArea {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (!segment || segment === "about") return "about";
  if (segment === "blog" || segment === "posts") return "blog";
  if (gardenRoots.has(segment)) return "garden";
  return "blog";
}
