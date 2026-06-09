#!/usr/bin/env node
/**
 * Migrate Made With GSAP (MWG) tutorial clippings into animation-library/*.md
 * and copy Tutorial {N}.mp4 previews to media/animations/previews/{slug}.mp4.
 *
 * Sources: archived mwg tree (ANIMATION_MWG_ARCHIVE or ~/Archive/code-design-garden-mwg).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  animationLibraryDir,
  mwgArchiveDir,
  previewMediaDir,
} from "./lib/animation-media-paths.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mwgDir = mwgArchiveDir;
const libraryDir = animationLibraryDir;
const previewsDir = previewMediaDir;
const reportPath = path.join(root, "docs/mwg-migration-report.md");

const GSAP_VERSION = "3.14.1";
const GSAP_CDN = `https://cdn.jsdelivr.net/npm/gsap@${GSAP_VERSION}/dist`;

const SECTION_HEADERS = {
  scripts: "### Scripts",
  html: "### HTML",
  css: "### CSS",
  javascript: "### Javascript",
};

/** @type {string[]} */
const allFlags = [];

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

function yamlQuote(str) {
  return `"${String(str).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function yamlArray(arr) {
  return `[${arr.map((v) => yamlQuote(v)).join(", ")}]`;
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * @param {string} line
 * @param {string} tutorialNumber from source URL (authoritative)
 */
function parseFirstH2(line, tutorialNumber) {
  const text = line.trim().replace(/^##\s+/, "");
  const unpadded = tutorialNumber.replace(/^0+/, "") || tutorialNumber;
  const prefixes = [...new Set([tutorialNumber, tutorialNumber.padStart(3, "0"), unpadded])];

  for (const prefix of prefixes) {
    const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const dashMatch = text.match(new RegExp(`^${escaped}\\s*-\\s*(.+)$`));
    if (dashMatch) {
      const title = dashMatch[1].trim();
      return { number: tutorialNumber, title, displayHeading: `## ${title} #${tutorialNumber}` };
    }
    const spaceMatch = text.match(new RegExp(`^${escaped}\\s+(.+)$`));
    if (spaceMatch) {
      const title = spaceMatch[1].trim();
      return { number: tutorialNumber, title, displayHeading: `## ${title} #${tutorialNumber}` };
    }
    const gluedMatch = text.match(new RegExp(`^${escaped}(.+)$`));
    if (gluedMatch) {
      const title = gluedMatch[1].trim();
      return { number: tutorialNumber, title, displayHeading: `## ${title} #${tutorialNumber}` };
    }
  }

  return null;
}

function extractTutorialNumberFromSource(srcMeta) {
  const source = srcMeta?.source ?? "";
  const m = source.match(/tutorial(\d+)/i);
  return m ? m[1] : null;
}

function extractTutorialNumber(filename, srcMeta) {
  return (
    extractTutorialNumberFromSource(srcMeta) ??
    (filename.match(/mwg-collection-(\d+)\.md$/i)?.[1] ?? null)
  );
}

