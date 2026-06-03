/** @typedef {import('hast').Element} HastElement */

export const COPY_TOOLTIP = "Copy to clipboard";
export const COPIED_TOOLTIP = "Copied!";

const COPY_ICON_PATHS = [
  { d: "M6 7L1 12L6 17", strokeMiterlimit: "10" },
  { d: "M18 17L23 12L18 7", strokeMiterlimit: "10" },
  { d: "M8.5 20L15.5 4", strokeMiterlimit: "10" },
];

const COPY_ICON_SVG_ATTRS = {
  class: "code-snippet__icon",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  ariaHidden: "true",
};

/** Copy icon (HAST). */
export function hastCopyIcon() {
  /** @type {HastElement} */
  return {
    type: "element",
    tagName: "svg",
    properties: COPY_ICON_SVG_ATTRS,
    children: COPY_ICON_PATHS.map(({ d, strokeMiterlimit }) => ({
      type: "element",
      tagName: "path",
      properties: {
        d,
        stroke: "currentColor",
        strokeMiterlimit,
      },
      children: [],
    })),
  };
}

/** @returns {SVGSVGElement} */
export function createCopyIconSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", COPY_ICON_SVG_ATTRS.class);
  svg.setAttribute("width", COPY_ICON_SVG_ATTRS.width);
  svg.setAttribute("height", COPY_ICON_SVG_ATTRS.height);
  svg.setAttribute("viewBox", COPY_ICON_SVG_ATTRS.viewBox);
  svg.setAttribute("fill", COPY_ICON_SVG_ATTRS.fill);
  svg.setAttribute("aria-hidden", "true");

  for (const { d, strokeMiterlimit } of COPY_ICON_PATHS) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-miterlimit", strokeMiterlimit);
    svg.append(path);
  }

  return svg;
}

/** @returns {HTMLButtonElement} */
export function createCopyButton() {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "code-snippet__copy";
  btn.setAttribute("aria-label", COPY_TOOLTIP);
  btn.dataset.tooltip = COPY_TOOLTIP;
  btn.append(createCopyIconSvg());
  return btn;
}
