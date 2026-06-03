import { defineConfig } from "astro/config";
import rehypeSlug from "rehype-slug";
import { rehypeCodeSnippet } from "./src/rehype/rehype-code-snippet.mjs";

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
    rehypePlugins: [rehypeSlug, rehypeCodeSnippet],
  },
});