function listMwgMarkdown() {
  return fs
    .readdirSync(mwgDir)
    .filter(
      (f) =>
        /^mwg-collection-\d+\.md$/i.test(f) ||
        /^Collection( \d+)?\.md$/i.test(f),
    )
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

/** Prefer Collection clippings over legacy mwg-collection files for the same tutorial. */
function preferMwgSource(candidate, incumbent) {
  const score = (f) => {
    if (/^Collection( \d+)?\.md$/i.test(f)) return 2;
    if (/^mwg-collection-/i.test(f)) return 1;
    return 0;
  };
  return score(candidate) >= score(incumbent);
}

function dedupeByTutorialNumber(files) {
  /** @type {Map<string, string>} */
  const chosen = new Map();

  for (const file of files) {
    const raw = fs.readFileSync(path.join(mwgDir, file), "utf8");
    const { data } = parseFrontmatter(raw);
    const num = extractTutorialNumber(file, data);
    if (!num) continue;

    const existing = chosen.get(num);
    if (!existing || preferMwgSource(file, existing)) {
      chosen.set(num, file);
    }
  }

  return [...chosen.entries()]
    .sort((a, b) => Number.parseInt(a[0], 10) - Number.parseInt(b[0], 10))
    .map(([, file]) => file);
}

function readFenceBlocks(lines, startIndex) {
  /** @type {{ lang: string, content: string }[]} */
  const blocks = [];
  let i = startIndex;

  while (i < lines.length) {
    while (i < lines.length && lines[i].trim() === "") i++;
    if (i >= lines.length) break;
    if (!lines[i].trim().startsWith("```")) break;

    const open = lines[i].trim();
    const lang = open.slice(3).trim().toLowerCase() || "";
    i++;
    const content = [];
    while (i < lines.length && !lines[i].startsWith("```")) {
      content.push(lines[i]);
      i++;
    }
    if (i < lines.length && lines[i].startsWith("```")) i++;
    blocks.push({ lang, content: content.join("\n") });
  }

  return blocks;
}

/**
 * @param {string} body
 * @returns {{ blocks: { section: string, content: string }[], tutorialBody: string, flags: string[] }}
 */
function splitFinalCode(body) {
  const flags = [];
  const lines = body.split("\n");
  let finalIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (/^##\s+Final code\s*$/i.test(lines[i].trim())) {
      finalIndex = i;
      break;
    }
  }

  if (finalIndex < 0) {
    flags.push("missing-final-code-section");
    return { blocks: [], tutorialBody: body, flags };
  }

  const fenceBlocks = readFenceBlocks(lines, finalIndex + 1);
  if (fenceBlocks.length < 3) {
    flags.push(`final-code-block-count-${fenceBlocks.length}`);
  }

  /** @type {{ section: string, content: string }[]} */
  const blocks = fenceBlocks.map((block) => ({
    section: inferCodeSection(block.content, block.lang),
    content: block.content.trim(),
  }));

  const tutorialLines = [...lines.slice(0, finalIndex)];
  while (tutorialLines.length && tutorialLines[tutorialLines.length - 1].trim() === "") {
    tutorialLines.pop();
  }

  return {
    blocks,
    tutorialBody: tutorialLines.join("\n").trim(),
    flags,
  };
}

function inferCodeSection(content, declaredLang) {
  if (declaredLang === "html") return "html";
  if (declaredLang === "css") return "css";
  if (declaredLang === "javascript" || declaredLang === "js") return "javascript";

  const t = content.trim();
  if (!t) return "html";
  if (t.startsWith("<") || t.startsWith("<!")) return "html";
  if (/^(\.|#|:root|\*|@media|@keyframes|\[)/.test(t)) return "css";
  return "javascript";
}

function replaceFirstH2(tutorialBody, displayHeading) {
  const lines = tutorialBody.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i].trim())) {
      lines[i] = displayHeading;
      return lines.join("\n").trim();
    }
  }
  return `${displayHeading}\n\n${tutorialBody}`.trim();
}

function firstParagraphAfterH2(body) {
  const lines = body.split("\n");
  let pastH2 = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!pastH2) {
      if (/^##\s+/.test(trimmed)) pastH2 = true;
      continue;
    }
    if (!trimmed || trimmed.startsWith("#")) continue;
    return trimmed.length > 160 ? `${trimmed.slice(0, 157)}…` : trimmed;
  }
  return "";
}

function inferScripts(combinedText) {
  const hay = combinedText.toLowerCase();
  /** @type {string[]} */
  const scripts = [];

  if (/\bgsap\b|scrolltrigger|splittext|timeline/.test(hay)) {
    scripts.push(`<script src="${GSAP_CDN}/gsap.min.js"></script>`);
  }
  if (/scrolltrigger/.test(hay)) {
    scripts.push(`<script src="${GSAP_CDN}/ScrollTrigger.min.js"></script>`);
  }
  if (/splittext/.test(hay)) {
    scripts.push(`<script src="${GSAP_CDN}/SplitText.min.js"></script>`);
  }

  return scripts.join("\n");
}

