#!/usr/bin/env node
/**
 * Migrate Osmo animation resources into animation-library/*.md
 * and copy preview mp4s to media/animations/previews/.
 *
 * Sources: archived osmo tree (ANIMATION_OSMO_ARCHIVE or ~/Archive/code-design-garden-osmo).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  animationLibraryDir,
  osmoArchiveDir,
  previewMediaDir,
} from "./lib/animation-media-paths.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const osmoDir = osmoArchiveDir;
const libraryDir = animationLibraryDir;
const previewsDir = previewMediaDir;

const OVERRIDES = {
  "sticky-features": {
    title: "Sticky Features",
    description:
      "Scroll-driven sticky panel with image and copy columns, synced with GSAP ScrollTrigger.",
    order: 102,
    categories: ["scroll", "image-carousel", "layout"],
    triggers: ["scroll"],
    libraries: ["gsap"],
    keywords: ["sticky", "features", "scrolltrigger"],
  },
  "sticky-title-scroll-effect": {
    title: "Sticky Title Scroll Effect",
    description:
      "Large title stays pinned while content scrolls beneath it.",
    order: 101,
    categories: ["text", "scroll"],
    triggers: ["scroll"],
    libraries: ["gsap"],
    keywords: ["sticky", "title", "typography"],
  },
  "mega-navigation-menu": {
    title: "Mega Navigation Menu",
    description: "Full-width navigation with animated mega menu panels.",
    order: 100,
    categories: ["navigation"],
    triggers: ["hover", "click"],
    libraries: ["gsap"],
    keywords: ["nav", "menu", "mega"],
  },
  "scramble-text": {
    title: "Scramble Text",
    description: "Decoding-style text scramble on interaction.",
    order: 99,
    categories: ["text"],
    triggers: ["hover", "load"],
    libraries: ["vanilla-js"],
    keywords: ["scramble", "decode", "typography"],
  },
  "shutter-page-transition": {
    title: "Shutter Page Transition",
    description: "Panel shutter wipe between pages with GSAP.",
    order: 98,
    categories: ["page-transition"],
    triggers: ["click", "load"],
    libraries: ["gsap"],
    keywords: ["barba", "shutter", "transition"],
  },
  "page-transitions/cross-fade-page-transition": {
    title: "Cross Fade Page Transition",
    description: "Overlapping leave and enter fades for route changes.",
    order: 97,
    categories: ["page-transition"],
    triggers: ["click", "load"],
    libraries: ["gsap"],
    keywords: ["crossfade", "transition", "barba"],
  },
  "draggable-marquee": {
    title: "Draggable Marquee",
    description: "Horizontally draggable looping marquee strip.",
    order: 96,
    categories: ["layout"],
    triggers: ["drag"],
    libraries: ["gsap"],
    keywords: ["marquee", "draggable", "loop"],
  },
  "infinite-draggable-grid": {
    title: "Infinite Draggable Grid",
    description: "Draggable infinite grid of tiles with momentum.",
    order: 95,
    categories: ["layout", "image-carousel"],
    triggers: ["drag"],
    libraries: ["gsap"],
    keywords: ["grid", "infinite", "draggable"],
  },
  "buttons/button-001": {
    title: "Button 001",
    description: "Layered circle button with hover depth animation.",
    order: 94,
    categories: ["button"],
    triggers: ["hover"],
    libraries: ["css-only"],
    keywords: ["button", "hover", "circles"],
  },
  "3D-image-carousel": {
    title: "3D Image Carousel",
    description: "Perspective carousel of images with drag and snap.",
    order: 93,
    categories: ["image-carousel"],
    triggers: ["drag", "scroll"],
    libraries: ["gsap"],
    keywords: ["carousel", "3d", "gallery"],
  },
};

const SECTION_HEADERS = {
  scripts: "### Scripts",
  html: "### HTML",
  css: "### CSS",
  javascript: "### Javascript",
};

const SKIP_LINE = [
  /^Make sure to always put the External Scripts/i,
  /^In the video below we described how you can copy/i,
  /^In this video, Ilja gives you some guidance/i,
  /^Curious about where to put custom CSS/i,
];

function walkMd(dir, prefix = "") {
  /** @type {string[]} */
  const files = [];
  for (const entry of fs.readdirSync(path.join(dir, prefix), {
    withFileTypes: true,
  })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...walkMd(dir, rel));
    else if (entry.name.endsWith(".md")) files.push(rel.replace(/\.md$/, ""));
  }
  return files.sort();
}

