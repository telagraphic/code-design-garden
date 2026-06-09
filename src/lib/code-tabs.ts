import { bindCopyButton, unbindCopyButton } from "@/lib/code-copy";

function getPanelText(panel: HTMLElement): string {
  const code = panel.querySelector("pre code");
  return code?.textContent ?? panel.querySelector("pre")?.textContent ?? "";
}

function getTabId(tab: HTMLButtonElement): string {
  return tab.getAttribute("data-code-tab") ?? "";
}

function setActiveTab(group: HTMLElement, tabId: string) {
  if (!tabId) return;

  const tabs = group.querySelectorAll<HTMLButtonElement>('[role="tab"][data-code-tab]');
  const panels = group.querySelectorAll<HTMLElement>("[data-code-tab-panel]");

  for (const tab of tabs) {
    const active = getTabId(tab) === tabId;
    tab.classList.toggle("code-tabs__tab--active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
    tab.tabIndex = active ? 0 : -1;
  }

  for (const panel of panels) {
    const panelId = panel.getAttribute("data-code-tab-panel") ?? "";
    panel.hidden = panelId !== tabId;
  }
}

function stripLegacyCodeTabsTitle(group: HTMLElement) {
  group.querySelector(".code-tabs__title")?.remove();
}

function bindCodeTabsGroup(group: HTMLElement) {
  if (group.dataset.codeTabsInit === "true") return;

  stripLegacyCodeTabsTitle(group);

  const tabs = [
    ...group.querySelectorAll<HTMLButtonElement>('[role="tab"][data-code-tab]'),
  ];
  if (tabs.length === 0) return;

  group.dataset.codeTabsInit = "true";

  const initial =
    tabs.find((tab) => tab.classList.contains("code-tabs__tab--active")) ??
    tabs[0];
  const initialId = initial ? getTabId(initial) : "";
  if (initialId) setActiveTab(group, initialId);

  const onTabSelect = (tab: HTMLButtonElement) => {
    const tabId = getTabId(tab);
    if (!tabId) return;
    setActiveTab(group, tabId);
  };

  for (const tab of tabs) {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      onTabSelect(tab);
    });
  }

  const tablist = group.querySelector('[role="tablist"]');
  tablist?.addEventListener("keydown", (event) => {
    if (!(event instanceof KeyboardEvent)) return;
    const current = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
    if (current < 0) return;

    let next = current;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (current + 1) % tabs.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (current - 1 + tabs.length) % tabs.length;
    } else {
      return;
    }

    event.preventDefault();
    const nextTab = tabs[next];
    if (!nextTab) return;
    onTabSelect(nextTab);
    nextTab.focus();
  });

  const copyBtn = group.querySelector<HTMLButtonElement>(".code-tabs__copy");
  if (copyBtn) {
    bindCopyButton(copyBtn, () => {
      const panel = group.querySelector<HTMLElement>(
        '[data-code-tab-panel]:not([hidden])',
      );
      return panel ? getPanelText(panel) : "";
    });
  }
}

export function initCodeTabs(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-code-tabs]").forEach(bindCodeTabsGroup);
}

export function destroyCodeTabs(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-code-tabs]").forEach((group) => {
    delete group.dataset.codeTabsInit;
    const copyBtn = group.querySelector<HTMLButtonElement>(".code-tabs__copy");
    if (copyBtn) unbindCopyButton(copyBtn);
  });
}
