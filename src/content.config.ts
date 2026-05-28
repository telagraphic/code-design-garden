import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const docs = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content",
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
    /** Display name for the section (homepage, nav). e.g. "CSS", "GSAP" */
    sectionTitle: z.string().optional(),
  }),
});

export const collections = { docs };