function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) return { data: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: raw };
  const yaml = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();
  const data = {};
  for (const line of yaml.split("\n")) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    let val = m[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    data[m[1]] = val;
  }
  return { data, body };
}

function slugToTitle(slug) {
  const base = path.basename(slug);
  if (/^button-\d+$/i.test(base)) {
    return `Button ${base.replace(/^button-/i, "")}`;
  }
  return base
    .split("-")
    .map((w) => (w === "3d" ? "3D" : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

function extractTitle(markdownBody, slug) {
  const beforeDoc = markdownBody.split(/^##\s+Documentation/im)[0] ?? "";
  const h1 = beforeDoc.match(/^#\s+(.+)$/m);
  if (h1 && !/^documentation$/i.test(h1[1].trim())) return h1[1].trim();

  const h2 = beforeDoc.match(/^##\s+(.+)$/m);
  if (h2 && !/^documentation$/i.test(h2[1].trim())) return h2[1].trim();

  const imgAlt = beforeDoc.match(/!\[([^\]]+)\]/);
  if (imgAlt) return imgAlt[1].trim();

  const iframeTitle = beforeDoc.match(/title="([^"]+)"/);
  if (iframeTitle) return iframeTitle[1].trim();

  return slugToTitle(slug);
}

function inferCodeSection(content) {
  const t = content.trim();
  if (!t) return "html";
  if (
    /^<script[\s>]/i.test(t) ||
    (t.includes("<script") && !/^<[a-z!][^>]*>/i.test(t.split("\n")[0]))
  ) {
    return "scripts";
  }
  if (t.startsWith("<") || t.startsWith("<!")) return "html";
  if (/^(\.|#|:root|\*|@media|@keyframes|\[)/.test(t)) return "css";
  return "javascript";
}

function inferCategories(slug, title, body) {
  const hay = `${slug} ${title} ${body}`.toLowerCase();
  /** @type {string[]} */
  const cats = [];

  const add = (c) => {
    if (!cats.includes(c)) cats.push(c);
  };

  if (slug.startsWith("buttons/") || /\bbutton\b/.test(hay)) add("button");
  if (slug.includes("page-transition") || /\bpage transition\b/.test(hay)) {
    add("page-transition");
  }
  if (/\bcursor\b/.test(hay)) add("cursor");
  if (/\b(loader|loading|skeleton)\b/.test(hay)) add("loader");
  if (/\bfilter\b/.test(hay)) add("filter");
  if (/\b(nav|navigation|menu)\b/.test(hay)) add("navigation");
  if (/\bscroll\b/.test(hay)) add("scroll");
  if (/\b(carousel|slider|marquee|gallery)\b/.test(hay)) add("image-carousel");
  if (/\b(text|typo|scramble|heading)\b/.test(hay)) add("text");
  if (/\b(video|audio|hls|player|bunny)\b/.test(hay)) add("media");
  if (/\b(grid|layout|marquee|draggable)\b/.test(hay)) add("layout");

  if (cats.length === 0) add("utility");
  return cats.slice(0, 3);
}

function inferTriggers(slug, body) {
  const hay = `${slug} ${body}`.toLowerCase();
  /** @type {string[]} */
  const triggers = [];
  const add = (t) => {
    if (!triggers.includes(t)) triggers.push(t);
  };

  if (/\bscroll(trigger)?\b/.test(hay)) add("scroll");
  if (/\bhover\b/.test(hay)) add("hover");
  if (/\b(drag|draggable|observer)\b/.test(hay)) add("drag");
  if (/\b(click|tap|press)\b/.test(hay)) add("click");
  if (/\b(load|domcontentloaded|pageload)\b/.test(hay)) add("load");
  if (/\b(mouse|pointer|mousemove)\b/.test(hay)) add("mouse-move");
  if (/\bautoplay\b/.test(hay)) add("autoplay");

  if (triggers.length === 0) add("load");
  return triggers.slice(0, 4);
}

function inferLibraries(body) {
  const hay = body.toLowerCase();
  if (/\bgsap\b|scrolltrigger|splittext|scrambletext|draggable|observer/.test(hay)) {
    return ["gsap"];
  }
  if (
    !/\b(function|const |let |document\.|addEventListener|queryselector)\b/.test(
      hay,
    ) &&
    /\{[\s\S]*?:[\s\S]*?;\s*\}/.test(hay)
  ) {
    return ["css-only"];
  }
  return ["vanilla-js"];
}

function inferKeywords(slug, title) {
  const base = path.basename(slug);
  const words = `${title} ${base}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((w) => w.length > 2 && !["the", "with", "and", "for"].includes(w));
  return [...new Set(words)].slice(0, 6);
}

function buildMetadata(slug, rawBody, srcMeta, override) {
  if (override) return override;

  const title = extractTitle(rawBody, slug);
  const bodyPreview = rawBody.slice(0, 4000);
  return {
    title,
    description: `${title}.`,
    order: 50,
    categories: inferCategories(slug, title, bodyPreview),
    triggers: inferTriggers(slug, bodyPreview),
    libraries: inferLibraries(bodyPreview),
    keywords: inferKeywords(slug, title),
  };
}

function stripNoise(text) {
  let out = text;
  out = out.replace(/<svg[\s\S]*?<\/svg>/gi, "");
  out = out.replace(/!\[[^\]]*\]\([^)]+\)/g, "");
  out = out.replace(/<img[^>]*>/gi, "");
  out = out.replace(/<video[\s\S]*?<\/video>/gi, "");
  out = out.replace(/<iframe[\s\S]*?<\/iframe>/gi, "");
  out = out.replace(/<video[^>]*\/>/gi, "");
  out = out.replace(/\[close\]\([^)]+\)/gi, "");
  out = out.replace(/^Notification\s*$/gm, "");
  out = out.replace(/^Copy to Webflow\s*$/gim, "");
  out = out.replace(/^Copy\s*$/gim, "");
  out = out.replace(/^Make sure to always put the External Scripts.*$/gim, "");
  out = out.replace(/^In the video below we described how you can copy.*$/gim, "");
  out = out.replace(/^In this video, Ilja gives you some guidance.*$/gim, "");
  out = out.replace(/^Curious about where to put custom CSS.*$/gim, "");
  out = out.replace(/^Webflow structure is not required.*$/gim, "");
  out = out.replace(/^HTML structure is not required.*$/gim, "");
  out = out.replace(/^Step \d+:.*$/gim, "");
  out = out.replace(/^Setup:.*$/gim, "");
  out = out.replace(
    /^\s*-\s*\[\s*\n[\s\S]*?osmo\.outseta\.com[^)]*\)\s*$/gm,
    "",
  );
  out = out.replace(
    /^\[[^\]]+\]\([^)]+\)(?:\s+\[[^\]]+\]\([^)]+\))+\s*$/gm,
    "",
  );
  return out;
}

function isCourseNoiseLine(trimmed) {
  if (!trimmed) return true;
  if (/^00:00$/.test(trimmed)) return true;
  if (/^\/?$/.test(trimmed)) return true;
  if (/^\d{1,2}:\d{2}$/.test(trimmed)) return true;
  if (/^Copy$/i.test(trimmed)) return true;
  if (/^Notification$/i.test(trimmed)) return true;
  if (/^Subscription$/i.test(trimmed)) return true;
  if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) return true;
  if (/^\d+ days$/i.test(trimmed)) return true;
  if (/^\]\([^)]+\)$/.test(trimmed)) return true;
  if (/^\[\s*$/.test(trimmed)) return true;
  return false;
}

function findIntroBeforeLessonNotes(lines, lessonNotesIndex) {
  let start = lessonNotesIndex;
  for (let j = lessonNotesIndex - 1; j >= 0; j--) {
    const t = lines[j].trim();
    if (!t) continue;
    if (/^## /.test(t)) break;
    if (isCourseNoiseLine(t)) continue;
    if (t.length >= 20) start = j;
    else break;
  }
  return start;
}

/** Where body capture starts: vault `## Documentation` or course lesson content. */
function findContentStart(lines) {
  for (let i = 0; i < lines.length; i++) {
    if (/^##\s+Documentation/i.test(lines[i].trim())) {
      return { index: i, mode: "vault" };
    }
  }

  for (let i = 0; i < lines.length; i++) {
    if (/^###\s+Lesson [Nn]otes?/i.test(lines[i].trim())) {
      return { index: findIntroBeforeLessonNotes(lines, i), mode: "course" };
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (!/^## [^#]/.test(t) || /^## Documentation/i.test(t)) continue;
    for (let j = i + 1; j < lines.length; j++) {
      const u = lines[j].trim();
      if (!u) continue;
      if (isCourseNoiseLine(u)) continue;
      if (/^###\s+Lesson [Nn]otes?/i.test(u)) {
        return { index: findIntroBeforeLessonNotes(lines, j), mode: "course" };
      }
      if (u.length >= 20 && !u.startsWith("#")) {
        return { index: j, mode: "course" };
      }
      if (u.startsWith("#")) return { index: j, mode: "course" };
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (isCourseNoiseLine(t)) continue;
    if (/^###\s+Lesson [Cc]ode/i.test(t)) {
      return { index: findIntroBeforeLessonNotes(lines, i), mode: "course" };
    }
    if (t.length >= 40 && !t.startsWith("#") && !t.startsWith("[")) {
      return { index: i, mode: "course" };
    }
  }

  return { index: -1, mode: "none" };
}

function shouldStopCapture(trimmed) {
  return (
    /^#{2,3}\s+Creator Credits/i.test(trimmed) ||
    /^###\s+Questions\?/i.test(trimmed)
  );
}

function mapWebflowHeading(line) {
  const h = line.trim();
  if (h === "### External Scripts in Webflow") return "### Scripts";
  if (h === "### Copy structure to Webflow") return "### HTML";
  if (h === "### Custom Javascript in Webflow" || h === "### Custom JavaScript in Webflow") {
    return "### Javascript";
  }
  if (h === "### Custom CSS in Webflow") return "### CSS";
  return null;
}

function extractBody(markdownBody) {
  const cleaned = stripNoise(markdownBody);
  const lines = cleaned.split("\n");
  const { index: contentStart, mode } = findContentStart(lines);
  const result = [];
  let inCode = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (contentStart < 0 || i < contentStart) continue;
    if (shouldStopCapture(trimmed)) break;

    if (mode === "vault" && line.match(/^##\s+Documentation/i)) {
      result.push("## Setup");
      continue;
    }

    if (mode === "course" && /^## [^#]/.test(trimmed) && !/^## Documentation/i.test(trimmed)) {
      continue;
    }

    if (isCourseNoiseLine(trimmed)) continue;

    if (line.startsWith("```")) {
      if (!inCode) {
        inCode = true;
        const lang = line.slice(3).trim().toLowerCase();
        let codeLang = "text";
        if (lang === "javascript" || lang === "js") codeLang = "javascript";
        else if (lang === "css") codeLang = "css";
        else if (lang === "html") codeLang = "html";
        else if (lang) codeLang = lang;
        result.push(`\`\`\`${codeLang}`);
      } else {
        inCode = false;
        result.push("```");
      }
      continue;
    }

    if (inCode) {
      result.push(line);
      continue;
    }

    if (/^(HTML|CSS|Javascript|JavaScript|Scripts)$/i.test(trimmed)) continue;

    if (trimmed === "") {
      if (result.length && result[result.length - 1] !== "") result.push("");
      continue;
    }

    if (line.startsWith("#")) {
      const mapped = mapWebflowHeading(line);
      if (mapped) {
        result.push(mapped);
        continue;
      }
      result.push(line);
      continue;
    }

    if (trimmed.length < 3) continue;
    if (/^https?:\/\//.test(trimmed)) continue;
    if (SKIP_LINE.some((re) => re.test(trimmed))) continue;

    result.push(line);
  }

  return stripCreatorCredits(result.join("\n").replace(/\n{3,}/g, "\n\n").trim());
}

function stripCreatorCredits(text) {
  let out = text.replace(/\n*#{2,3}\s+Creator Credits[\s\S]*$/i, "");
  out = out.replace(/\n*#{2,3}\s+Questions\?[\s\S]*$/i, "");
  out = out.replace(/\n*Resource details\n[\s\S]*$/i, "");
  return out.trim();
}

function hasSectionHeaderAbove(lines, index) {
  for (let i = index - 1; i >= 0; i--) {
    const t = lines[i].trim();
    if (t === "") continue;
    if (/^## /.test(t) && t !== "## Setup") return false;
    if (/^### (Scripts|HTML|CSS|Javascript)$/.test(t)) return true;
    if (t.startsWith("#")) return false;
    return false;
  }
  return false;
}

function readFenceContent(lines, openIndex) {
  const content = [];
  let i = openIndex + 1;
  while (i < lines.length && !lines[i].startsWith("```")) {
    content.push(lines[i]);
    i++;
  }
  return content.join("\n");
}

/** Insert ### Scripts / HTML / CSS / Javascript before orphan code fences under ## Setup. */
function normalizeSetupSections(body) {
  const lines = body.split("\n");
  /** @type {string[]} */
  const out = [];
  let inSetup = false;
  let inCode = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "## Setup") {
      inSetup = true;
      out.push(line);
      continue;
    }

    if (inSetup && /^## /.test(trimmed) && trimmed !== "## Setup") {
      inSetup = false;
    }

    if (trimmed.startsWith("```")) {
      if (
        inSetup &&
        !inCode &&
        !hasSectionHeaderAbove(out, out.length)
      ) {
        const content = readFenceContent(lines, i);
        const section = inferCodeSection(content);
        out.push(SECTION_HEADERS[section]);
      }
      inCode = !inCode;
      out.push(line);
      continue;
    }

    out.push(line);
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function getSetupSection(body) {
  const start = body.indexOf("## Setup");
  if (start < 0) return "";
  let end = body.length;
  const nextH2 = body.indexOf("\n## ", start + 1);
  if (nextH2 >= 0) end = nextH2;
  return body.slice(start, end);
}

function countSetupTabSections(body) {
  const setup = getSetupSection(body);
  if (!setup) return 0;
  return (setup.match(/^### (Scripts|HTML|CSS|Javascript)$/gm) ?? []).length;
}

function addCodeTabsMarker(body) {
  if (body.includes("<!-- code-tabs -->")) return body;
  if (countSetupTabSections(body) < 2) return body;
  return body.replace(/^## Setup\n\n/, "## Setup\n\n<!-- code-tabs -->\n\n");
}

function removeEmptyLangHeadings(text) {
  const lines = text.split("\n");
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === "### Scripts" || trimmed === "### Javascript") {
      let j = i + 1;
      let hasCode = false;
      while (j < lines.length) {
        const t = lines[j].trim();
        if (t.startsWith("###")) break;
        if (t.startsWith("```")) hasCode = true;
        j++;
      }
      if (!hasCode) continue;
    }
    out.push(lines[i]);
  }

  return out.join("\n");
}

function finalizeBody(rawBody) {
  let body = extractBody(rawBody);
  body = normalizeSetupSections(body);
  body = removeEmptyLangHeadings(body);
  body = addCodeTabsMarker(body);
  return body || "_Documentation pending migration review._";
}

function yamlQuote(str) {
  return `"${String(str).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function yamlArray(arr) {
  return `[${arr.map((v) => yamlQuote(v)).join(", ")}]`;
}

function findMp4(slug) {
  const baseName = path.basename(slug);
  const candidates = [
    path.join(osmoDir, `${slug}.mp4`),
    path.join(osmoDir, path.dirname(slug), `${baseName}.mp4`),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function migrateSlug(slug, index) {
  const srcMd = path.join(osmoDir, `${slug}.md`);
  if (!fs.existsSync(srcMd)) throw new Error(`Missing ${srcMd}`);

  const override = OVERRIDES[slug];
  const raw = fs.readFileSync(srcMd, "utf8");
  const { data: srcMeta, body } = parseFrontmatter(raw);
  const meta = buildMetadata(slug, body, srcMeta, override);
  if (!override) meta.order = 50 - index * 0.001;

  const bodyOut = finalizeBody(body);
  const baseName = path.basename(slug);
  const previewFile = `${baseName}.mp4`;
  const mp4Src = findMp4(slug);

  if (mp4Src) {
    const previewDestDir = path.join(previewsDir, path.dirname(slug));
    const previewDest = path.join(previewDestDir, previewFile);
    fs.mkdirSync(previewDestDir, { recursive: true });
    fs.copyFileSync(mp4Src, previewDest);
  }

  const outDir = path.join(libraryDir, path.dirname(slug));
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(libraryDir, `${slug}.md`);
  const published = true;
  const sourceUrl = srcMeta.source || "";

  const fm = [
    "---",
    `title: ${yamlQuote(meta.title)}`,
    `description: ${yamlQuote(meta.description)}`,
    `slug: ${yamlQuote(slug)}`,
    `previewVideo: ${yamlQuote(previewFile)}`,
    `order: ${meta.order}`,
    `published: ${published}`,
    `categories: ${yamlArray(meta.categories)}`,
    `triggers: ${yamlArray(meta.triggers)}`,
    `libraries: ${yamlArray(meta.libraries)}`,
    `keywords: ${yamlArray(meta.keywords || [])}`,
    sourceUrl ? `sourceUrl: ${yamlQuote(sourceUrl)}` : null,
    "---",
    "",
    bodyOut,
    "",
  ]
    .filter(Boolean)
    .join("\n");

  fs.writeFileSync(outFile, fm);

  const flags = [mp4Src ? "mp4" : "no-mp4"].join(", ");
  console.log(`✓ ${slug} (${flags})`);
}

if (!fs.existsSync(osmoDir)) {
  console.error(
    `Osmo archive not found: ${osmoDir}\n` +
      `Restore sources or set ANIMATION_OSMO_ARCHIVE.`,
  );
  process.exit(1);
}

fs.mkdirSync(libraryDir, { recursive: true });
fs.mkdirSync(previewsDir, { recursive: true });

const slugs = walkMd(osmoDir);
let missingMp4 = 0;

for (let i = 0; i < slugs.length; i++) {
  migrateSlug(slugs[i], i);
  if (!findMp4(slugs[i])) missingMp4 += 1;
}

console.log(
  `\nDone. ${slugs.length} entries in animation-library/, previews in media/animations/previews/.`,
);
if (missingMp4 > 0) {
  console.log(`⚠ ${missingMp4} entries have no local mp4 (published: false only).`);
}
