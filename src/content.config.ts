import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import {
  animationCategories,
  animationLibraries,
  animationTriggers,
} from "./src/config/animation-taxonomy";

const docs = defineCollection({
  loader: glob({
    base: "./src/content",
    pattern: [
      "code/**/*.md",
      "ai/**/*.md",
      "tools/**/*.md",
      "references/**/*.md",
      "design/animations/**/*.md",
      "design/design-engineering/**/*.md",
      "design/interface/**/*.md",
      "design/typography/**/*.md",
      "design/ui/**/*.md",
    ],
    generateId: ({ entry }) => entry.replace(/\.md$/i, ""),
  }),
  schema: z.object({
    domain: z.string(),
    section: z.string(),
    chapter: z.string(),
    title: z.string(),
    order: z.number(),
    description: z.string().optional(),
    chapterLabel: z.string().optional(),
    sectionTitle: z.string().optional(),
  }),
});

const animations = defineCollection({
  loader: glob({
    base: "./src/content/design/animation-library",
    pattern: "**/*.md",
    generateId: ({ entry }) => entry.replace(/\.md$/i, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    previewVideo: z.string(),
    order: z.number(),
    published: z.boolean().default(false),
    categories: z.array(z.enum(animationCategories)),
    triggers: z.array(z.enum(animationTriggers)),
    libraries: z.array(z.enum(animationLibraries)),
    keywords: z.array(z.string()).optional(),
    sourceUrl: z.string().url().optional(),
    codeTabs: z.boolean().optional(),
  }),
});

export const collections = { docs, animations };
