import { visit } from "unist-util-visit";
import { hastCopyButton } from "../lib/code-snippet.mjs";

/** Marker in markdown: `<!-- code-tabs -->` (content layer has no stable file path). */
const CODE_TABS_MARKER = "code-tabs";

/** Allowlisted slugs when VFile path is unavailable. */
const CODE_TABS_SLUGS = new Set(["infinite-draggable-grid"]);

const TAB_ORDER = ["scripts", "html", "css", "javascript"];

const TAB_LABELS = {
  scripts: "Scripts",
  html: "HTML",
  css: "CSS",
  javascript: "Javascript",
};

/** @param {string | undefined} filePath */
function isAnimationLibraryMarkdown(filePath) {
  if (!filePath) return false;
  const normalized = filePath.replace(/\\/g, "/");
  if (!normalized.includes("animation-library/")) return false;
  if (normalized.includes("/osmo/")) return false;
  if (normalized.includes("/mwg/")) return false;
  if (normalized.includes("/pilot/")) return false;
  return normalized.endsWith(".md");
}

/** @param {string | undefined} filePath */
function isCodeTabsEnabled(filePath) {
  if (isAnimationLibraryMarkdown(filePath)) return true;
  if (!filePath) return false;
  const normalized = filePath.replace(/\\/g, "/");
  for (const slug of CODE_TABS_SLUGS) {
    if (
      normalized.endsWith(`/${slug}.md`) ||
      normalized.endsWith(`${slug}.md`)
    ) {
      return true;
    }
  }
  return false;
}

/** @param {import('hast').Element} node */
function getClassList(node) {
  const raw = node.properties?.className ?? node.properties?.class;
  if (raw == null) return [];
  return Array.isArray(raw) ? raw.map(String) : [String(raw)];
}

/** @param {import('hast').Nodes} node */
function getText(node) {
  if (node.type === "text") return node.value;
  if (node.type === "element") {
    return node.children.map(getText).join("");
  }
  return "";
}

/** @param {import('hast').Element} node */
function isCodeSnippet(node) {
  return (
    node.type === "element" &&
    getClassList(node).some((c) => c === "code-snippet")
  );
}

/** @param {import('hast').Element} node */
function headingToTabId(node) {
  const text = getText(node).trim().toLowerCase();
  if (text === "scripts" || text === "script") return "scripts";
  if (text === "html") return "html";
  if (text === "css") return "css";
  if (text === "javascript" || text === "js") return "javascript";
  return null;
}

/** @param {import('hast').Element} node */
function isTabHeading(node) {
  return node.type === "element" && node.tagName === "h3" && !!headingToTabId(node);
}

/** @param {import('hast').Element} snippet */
function getSnippetSource(snippet) {
  const pre = snippet.children?.find(
    (c) => c.type === "element" && c.tagName === "pre",
  );
  if (!pre || pre.type !== "element") return "";
  return getText(pre).trim().slice(0, 200);
}

