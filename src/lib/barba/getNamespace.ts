/** Top-level route segment for per-area transitions. */
export function getNamespace(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "blog";
  if (segments[0] === "garden") return "garden";
  if (segments[0] === "blog") return "blog";
  return segments[0];
}
