/** Top-level route segment for future per-domain transitions. */
export function getNamespace(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "home";
  return segments[0];
}