function buildSetup(blocks, combinedText) {
  /** @type {string[]} */
  const sections = [];
  const scripts = inferScripts(combinedText);

  if (scripts) {
    sections.push(SECTION_HEADERS.scripts, "```text", scripts, "```", "");
  } else {
    allFlags.push("no-scripts-inferred");
  }

  const order = ["html", "css", "javascript"];
  for (const id of order) {
    const block = blocks.find((b) => b.section === id);
    if (!block) continue;
    sections.push(SECTION_HEADERS[id], "```text", block.content, "```", "");
  }

  let setup = `## Setup\n\n<!-- code-tabs -->\n\n${sections.join("\n").trim()}`;
  return setup.replace(/\n{3,}/g, "\n\n").trim();
}

function inferCategories(slug, title, body) {
  const hay = `${slug} ${title} ${body}`.toLowerCase();
  /** @type {string[]} */
  const cats = [];
  const add = (c) => {
    if (!cats.includes(c)) cats.push(c);
  };

  if (/\bbutton\b/.test(hay)) add("button");
  if (/\bpage transition\b/.test(hay)) add("page-transition");
  if (/\bcursor\b/.test(hay)) add("cursor");
  if (/\b(loader|loading|skeleton)\b/.test(hay)) add("loader");
  if (/\bfilter\b/.test(hay)) add("filter");
  if (/\b(nav|navigation|menu)\b/.test(hay)) add("navigation");
  if (/\bscroll\b/.test(hay)) add("scroll");
  if (/\b(carousel|slider|marquee|gallery)\b/.test(hay)) add("image-carousel");
  if (/\b(text|typo|scramble|heading|paragraph|letter|reveal)\b/.test(hay)) {
    add("text");
  }
  if (/\b(video|audio|hls|player)\b/.test(hay)) add("media");
  if (/\b(grid|layout|marquee|draggable|flip|3d)\b/.test(hay)) add("layout");

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
  if (/\b(drag|draggable)\b/.test(hay)) add("drag");
  if (/\b(click|tap|press)\b/.test(hay)) add("click");
  if (/\b(load|domcontentloaded)\b/.test(hay)) add("load");
  if (/\b(mouse|pointer|mousemove)\b/.test(hay)) add("mouse-move");

  if (triggers.length === 0) add("scroll");
  return triggers.slice(0, 4);
}

function inferLibraries(body) {
  const hay = body.toLowerCase();
  if (/\bgsap\b|scrolltrigger|splittext/.test(hay)) return ["gsap"];
  return ["vanilla-js"];
}

const KEYWORD_STOP = new Set([
  "the",
  "with",
  "and",
  "for",
  "this",
  "that",
  "from",
  "into",
  "your",
  "effect",
  "user",
  "build",
  "lets",
  "take",
  "look",
  "works",
  "mwg",
  "tutorial",
]);

/** Descriptive animation terms mined from tutorial prose — not source metadata. */
function inferAnimationKeywords(combinedText) {
  const hay = combinedText.toLowerCase();
  /** @type {string[]} */
  const terms = [];
  const add = (t) => {
    if (!terms.includes(t)) terms.push(t);
  };

  if (/\b3d\b|perspective|depth|radius|rotatex|rotatez/.test(hay)) {
    add("3d");
    add("depth");
  }
  if (/\bflip\b/.test(hay)) add("flip");
  if (/\btitle|heading|typography\b/.test(hay)) add("typography");
  if (/\bscroll|scrub\b/.test(hay)) add("scroll");
  if (/\bpin(ned|ning)?\b/.test(hay)) add("pinned");
  if (/\brandom\b/.test(hay)) add("random");
  if (/\breveal\b/.test(hay)) add("reveal");
  if (/\bletter|character|paragraph|line\b/.test(hay)) add("letters");
  if (/\bstagger\b/.test(hay)) add("stagger");
  if (/\bsplit\s*text|splittext\b/.test(hay)) add("split-text");
  if (/\btimeline\b/.test(hay)) add("timeline");
  if (/\brotate\b/.test(hay)) add("rotate");
  if (/\bcinematic\b/.test(hay)) add("cinematic");
  if (/\borbital|orbit\b/.test(hay)) add("orbital");
  if (/\bgallery\b/.test(hay)) add("gallery");
  if (/\bmagnetic\b/.test(hay)) add("magnetic");
  if (/\bsphere|globe|wheel\b/.test(hay)) add("sphere");
  if (/\bwave|sine\b/.test(hay)) add("wave");
  if (/\bdrag\b/.test(hay)) add("drag");
  if (/\bhover\b/.test(hay)) add("hover");
  if (/\bimage|media\b/.test(hay)) add("image");
  if (/\bphysics|matter\.js\b/.test(hay)) add("physics");

  return terms;
}

