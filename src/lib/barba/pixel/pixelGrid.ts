import { pixelHorizontalAmount } from "./config";

function getPixelLineTemplate(): HTMLElement | null {
  const tpl = document.querySelector("[data-transition-pixel-template]");
  if (!(tpl instanceof HTMLTemplateElement)) return null;
  return tpl.content.querySelector("[data-transition-col]");
}

function getPixelTemplate(): HTMLElement | null {
  const line = getPixelLineTemplate();
  return line?.querySelector("[data-transition-pixel]") ?? null;
}

export function pixelGrid(isPortrait: boolean): void {
  const panel = document.querySelector("[data-transition-panel]");
  if (!panel) return;

  const lineTemplate = getPixelLineTemplate();
  const pixelTemplate = getPixelTemplate();
  if (!lineTemplate || !pixelTemplate) return;

  const rect = panel.getBoundingClientRect();
  panel.style.flexDirection = isPortrait ? "column" : "row";

  const lineSizePx = isPortrait
    ? rect.height / pixelHorizontalAmount
    : rect.width / pixelHorizontalAmount;
  const crossAmount = Math.ceil(
    (isPortrait ? rect.width : rect.height) / lineSizePx,
  );

  let lines = panel.querySelectorAll("[data-transition-col]");

  if (lines.length !== pixelHorizontalAmount) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < pixelHorizontalAmount; i++) {
      frag.appendChild(lineTemplate.cloneNode(false));
    }
    panel.replaceChildren(frag);
    lines = panel.querySelectorAll("[data-transition-col]");
  }

  lines.forEach((line) => {
    if (!(line instanceof HTMLElement)) return;
    line.style.flexDirection = isPortrait ? "row" : "column";
    line.style.flex = "1 1 auto";
    line.style.justifyContent = "center";

    const diff = crossAmount - line.childElementCount;

    if (diff > 0) {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < diff; i++) {
        frag.appendChild(pixelTemplate.cloneNode(true));
      }
      line.appendChild(frag);
    } else if (diff < 0) {
      for (let i = diff; i < 0; i++) {
        line.lastElementChild?.remove();
      }
    }
  });
}
