/** @typedef {import('hast').Element} HastElement */

export const COPY_TOOLTIP = "Copy to clipboard";
export const COPIED_TOOLTIP = "Copied!";

/** Overlapping rounded squares (duplicate / copy). */
export const COPY_ICON_PATHS = [
  {
    d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z",
  },
];

export const CHECK_ICON_PATH = {
  d: "M5 12l4.5 4.5L19 7",
};

export const ICON_STROKE_WIDTH = "2";

const COPY_ICON_SVG_ATTRS = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  ariaHidden: "true",
};

/** @param {string} className */
function iconSvgAttrs(className) {
  return {
    ...COPY_ICON_SVG_ATTRS,
    class: className,
  };
}

/** @param {{ d: string }} spec */
function hastPath(spec) {
  return {
    type: "element",
    tagName: "path",
    properties: {
      d: spec.d,
      stroke: "currentColor",
      strokeWidth: ICON_STROKE_WIDTH,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none",
    },
    children: [],
  };
}

/** Copy icon (HAST). */
export function hastCopyIcon() {
  /** @type {HastElement} */
  return {
    type: "element",
    tagName: "svg",
    properties: iconSvgAttrs("code-snippet__icon code-snippet__icon--copy"),
    children: COPY_ICON_PATHS.map(hastPath),
  };
}

/** Checkmark icon (HAST). */
export function hastCheckIcon() {
  /** @type {HastElement} */
  return {
    type: "element",
    tagName: "svg",
    properties: iconSvgAttrs("code-snippet__icon code-snippet__icon--check"),
    children: [hastPath(CHECK_ICON_PATH)],
  };
}

/**
 * Full copy button (HAST) — mirrors CodeCopyButton.astro.
 * @param {{ extraClass?: string, extraProperties?: Record<string, string> }} [options]
 */
export function hastCopyButton(options = {}) {
  const { extraClass = "", extraProperties = {} } = options;
  const classes = ["code-snippet__copy", extraClass].filter(Boolean).join(" ");

  /** @type {HastElement} */
  return {
    type: "element",
    tagName: "button",
    properties: {
      type: "button",
      class: classes,
      ariaLabel: COPY_TOOLTIP,
      dataTooltip: COPY_TOOLTIP,
      ...extraProperties,
    },
    children: [hastIconStack()],
  };
}

/** Icon stack for copy ↔ copied cross-fade (HAST). */
export function hastIconStack() {
  /** @type {HastElement} */
  return {
    type: "element",
    tagName: "span",
    properties: { class: "code-snippet__icon-stack" },
    children: [hastCopyIcon(), hastCheckIcon()],
  };
}

/** @param {string} className */
function createIconSvg(className, paths) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const attrs = iconSvgAttrs(className);
  svg.setAttribute("class", attrs.class);
  svg.setAttribute("width", attrs.width);
  svg.setAttribute("height", attrs.height);
  svg.setAttribute("viewBox", attrs.viewBox);
  svg.setAttribute("fill", attrs.fill);
  svg.setAttribute("aria-hidden", "true");

  for (const spec of paths) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", spec.d);
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", ICON_STROKE_WIDTH);
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("fill", "none");
    svg.append(path);
  }

  return svg;
}

/** @returns {SVGSVGElement} */
export function createCopyIconSvg() {
  return createIconSvg(
    "code-snippet__icon code-snippet__icon--copy",
    COPY_ICON_PATHS,
  );
}

/** @returns {SVGSVGElement} */
export function createCheckIconSvg() {
  return createIconSvg(
    "code-snippet__icon code-snippet__icon--check",
    [CHECK_ICON_PATH],
  );
}

/** @returns {HTMLSpanElement} */
export function createIconStack() {
  const stack = document.createElement("span");
  stack.className = "code-snippet__icon-stack";
  stack.append(createCopyIconSvg(), createCheckIconSvg());
  return stack;
}

/** @returns {HTMLButtonElement} */
export function createCopyButton() {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "code-snippet__copy";
  btn.setAttribute("aria-label", COPY_TOOLTIP);
  btn.dataset.tooltip = COPY_TOOLTIP;
  btn.append(createIconStack());
  return btn;
}

/** @deprecated Use upgradeCopyButton from @/lib/code-copy.ts */
export function ensureIconStack(btn) {
  btn.replaceChildren(createIconStack());
}
