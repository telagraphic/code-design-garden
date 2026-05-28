import { getCollection, type CollectionEntry } from "astro:content";
import { emptyChapters } from "@/config/sections";

export type DocEntry = CollectionEntry<"docs">;

export function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Path segment after /{domain}/{section}/ (supports nested folders). */
export function getSlug(entry: DocEntry): string {
  const prefix = `${entry.data.domain}/${entry.data.section}/`;
  if (entry.id.startsWith(prefix)) {
    return entry.id.slice(prefix.length);
  }
  const parts = entry.id.split("/");
  return parts.slice(2).join("/");
}

export function getPagePath(entry: DocEntry): string {
  const slug = getSlug(entry);
  return `/${entry.data.domain}/${entry.data.section}/${slug}`;
}

export function chapterLabel(chapter: string, entry?: DocEntry): string {
  if (entry?.data.chapter === chapter && entry.data.chapterLabel) {
    return entry.data.chapterLabel;
  }
  return titleCase(chapter);
}

export async function getAllDocs(): Promise<DocEntry[]> {
  return getCollection("docs");
}

export async function getDocsByDomain(domain: string): Promise<DocEntry[]> {
  const docs = await getAllDocs();
  return docs.filter((d) => d.data.domain === domain);
}

export async function getDocsBySection(
  domain: string,
  section: string,
): Promise<DocEntry[]> {
  const docs = await getAllDocs();
  return docs
    .filter((d) => d.data.domain === domain && d.data.section === section)
    .sort((a, b) => {
      if (a.data.chapter !== b.data.chapter) {
        return a.data.chapter.localeCompare(b.data.chapter);
      }
      return a.data.order - b.data.order;
    });
}

export function getSectionsInDomain(
  docs: DocEntry[],
  domain: string,
): string[] {
  const set = new Set(
    docs.filter((d) => d.data.domain === domain).map((d) => d.data.section),
  );
  return [...set].sort();
}

/** Homepage card for a section (href, title, description). */
export type HomepageSectionLink = {
  href: string;
  title: string;
  desc: string;
};

/**
 * Section "root" page for homepage/domain metadata.
 * 1. `{domain}/{section}/1-overview.md`
 * 2. Shallowest `…/1-overview.md` in the section (e.g. react/01-react/1-overview)
 * 3. Lowest-order page in `chapter: overview`
 */
export function getSectionOverviewEntry(
  docs: DocEntry[],
  domain: string,
  section: string,
): DocEntry | undefined {
  const sectionDocs = docs.filter(
    (d) => d.data.domain === domain && d.data.section === section,
  );
  if (!sectionDocs.length) return undefined;

  const root = sectionDocs.find((d) => d.id === `${domain}/${section}/1-overview`);
  if (root) return root;

  const overviewFiles = sectionDocs.filter((d) => {
    const slug = getSlug(d);
    return slug === "1-overview" || slug.endsWith("/1-overview");
  });
  if (overviewFiles.length) {
    return overviewFiles.sort(
      (a, b) => getSlug(a).split("/").length - getSlug(b).split("/").length,
    )[0];
  }

  return sectionDocs
    .filter((d) => d.data.chapter === "overview")
    .sort((a, b) => a.data.order - b.data.order)[0];
}

/** Display label for a section (from overview `sectionTitle`, not slug casing). */
export function getSectionTitle(
  docs: DocEntry[],
  domain: string,
  section: string,
): string {
  const entry = getSectionOverviewEntry(docs, domain, section);
  return entry?.data.sectionTitle ?? section;
}

/** Links for the homepage topic list under a domain. */
export function getHomepageSectionLinks(
  docs: DocEntry[],
  domain: string,
): HomepageSectionLink[] {
  return getSectionsInDomain(docs, domain).map((section) => {
    const entry = getSectionOverviewEntry(docs, domain, section);
    const title = getSectionTitle(docs, domain, section);
    return {
      href: `/${domain}/${section}`,
      title,
      desc: entry?.data.description ?? `Explore ${title}.`,
    };
  });
}

export type ChapterGroup = {
  slug: string;
  label: string;
  pages: DocEntry[];
};

export function getChapterGroups(
  sectionDocs: DocEntry[],
  domain: string,
  section: string,
): ChapterGroup[] {
  const key = `${domain}/${section}`;
  const extra = emptyChapters[key] ?? [];
  const chapterSet = new Set<string>();

  for (const doc of sectionDocs) {
    chapterSet.add(doc.data.chapter);
  }
  for (const ch of extra) {
    chapterSet.add(ch);
  }

  const chapterOrder: Record<string, number> = {
    overview: 1,
    concepts: 2,
    challenges: 3,
    "react-vs-vanilla": 4,
  };

  const chapters = [...chapterSet].sort((a, b) => {
    const orderA = chapterOrder[a] ?? 999;
    const orderB = chapterOrder[b] ?? 999;
    if (orderA !== orderB) return orderA - orderB;
    return a.localeCompare(b);
  });

  return chapters.map((slug) => ({
    slug,
    label: chapterLabel(
      slug,
      sectionDocs.find((d) => d.data.chapter === slug),
    ),
    pages: sectionDocs
      .filter((d) => d.data.chapter === slug)
      .sort((a, b) => a.data.order - b.data.order),
  }));
}

export function getActiveNavDomain(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  return parts[0] ?? null;
}
