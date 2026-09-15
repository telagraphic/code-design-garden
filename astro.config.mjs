import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import { rehypeCodeSnippet } from "./src/rehype/rehype-code-snippet.mjs";
import { rehypeCodeTabs } from "./src/rehype/rehype-code-tabs.mjs";
import { rehypeProseVideo } from "./src/rehype/rehype-prose-video.mjs";

/** Netlify sets URL; override with PUBLIC_SITE_URL for custom domains / local. */
const site =
  process.env.PUBLIC_SITE_URL ||
  process.env.URL ||
  "https://my-website-for-this.netlify.app";

export default defineConfig({
  site,
  trailingSlash: "ignore",
  integrations: [sitemap()],
  redirects: {
    "/blog": "/posts",
    "/blog/[slug]": "/posts/[slug]",
    "/demos/scroll-trigger-architecture":
      "/demos/scroll-trigger-architecture/dist/",
    "/demos/scroll-trigger-architecture/dist":
      "/demos/scroll-trigger-architecture/dist/",
  },
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
