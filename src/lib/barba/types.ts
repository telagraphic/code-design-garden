/** Barba schema page URL (see @barba/core ISchemaPage). */
export type BarbaPageUrl = {
  href: string;
  path: string;
  hash?: string;
  query?: Record<string, string>;
  port?: number | null;
};

export type BarbaPage = {
  container: HTMLElement;
  url: BarbaPageUrl | string;
  html: string;
  namespace?: string;
};

export type BarbaTransitionData = {
  current: BarbaPage;
  next: BarbaPage;
};
