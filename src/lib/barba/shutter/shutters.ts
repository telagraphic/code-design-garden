import { shutterAmountConfig } from "./config";

export function generateShutters(): void {
  const panel = document.querySelector("[data-transition-panel]");
  if (!panel) return;

  const width = window.innerWidth;
  const isLandscape = window.innerWidth > window.innerHeight;

  let shutterAmount = shutterAmountConfig.desktop;

  if (width <= 479) {
    shutterAmount = shutterAmountConfig.mobile;
  } else if (width <= 767) {
    shutterAmount = isLandscape
      ? shutterAmountConfig.mobileLandscape
      : shutterAmountConfig.mobile;
  } else if (width <= 991) {
    shutterAmount = shutterAmountConfig.tablet;
  }

  const shutters = panel.querySelectorAll("[data-transition-shutter]");

  if (shutters.length === shutterAmount) return;

  const template = shutters[0];
  if (!template) return;

  const frag = document.createDocumentFragment();

  for (let i = 0; i < shutterAmount; i++) {
    frag.appendChild(template.cloneNode(true));
  }

  panel.replaceChildren(frag);
}
