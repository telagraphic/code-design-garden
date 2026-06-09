import type { AnimationEntry } from "@/lib/animations";
import { getAnimationPath } from "@/lib/animations";
import {
  formatCategoryLabel,
  formatTriggerLabel,
} from "@/config/animation-taxonomy";

type CmdItem = {
  id: string;
  title: string;
  subtitle?: string;
  keywords?: string[];
  href?: string;
};

type CmdSection = {
  id: string;
  title: string;
  items: CmdItem[];
};

export function buildAnimationSearchItems(
  animations: AnimationEntry[],
): CmdItem[] {
  return animations.map((entry) => {
    const cats = entry.data.categories.map(formatCategoryLabel).join(", ");
    const triggers = entry.data.triggers.map(formatTriggerLabel).join(", ");
    const keywords = [
      ...entry.data.categories,
      ...entry.data.triggers,
      ...entry.data.libraries,
      ...(entry.data.keywords ?? []),
      entry.data.slug.replace(/\//g, " "),
    ];

    return {
      id: `animation-${entry.id}`,
      title: entry.data.title,
      subtitle: [cats, triggers].filter(Boolean).join(" · "),
      keywords,
      href: getAnimationPath(entry),
    };
  });
}

export function buildAnimationSearchSection(
  animations: AnimationEntry[],
): CmdSection | null {
  const items = buildAnimationSearchItems(animations);
  if (!items.length) return null;

  return {
    id: "animation-library",
    title: "Animation library",
    items: [
      {
        id: "animation-library-browse",
        title: "Browse animation library",
        subtitle: "Grid of motion references",
        keywords: ["animation", "gallery", "collection", "osmo"],
        href: "/design/animations/library",
      },
      ...items,
    ],
  };
}
