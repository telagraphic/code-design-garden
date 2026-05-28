import { domains } from "@/config/home";
import type { DocEntry } from "./docs";
import {
  getPagePath,
  getSectionOverviewEntry,
  getSectionsInDomain,
  getSectionTitle,
  titleCase,
  chapterLabel,
} from "./docs";

type CmdItem = {
  id: string;
  title: string;
  subtitle?: string;
  href?: string;
};

type CmdSection = {
  id: string;
  title: string;
  items: CmdItem[];
};

function sortSectionDocs(a: DocEntry, b: DocEntry): number {
  if (a.data.chapter !== b.data.chapter) {
    return a.data.chapter.localeCompare(b.data.chapter);
  }
  return a.data.order - b.data.order;
}

function pageItems(docs: DocEntry[]): CmdItem[] {
  return [...docs].sort(sortSectionDocs).map((d) => ({
    id: d.id,
    title: d.data.title,
    subtitle: chapterLabel(d.data.chapter, d),
    href: getPagePath(d),
  }));
}

function sectionHubItems(
  allDocs: DocEntry[],
  domain: string,
  excludeSection?: string,
): CmdItem[] {
  return getSectionsInDomain(allDocs, domain)
    .filter((section) => section !== excludeSection)
    .map((section) => {
      const entry = getSectionOverviewEntry(allDocs, domain, section);
      const title = getSectionTitle(allDocs, domain, section);
      return {
        id: `${domain}/${section}`,
        title,
        subtitle: entry?.data.description,
        href: `/${domain}/${section}`,
      };
    });
}

function allSectionHubItems(allDocs: DocEntry[]): CmdItem[] {
  return domains.flatMap(({ slug: domain, label }) => {
    const items = sectionHubItems(allDocs, domain);
    if (!items.length) return [];
    return items.map((item) => ({
      ...item,
      subtitle: item.subtitle ?? label,
    }));
  });
}

function domainHubItems(excludeDomain?: string): CmdItem[] {
  return domains
    .filter((d) => d.slug !== excludeDomain)
    .map((d) => ({
      id: d.slug,
      title: d.label,
      href: `/${d.slug}`,
    }));
}

function domainLabel(domain: string): string {
  return domains.find((d) => d.slug === domain)?.label ?? titleCase(domain);
}

/**
 * Contextual Cmd+K sections (nearest first):
 * 1. Pages in current section (or sections in current domain on domain hub)
 * 2. Sibling sections in this domain
 * 3. Other domain hubs
 */
export function buildSearchSections(
  docs: DocEntry[],
  pathname: string,
): CmdSection[] {
  const parts = pathname.split("/").filter(Boolean);
  const [currentDomain, currentSection] = parts;
  const result: CmdSection[] = [];

  // —— 1. Here (pages or domain sections) ——
  if (currentDomain && currentSection) {
    const inSection = docs.filter(
      (d) =>
        d.data.domain === currentDomain && d.data.section === currentSection,
    );
    const items = pageItems(inSection);
    if (items.length) {
      result.push({
        id: "here",
        title: getSectionTitle(docs, currentDomain, currentSection),
        items,
      });
    }
  } else if (currentDomain) {
    const items = sectionHubItems(docs, currentDomain);
    if (items.length) {
      result.push({
        id: "here",
        title: domainLabel(currentDomain),
        items,
      });
    }
  } else {
    const items = allSectionHubItems(docs);
    if (items.length) {
      result.push({
        id: "here",
        title: "Sections",
        items,
      });
    }
  }

  // —— 2. Sibling sections (only when inside a section) ——
  if (currentDomain && currentSection) {
    const items = sectionHubItems(docs, currentDomain, currentSection);
    if (items.length) {
      result.push({
        id: "sections",
        title: "Sections",
        items,
      });
    }
  }

  // —— 3. Other domains ——
  const domainItems = domainHubItems(currentDomain);
  if (domainItems.length) {
    result.push({
      id: "domains",
      title: "Domains",
      items: domainItems,
    });
  }

  return result;
}
