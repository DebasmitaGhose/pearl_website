"use client";

import { useEffect } from "react";

/** Open the news item matching the URL hash (e.g. /news#hri-2023-best-paper). */
export function NewsHashSync() {
  useEffect(() => {
    function openFromHash() {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView({ block: "nearest" });
      }
    }

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return null;
}
