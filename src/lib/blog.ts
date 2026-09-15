import { getCollection, type CollectionEntry } from "astro:content";

export type BlogEntry = CollectionEntry<"blog">;

export type BlogLink = {
  href: string;
  title: string;
  desc: string;
  date: string;
};

/** Filename stem from collection id (e.g. `hello-world` from `hello-world.md`). */
export function getBlogSlug(entry: BlogEntry): string {
  const id = entry.id;
  const filename = id.includes("/") ? id.slice(id.lastIndexOf("/") + 1) : id;
  return filename.replace(/\.md$/i, "");
}

export const postsPath = "/posts";

export function getBlogPath(entry: BlogEntry): string {
  return `${postsPath}/${getBlogSlug(entry)}`;
}

function toDate(value: Date | string): Date {
  return value instanceof Date ? value : new Date(value);
}

export function formatPubDate(date: Date | string): string {
  const value = toDate(date);
  const parts = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).formatToParts(value);
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  const year = parts.find((part) => part.type === "year")?.value;
  return `${month}-${day}-${year}`;
}

/** Visible on the site unless explicitly unpublished. */
export function isLivePost(entry: BlogEntry): boolean {
  return entry.data.published !== false;
}

export async function getAllBlogPosts(): Promise<BlogEntry[]> {
  const posts = await getCollection("blog");
  return posts.sort(
    (a, b) =>
      toDate(b.data.pubDate).getTime() - toDate(a.data.pubDate).getTime(),
  );
}

export async function getLiveBlogPosts(): Promise<BlogEntry[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(isLivePost);
}

export function toBlogLink(entry: BlogEntry): BlogLink {
  return {
    href: getBlogPath(entry),
    title: entry.data.title,
    desc: entry.data.description,
    date: formatPubDate(entry.data.pubDate),
  };
}

export function getRecentBlogLinks(
  posts: BlogEntry[],
  limit = 5,
): BlogLink[] {
  return posts.slice(0, limit).map(toBlogLink);
}

export function getMorePosts(
  posts: BlogEntry[],
  current: BlogEntry,
  limit = 8,
): BlogEntry[] {
  const currentSlug = getBlogSlug(current);
  return posts
    .filter((post) => getBlogSlug(post) !== currentSlug)
    .slice(0, limit);
}