/** @param {import('hast').Element} snippet @param {string} fallback */
function inferTabId(snippet, fallback) {
  const src = getSnippetSource(snippet);
  if (src.startsWith("<") || src.startsWith("<!")) return "html";
  if (
    /^(\.|#|:root|@media|@keyframes)/.test(src) ||
    (fallback === "html" && /^\s*[.#\[]/.test(src))
  ) {
    return "css";
  }
  if (
    /^(import |export |const |let |function |gsap\.|document\.)/.test(src) ||
    src.includes("addEventListener")
  ) {
    return "javascript";
  }
  return fallback;
}

/** @param {string} id */
function tabLabel(id) {
  return TAB_LABELS[id] ?? id.toUpperCase();
}

/** @param {import('hast').Element} snippet */
function extractPre(snippet) {
  const pre = snippet.children?.find(
    (c) => c.type === "element" && c.tagName === "pre",
  );
  return pre && pre.type === "element" ? pre : null;
}

/**
 * @param {import('hast').Element[]} children
 * @returns {{ start: number, end: number, panels: { id: string, label: string, pre: import('hast').Element }[] } | null}
 */
function collectSetupTabRun(children) {
  /** @type {{ id: string, label: string, pre: import('hast').Element }[]} */
  const panels = [];
  let start = -1;
  let end = -1;
  let i = 0;

  while (i < children.length) {
    const node = children[i];

    if (node.type === "element" && node.tagName === "h2") {
      if (start >= 0 && panels.length > 0) break;
      i += 1;
      continue;
    }

    if (
      start >= 0 &&
      panels.length > 0 &&
      node.type === "element" &&
      node.tagName === "h3" &&
      !isTabHeading(node)
    ) {
      break;
    }

    if (node.type === "element" && isTabHeading(node)) {
      if (start < 0) start = i;
      const sectionId = headingToTabId(node);
      i += 1;
      let panelIndex = 0;

      while (i < children.length) {
        const inner = children[i];
        if (inner.type === "element" && inner.tagName === "h2") break;
        // Stop at any h3 (next tab or ### Implementation) — do not walk prose past fences.
        if (inner.type === "element" && inner.tagName === "h3") break;
        if (isCodeSnippet(inner)) {
          const id =
            panelIndex === 0
              ? sectionId
              : inferTabId(inner, sectionId ?? "html");
          const pre = extractPre(inner);
          if (id && pre) {
            panels.push({ id, label: tabLabel(id), pre });
            end = i;
          }
          panelIndex += 1;
          i += 1;
          continue;
        }
        i += 1;
      }
      continue;
    }

    i += 1;
  }

  if (panels.length < 2 || start < 0 || end < 0) return null;

  const seen = new Set();
  const ordered = [];
  for (const id of TAB_ORDER) {
    for (const panel of panels) {
      if (panel.id === id && !seen.has(id)) {
        ordered.push(panel);
        seen.add(id);
      }
    }
  }
  for (const panel of panels) {
    if (!seen.has(panel.id)) {
      ordered.push(panel);
      seen.add(panel.id);
    }
  }

  return { start, end, panels: ordered };
}

/** Prefer HTML as the initial tab — Scripts is often only CDN tags and looks empty. */
const DEFAULT_TAB_IDS = ["html", "css", "javascript", "scripts"];

/** @param {{ id: string }[]} panels */
function pickDefaultTabId(panels) {
  for (const id of DEFAULT_TAB_IDS) {
    if (panels.some((panel) => panel.id === id)) return id;
  }
  return panels[0]?.id ?? "html";
}

/** @param {{ id: string, label: string, pre: import('hast').Element }[]} panels */
function buildCodeTabsGroup(panels) {
  const defaultId = pickDefaultTabId(panels);

  /** @type {import('hast').Element[]} */
  const tabButtons = panels.map((panel) => {
    const active = panel.id === defaultId;
    return {
      type: "element",
      tagName: "button",
      properties: {
        type: "button",
        class: `code-tabs__tab${active ? " code-tabs__tab--active" : ""}`,
        role: "tab",
        ariaSelected: active ? "true" : "false",
        tabIndex: active ? "0" : "-1",
        dataCodeTab: panel.id,
      },
      children: [{ type: "text", value: panel.label }],
    };
  });

  /** @type {import('hast').Element[]} */
  const tabPanels = panels.map((panel) => {
    const active = panel.id === defaultId;
    return {
      type: "element",
      tagName: "div",
      properties: {
        class: "code-tabs__panel",
        role: "tabpanel",
        dataCodeTabPanel: panel.id,
        hidden: active ? undefined : "hidden",
      },
      children: [panel.pre],
    };
  });

  return {
    type: "element",
    tagName: "div",
    properties: {
      class: "code-tabs",
      dataCodeTabs: "",
    },
    children: [
      {
        type: "element",
        tagName: "div",
        properties: { class: "code-tabs__header" },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: {
              class: "code-tabs__tablist",
              role: "tablist",
              ariaLabel: "Code",
            },
            children: tabButtons,
          },
          hastCopyButton({
            extraClass: "code-tabs__copy",
            extraProperties: { dataCodeTabsCopy: "" },
          }),
        ],
      },
      {
        type: "element",
        tagName: "div",
        properties: { class: "code-tabs__body" },
        children: tabPanels,
      },
    ],
  };
}

/** @param {import('hast').Nodes[]} children */
function childrenHaveCodeTabsMarker(children) {
  return children.some((node) => {
    if (node.type === "comment" && node.value?.includes(CODE_TABS_MARKER)) {
      return true;
    }
    if (node.type === "raw" && String(node.value).includes(CODE_TABS_MARKER)) {
      return true;
    }
    return false;
  });
}

/** @param {import('hast').Parents} node */
function applyTabGrouping(node, enabled) {
  if (!enabled || !Array.isArray(node.children)) return;
  if (
    node.type === "element" &&
    getClassList(node).some((c) => c === "code-tabs")
  ) {
    return;
  }

  const run = collectSetupTabRun(node.children);
  if (!run) return;

  const group = buildCodeTabsGroup(run.panels);
  node.children.splice(run.start, run.end - run.start + 1, group);

  const markerIdx = node.children.findIndex(
    (n) =>
      (n.type === "comment" && n.value?.includes(CODE_TABS_MARKER)) ||
      (n.type === "raw" && String(n.value).includes(CODE_TABS_MARKER)),
  );
  if (markerIdx >= 0) node.children.splice(markerIdx, 1);
}

/** Remove legacy "Final code" label from pre-built tab groups. */
function stripLegacyCodeTabsTitle(tree) {
  visit(tree, "element", (node) => {
    if (!getClassList(node).some((c) => c === "code-tabs")) return;
    for (const child of node.children ?? []) {
      if (child.type !== "element" || child.tagName !== "div") continue;
      if (!getClassList(child).some((c) => c === "code-tabs__header")) continue;
      child.children = (child.children ?? []).filter((grandchild) => {
        if (grandchild.type !== "element" || grandchild.tagName !== "p") {
          return true;
        }
        return !getClassList(grandchild).some((c) => c === "code-tabs__title");
      });
    }
  });
}

/** Group setup h3 + code-snippet runs into tabbed UI when marker or allowlisted slug. */
export function rehypeCodeTabs() {
  return (tree, file) => {
    const path = file.history?.[0] ?? file.path ?? file.data?.astro?.filePath ?? "";
    const entryId = String(file.data?.astro?.id ?? "");
    const slugEnabled = isCodeTabsEnabled(path);
    const animationEntry =
      isAnimationLibraryMarkdown(path) ||
      (entryId.length > 0 &&
        !entryId.startsWith("pilot/") &&
        !entryId.startsWith("osmo/") &&
        !entryId.startsWith("mwg/") &&
        file.data?.astro?.collection === "animations");
    const markerEnabled = childrenHaveCodeTabsMarker(tree.children ?? []);
    const frontmatterEnabled = file.data?.astro?.frontmatter?.codeTabs === true;
    const enabled =
      slugEnabled || animationEntry || markerEnabled || frontmatterEnabled;

    applyTabGrouping(tree, enabled);

    visit(tree, "element", (node) => {
      if (node.type !== "element") return;
      const nodeMarker = childrenHaveCodeTabsMarker(node.children ?? []);
      applyTabGrouping(node, enabled || nodeMarker);
    });

    stripLegacyCodeTabsTitle(tree);
  };
}
