export const PAGE_ENTER_EVENT = "page:enter";
export const PAGE_LEAVE_EVENT = "page:leave";

export type PageLifecycleDetail = {
  root: ParentNode;
};

export function dispatchPageEnter(root: ParentNode = document): void {
  document.dispatchEvent(
    new CustomEvent<PageLifecycleDetail>(PAGE_ENTER_EVENT, {
      detail: { root },
    }),
  );
}

export function dispatchPageLeave(): void {
  document.dispatchEvent(new CustomEvent(PAGE_LEAVE_EVENT));
}
