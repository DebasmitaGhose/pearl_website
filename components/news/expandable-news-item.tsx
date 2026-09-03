"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { NewsEntryData } from "@/components/news/news-types";
import { formatNewsMonthYear } from "@/lib/dates";

export function ExpandableNewsItem({
  item,
  children,
}: {
  item: NewsEntryData;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const syncFromHash = useCallback(() => {
    const hash = window.location.hash.replace(/^#/, "");
    setOpen(hash === item.slug);
  }, [item.slug]);

  useEffect(() => {
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [syncFromHash]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      window.history.replaceState(null, "", `#${item.slug}`);
    } else if (window.location.hash.replace(/^#/, "") === item.slug) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <li className="py-2">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="w-full text-left text-sm leading-relaxed"
      >
        {item.date && (
          <span className="mr-2 inline-block border border-border px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
            {formatNewsMonthYear(item.date)}
          </span>
        )}
        <span className="font-medium hover:underline">{item.title}</span>
        <span className="ml-1.5 text-xs text-muted-foreground" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="mt-3 space-y-3 border-l border-border pl-3 sm:pl-4">
          {item.image && (
            <div className="relative aspect-[16/9] max-w-lg border border-border bg-muted">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 512px) 100vw, 512px"
              />
            </div>
          )}
          {item.summary && (
            <p className="text-sm text-muted-foreground">{item.summary}</p>
          )}
          {children && (
            <div className="prose prose-neutral max-w-none text-sm">{children}</div>
          )}
        </div>
      )}
    </li>
  );
}
