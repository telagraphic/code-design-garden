import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function getLenisInstance(): Lenis | null {
  return lenisInstance;
}

export function setLenisInstance(instance: Lenis | null): void {
  lenisInstance = instance;
}

export let nextPage: ParentNode = document;
let onceInitialized = false;

export function isOnceInitialized(): boolean {
  return onceInitialized;
}

export function markOnceInitialized(): void {
  onceInitialized = true;
}

let reducedMotionPref = false;

export function isReducedMotion(): boolean {
  return reducedMotionPref;
}

export function setReducedMotion(value: boolean): void {
  reducedMotionPref = value;
}

export function setNextPage(root: ParentNode): void {
  nextPage = root;
}

export function hasSelector(selector: string): boolean {
  return !!nextPage.querySelector(selector);
}
