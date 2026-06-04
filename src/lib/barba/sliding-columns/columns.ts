import gsap from "gsap";
import { columnCount } from "./config";

function getColumnTemplate(): HTMLElement | null {
  const tpl = document.querySelector("[data-transition-sliding-column-template]");
  if (!(tpl instanceof HTMLTemplateElement)) return null;
  return tpl.content.querySelector("[data-transition-column]");
}

function createLines(): HTMLElement {
  const linesWrap = document.createElement("div");
  linesWrap.className = "transition__lines";

  for (let i = 0; i < columnCount; i++) {
    const line = document.createElement("div");
    line.className = "transition__line";
    if (i === columnCount - 1) line.classList.add("is--last");
    linesWrap.appendChild(line);
  }

  return linesWrap;
}

function isSlidingColumnsMounted(panel: HTMLElement): boolean {
  return (
    panel.classList.contains("is-sliding-columns") &&
    panel.querySelector(".transition__panels") !== null &&
    panel.querySelector(".transition__lines") !== null &&
    panel.querySelectorAll("[data-transition-column]").length === columnCount
  );
}

export type MountSlidingColumnsOptions = {
  /** Reset column yPercent to 0 (leave only). Enter must pass false to preserve leave animation. */
  resetTransforms?: boolean;
};

export function mountSlidingColumns(
  options: MountSlidingColumnsOptions = {},
): HTMLElement | null {
  const { resetTransforms = true } = options;
  const panel = document.querySelector("[data-transition-panel]");
  const template = getColumnTemplate();
  if (!(panel instanceof HTMLElement) || !template) return null;

  if (isSlidingColumnsMounted(panel)) {
    if (resetTransforms) {
      gsap.set(panel.querySelectorAll("[data-transition-column]"), {
        yPercent: 0,
      });
    }
    return panel;
  }

  const panelsWrap = document.createElement("div");
  panelsWrap.className = "transition__panels";

  const frag = document.createDocumentFragment();
  for (let i = 0; i < columnCount; i++) {
    frag.appendChild(template.cloneNode(true));
  }
  panelsWrap.appendChild(frag);

  // Lines first in DOM so columns paint above them (Osmo stacks lines under panels).
  panel.replaceChildren(createLines(), panelsWrap);
  panel.classList.add("is-sliding-columns");

  const columns = panel.querySelectorAll("[data-transition-column]");
  gsap.set(columns, { yPercent: 0 });

  return panel;
}

export function unmountSlidingColumns(): void {
  const panel = document.querySelector("[data-transition-panel]");
  if (!(panel instanceof HTMLElement)) return;

  panel.classList.remove("is-sliding-columns");
  panel.replaceChildren();
  gsap.set(panel, { clearProps: "opacity,willChange" });
}
