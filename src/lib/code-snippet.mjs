/** @typedef {import('hast').Element} HastElement */

export const COPY_TOOLTIP = "Copy to clipboard";
export const COPIED_TOOLTIP = "Copied!";

const COPY_ICON_PATHS = [
  { d: "M6 7L1 12L6 17", strokeMiterlimit: "10" },
  { d: "M18 17L23 12L18 7", strokeMiterlimit: "10" },
  { d: "M8.5 20L15.5 4", strokeMiterlimit: "10" },
];

const CHECK_ICON_PATH = {
  d: "M5 12L9.5 16.5L19 7",
  strokeMiterlimit: "10",
};

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

/** @param {{ d: string; strokeMiterlimit: string }} spec */
function hastPath(spec) {
  return {
    type: "element",
    tagName: "path",
    properties: {
      d: spec.d,
      stroke: "currentColor",
      strokeMiterlimit: spec.strokeMiterlimit,
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
    path.setAttribute("stroke-miterlimit", spec.strokeMiterlimit);
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

/** Upgrade a legacy single-icon button to the animated stack. */
export function ensureIconStack(btn) {
  if (btn.querySelector(".code-snippet__icon-stack")) return;

  btn.replaceChildren(createIconStack());
}
