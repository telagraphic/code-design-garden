import { defineConfig } from "astro/config";
import rehypeSlug from "rehype-slug";
import { rehypeCodeSnippet } from "./src/rehype/rehype-code-snippet.mjs";
import { rehypeCodeTabs } from "./src/rehype/rehype-code-tabs.mjs";
import { rehypeProseVideo } from "./src/rehype/rehype-prose-video.mjs";

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
    rehypePlugins: [
      rehypeSlug,
      [rehypeCodeSnippet, {}],
      [rehypeCodeTabs, {}],
      [rehypeProseVideo, {}],
    ],
  },
});
