"use client";

import { useSyncExternalStore } from "react";
import { joinOpportunities } from "@/lib/join-opportunities";

const defaultOpenId =
  joinOpportunities.find((item) => item.defaultOpen)?.id ??
  joinOpportunities[0]?.id ??
  "";

function hashOpenId() {
  const id = window.location.hash.replace(/^#/, "");
  return joinOpportunities.some((item) => item.id === id) ? id : defaultOpenId;
}

function subscribeHash(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  window.addEventListener("popstate", onStoreChange);
  return () => {
    window.removeEventListener("hashchange", onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
  };
}

export function JoinOpportunityCards() {
  const openId = useSyncExternalStore(
    subscribeHash,
    hashOpenId,
    () => defaultOpenId,
  );

  return (
    <div className="join-opportunity-list space-y-4">
      {joinOpportunities.map((opportunity) => (
        <section
          key={opportunity.id}
          id={opportunity.id}
          className="join-opportunity-card scroll-mt-24 rounded-xl border border-border bg-card"
        >
          <input
            type="radio"
            name="join-opportunity"
            id={`join-toggle-${opportunity.id}`}
            className="join-opportunity-toggle sr-only"
            checked={openId === opportunity.id}
            onChange={() => {
              if (window.location.hash.replace(/^#/, "") === opportunity.id) {
                return;
              }
              window.location.hash = opportunity.id;
            }}
          />
          <label
            htmlFor={`join-toggle-${opportunity.id}`}
            className="flex cursor-pointer items-start justify-between gap-4 px-5 py-4"
          >
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-primary">
                {opportunity.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {opportunity.summary}
              </p>
            </div>
            <span
              className="join-opportunity-icon mt-0.5 shrink-0 text-lg leading-none text-muted-foreground"
              aria-hidden
            >
              +
            </span>
          </label>

          <div className="join-opportunity-body space-y-4 border-t border-border px-5 py-4 text-sm leading-relaxed text-foreground">
            {opportunity.sections.map((section, index) => (
              <div key={`${opportunity.id}-section-${index}`}>
                {section.heading && (
                  <h3 className="mb-2 font-medium text-foreground">
                    {section.heading}
                  </h3>
                )}
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-muted-foreground [&:not(:first-child)]:mt-2"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div>
              <h3 className="mb-2 font-medium text-foreground">How to apply</h3>
              <p className="text-muted-foreground">{opportunity.howToApply}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
