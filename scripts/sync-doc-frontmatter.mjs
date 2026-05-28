import fs from "node:fs";
import path from "node:path";

const DOCS_ROOT = path.join(process.cwd(), "src/content/code/react");
const SKIP = new Set(["REQUIREMENTS.md"]);

const CHAPTER_BY_FOLDER = {
  "01-react": { chapter: "overview", chapterLabel: "Overview" },
  "02-concepts": { chapter: "concepts", chapterLabel: "Concepts" },
  "03-challenges": { chapter: "challenges", chapterLabel: "Challenges" },
  "04-vanilla-react": {
    chapter: "react-vs-vanilla",
    chapterLabel: "React vs. Vanilla",
  },
};

function stripFrontmatter(content) {
  if (!content.startsWith("---\n")) return content;
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) return content;
  return content.slice(end + 5);
}

function titleFromBody(body, filename) {
  const match = body.match(/^#\s+(.+)$/m);
  if (match) return match[1].trim();
  const base = filename.replace(/\.md$/i, "").replace(/^\d+-/, "");
  return base
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function orderFromPath(relPath) {
  let order = 0;
  for (const segment of relPath.split("/")) {
    const base = segment.replace(/\.md$/i, "");
    const m = base.match(/^(\d+)/);
    if (m) order = order * 1000 + Number.parseInt(m[1], 10);
  }
  return order || 999;
}

function chapterMeta(relPath) {
  const parts = relPath.split("/");
  if (parts.length === 1) {
    return { chapter: "overview", chapterLabel: "Overview" };
  }
  const folder = parts[0];
  const meta = CHAPTER_BY_FOLDER[folder];
  if (!meta) {
    throw new Error(`Unknown chapter folder for ${relPath}`);
  }
  return meta;
}

function yamlString(value) {
  return JSON.stringify(value);
}

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      walk(full, files);
    } else if (name.endsWith(".md") && !SKIP.has(name)) {
      files.push(full);
    }
  }
  return files;
}

const files = walk(DOCS_ROOT);
let updated = 0;

for (const file of files) {
  const rel = path.relative(DOCS_ROOT, file).replace(/\\/g, "/");
  const raw = fs.readFileSync(file, "utf8");
  const body = stripFrontmatter(raw).replace(/^\n+/, "");
  const { chapter, chapterLabel } = chapterMeta(rel);
  const title = titleFromBody(body, path.basename(file));
  const order = orderFromPath(rel);

  const frontmatter = [
    "---",
    "domain: code",
    "section: react",
    `chapter: ${chapter}`,
    `title: ${yamlString(title)}`,
    `order: ${order}`,
    `chapterLabel: ${yamlString(chapterLabel)}`,
    "---",
    "",
  ].join("\n");

  fs.writeFileSync(file, frontmatter + body);
  updated += 1;
  console.log(rel, "→", chapter, order, title);
}

console.log(`\nUpdated ${updated} files.`);
