import {
  COPIED_TOOLTIP,
  COPY_TOOLTIP,
  createCopyButton,
  createIconStack,
} from "@/lib/code-snippet.mjs";

export const RESET_MS = 2000;

export async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

/** Replace icon stack so stale server HTML always gets the current SVG. */
export function upgradeCopyButton(btn: HTMLButtonElement): void {
  btn.replaceChildren(createIconStack());
  btn.setAttribute("aria-label", COPY_TOOLTIP);
  btn.dataset.tooltip = COPY_TOOLTIP;
  btn.classList.remove("code-snippet__copy--copied");
}

export function bindCopyButton(
  btn: HTMLButtonElement,
  getText: () => string,
): void {
  if (btn.dataset.copyBound === "true") return;

  btn.dataset.copyBound = "true";
  upgradeCopyButton(btn);

  btn.addEventListener("click", async () => {
    const text = getText();
    if (!text) return;

    try {
      await copyText(text);
      btn.setAttribute("aria-label", COPIED_TOOLTIP);
      btn.dataset.tooltip = COPIED_TOOLTIP;
      btn.classList.add("code-snippet__copy--copied");

      window.setTimeout(() => {
        btn.setAttribute("aria-label", COPY_TOOLTIP);
        btn.dataset.tooltip = COPY_TOOLTIP;
        btn.classList.remove("code-snippet__copy--copied");
      }, RESET_MS);
    } catch {
      btn.dataset.tooltip = "Copy failed";
      window.setTimeout(() => {
        btn.dataset.tooltip = COPY_TOOLTIP;
      }, RESET_MS);
    }
  });
}

export function unbindCopyButton(btn: HTMLButtonElement): void {
  delete btn.dataset.copyBound;
}

export { createCopyButton, COPY_TOOLTIP, COPIED_TOOLTIP };
