"use client";

import { useEffect } from "react";

export function NewsSlugRedirect({ slug }: { slug: string }) {
  useEffect(() => {
    const target = `/news#${slug}`;
    if (window.location.pathname + window.location.hash !== `/news#${slug}`) {
      window.location.replace(target);
    } else {
      const el = document.getElementById(slug);
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView({ block: "nearest" });
      }
    }
  }, [slug]);

  return (
    <p className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
      Opening news item…
    </p>
  );
}
