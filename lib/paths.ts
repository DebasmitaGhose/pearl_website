/**
 * Prefix a site-root path with NEXT_PUBLIC_BASE_PATH for GitHub Pages project sites.
 * Absolute http(s) URLs are left unchanged.
 */
export function withBasePath(href: string): string {
  if (
    !href ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("data:") ||
    href.startsWith("//")
  ) {
    return href;
  }

  const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
  const path = href.startsWith("/") ? href : `/${href}`;
  if (!base) return path;
  if (path === base || path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
}