function buildKeywords(slug, title, combinedText) {
  const titleWords = `${title} ${slug}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((w) => w.length > 2 && !KEYWORD_STOP.has(w) && !/^\d+$/.test(w));

  return [...new Set([...titleWords, ...inferAnimationKeywords(combinedText)])].slice(
    0,
    8,
  );
}

function findTutorialMp4(tutorialNumber) {
  const padded = tutorialNumber.padStart(3, "0");
  const candidates = [
    path.join(mwgDir, `Tutorial ${tutorialNumber}.mp4`),
    path.join(mwgDir, `Tutorial ${padded}.mp4`),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function listExistingPilotSlugs() {
  /** @type {Set<string>} */
  const slugs = new Set();

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".md")) {
        const raw = fs.readFileSync(full, "utf8");
        const m = raw.match(/^slug:\s*"?([^"\n]+)"?/m);
        if (m) slugs.add(m[1].trim());
      }
    }
  }

  if (fs.existsSync(libraryDir)) walk(libraryDir);
  return slugs;
}

function detectContentFlags(slug, tutorialBody, combinedText, tutorialNumber) {
  /** @type {string[]} */
  const flags = [];

  if (/\.\/assets\//.test(combinedText)) flags.push("external-relative-assets");
  if (/splittext/i.test(combinedText)) flags.push("club-gsap-splittext");
  if (/\blenis\b/i.test(combinedText)) flags.push("mentions-lenis-smooth-scroll");
  if (!inferScripts(combinedText)) flags.push("no-scripts-inferred");

  const existing = listExistingPilotSlugs();
  if (existing.has(slug)) flags.push(`slug-collision:${slug}`);

  return flags;
}

function migrateFile(filename) {
  const srcPath = path.join(mwgDir, filename);
  const raw = fs.readFileSync(srcPath, "utf8");
  const { data: srcMeta, body } = parseFrontmatter(raw);
  const tutorialNumber = extractTutorialNumber(filename, srcMeta);
  if (!tutorialNumber) {
    console.warn(`⚠ Skip ${filename}: cannot parse tutorial number`);
    return null;
  }

  const lines = body.split("\n");

  let firstH2Line = "";
  for (const line of lines) {
    if (/^##\s+/.test(line.trim())) {
      firstH2Line = line;
      break;
    }
  }

  const parsed = parseFirstH2(firstH2Line, tutorialNumber);
  if (!parsed) {
    allFlags.push(`${filename}: unrecognized-first-h2`);
    console.warn(`⚠ ${filename}: unrecognized first h2: ${firstH2Line}`);
    return null;
  }

  const slug = slugify(parsed.title);
  const { blocks, tutorialBody, flags: splitFlags } = splitFinalCode(body);
  const combinedText = blocks.map((b) => b.content).join("\n") + "\n" + tutorialBody;

  const setup = buildSetup(blocks, combinedText);
  const tutorialWithHeading = replaceFirstH2(tutorialBody, parsed.displayHeading);
  const bodyOut = `${setup}\n\n${tutorialWithHeading}`.trim();

  const description =
    firstParagraphAfterH2(tutorialWithHeading) || `${parsed.title}.`;
  const sourceUrl = srcMeta.source || `https://madewithgsap.com/effects/tutorial${tutorialNumber.replace(/^0+/, "")}`;
  const previewFile = `${slug}.mp4`;
  const mp4Src = findTutorialMp4(tutorialNumber);

  const contentFlags = detectContentFlags(slug, tutorialWithHeading, combinedText, tutorialNumber);
  const entryFlags = [...splitFlags, ...contentFlags];

  if (mp4Src) {
    fs.mkdirSync(previewsDir, { recursive: true });
    fs.copyFileSync(mp4Src, path.join(previewsDir, previewFile));
  } else {
    entryFlags.push("no-tutorial-mp4");
  }

  const meta = {
    title: parsed.title,
    description,
    slug,
    previewVideo: previewFile,
    order: Number.parseInt(tutorialNumber, 10),
    published: true,
    categories: inferCategories(slug, parsed.title, combinedText),
    triggers: inferTriggers(slug, combinedText),
    libraries: inferLibraries(combinedText),
    keywords: buildKeywords(slug, parsed.title, combinedText),
    sourceUrl,
  };

  const fm = [
    "---",
    `title: ${yamlQuote(meta.title)}`,
    `description: ${yamlQuote(meta.description)}`,
    `slug: ${yamlQuote(meta.slug)}`,
    `previewVideo: ${yamlQuote(meta.previewVideo)}`,
    `order: ${meta.order}`,
    `published: ${meta.published}`,
    `categories: ${yamlArray(meta.categories)}`,
    `triggers: ${yamlArray(meta.triggers)}`,
    `libraries: ${yamlArray(meta.libraries)}`,
    `keywords: ${yamlArray(meta.keywords)}`,
    `sourceUrl: ${yamlQuote(meta.sourceUrl)}`,
    "---",
    "",
    bodyOut,
    "",
  ].join("\n");

  const outFile = path.join(libraryDir, `${slug}.md`);
  fs.mkdirSync(libraryDir, { recursive: true });
  fs.writeFileSync(outFile, fm);

  const flagStr = entryFlags.length ? entryFlags.join(", ") : "ok";
  console.log(`✓ ${slug} (#${tutorialNumber}, ${mp4Src ? "mp4" : "no-mp4"}) [${flagStr}]`);

  return {
    filename,
    slug,
    tutorialNumber,
    title: parsed.title,
    outFile,
    mp4: !!mp4Src,
    tabSections: blocks.length,
    flags: entryFlags,
  };
}

