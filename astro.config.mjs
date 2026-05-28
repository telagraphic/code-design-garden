import { defineConfig } from "astro/config";
import rehypeSlug from "rehype-slug";

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
    rehypePlugins: [rehypeSlug],
  },
});
