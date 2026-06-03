import { visit } from "unist-util-visit";
import { COPY_TOOLTIP, hastCopyIcon } from "../lib/code-snippet.mjs";

/** @param {import('hast').Properties | undefined} properties */
function getClassList(properties) {
  const raw = properties?.className ?? properties?.class;
  if (raw == null) return [];
  return Array.isArray(raw) ? raw.map(String) : [String(raw)];
}

/** @param {import('hast').Element} node */
function isAstroCodePre(node) {
  if (node.tagName !== "pre") return false;
  return getClassList(node.properties).some((c) => c.includes("astro-code"));
}

/** @param {import('hast').Parents | undefined} parent */
function isValidParent(parent) {
  return parent != null && (parent.type === "root" || parent.type === "element");
}

/** Wrap Shiki `<pre class="astro-code">` blocks with a copy button. */
export function rehypeCodeSnippet() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (index === undefined || !isValidParent(parent)) return;
      if (!isAstroCodePre(node)) return;

      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: { class: "code-snippet" },
        children: [
          {
            type: "element",
            tagName: "button",
            properties: {
              type: "button",
              class: "code-snippet__copy",
              ariaLabel: COPY_TOOLTIP,
              dataTooltip: COPY_TOOLTIP,
            },
            children: [hastCopyIcon()],
          },
          node,
        ],
      };
    });
  };
}