function writeReport(results) {
  const lines = [
    "# MWG migration report",
    "",
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "## Summary",
    "",
    `| Slug | Tutorial # | mp4 | Tab blocks | Flags |`,
    `|------|------------|-----|------------|-------|`,
  ];

  for (const r of results) {
    if (!r) continue;
    lines.push(
      `| ${r.slug} | ${r.tutorialNumber} | ${r.mp4 ? "yes" : "no"} | ${r.tabSections} | ${r.flags.join(", ") || "—"} |`,
    );
  }

  lines.push(
    "",
    "## Flag reference",
    "",
    "- `external-relative-assets` — HTML references `./assets/…` (broken on site without assets)",
    "- `club-gsap-splittext` — uses SplitText (Club GSAP plugin)",
    "- `mentions-lenis-smooth-scroll` — tutorial mentions optional Lenis integration",
    "- `no-tutorial-mp4` — no matching `Tutorial {N}.mp4` in mwg/",
    "- `slug-collision:{slug}` — pilot entry with same slug already exists",
    "- `missing-final-code-section` — no `## Final code` heading found",
    "",
    "## Next steps",
    "",
    "1. `pnpm astro sync`",
    "2. `pnpm generate:animation-posters`",
    "3. Review taxonomy and gallery ordering",
    "4. Entries are written with `published: true` for local review",
    "",
  );

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, lines.join("\n"));
  console.log(`\nReport: ${path.relative(root, reportPath)}`);
}

// --- main ---

if (!fs.existsSync(mwgDir)) {
  console.error(
    `MWG archive not found: ${mwgDir}\n` +
      `Restore sources or set ANIMATION_MWG_ARCHIVE.`,
  );
  process.exit(1);
}

fs.mkdirSync(libraryDir, { recursive: true });
fs.mkdirSync(previewsDir, { recursive: true });

const mwgFiles = dedupeByTutorialNumber(listMwgMarkdown());

if (mwgFiles.length === 0) {
  console.log("No MWG markdown files found.");
  process.exit(0);
}

console.log(`Migrating ${mwgFiles.length} unique tutorials…\n`);

/** @type {ReturnType<typeof migrateFile>[]} */
const results = [];
for (const file of mwgFiles) {
  results.push(migrateFile(file));
}

writeReport(results);

const migrated = results.filter(Boolean).length;
console.log(
  `\nDone. ${migrated} entries in animation-library/, previews in media/animations/previews/.`,
);
