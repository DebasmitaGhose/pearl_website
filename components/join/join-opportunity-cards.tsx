"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  joinOpportunities,
  type JoinOpportunity,
} from "@/lib/join-opportunities";
import { JoinInline } from "@/components/join/join-inline";

function isJoinSectionId(id: string) {
  return joinOpportunities.some((item) => item.id === id);
}

type JoinSection = JoinOpportunity["sections"][number];

function JoinSectionBody({
  opportunityId,
  section,
  sectionIndex,
}: {
  opportunityId: string;
  section: JoinSection;
  sectionIndex: number;
}) {
  return (
    <>
      {section.callout && (
        <p className="rounded-lg border border-secondary bg-gradient-to-r from-secondary via-secondary/80 to-accent px-3.5 py-3 font-medium text-secondary-foreground">
          {section.callout}
        </p>
      )}

      {section.paragraphs?.map((paragraph, paragraphIndex) => (
        <p key={`${opportunityId}-p-${sectionIndex}-${paragraphIndex}`}>
          <JoinInline parts={paragraph} />
        </p>
      ))}

      {section.numberedItems && section.numberedItems.length > 0 && (
        <ol className="list-decimal space-y-3 pl-5">
          {section.numberedItems.map((item) => (
            <li key={item.title} className="pl-1">
              <span className="font-medium text-foreground">{item.title}</span>{" "}
              {item.body}
            </li>
          ))}
        </ol>
      )}

      {section.bullets && section.bullets.length > 0 && (
        <ul className="list-disc space-y-1.5 pl-5">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </>
  );
}

function JoinSectionBlock({
  opportunityId,
  section,
  sectionIndex,
}: {
  opportunityId: string;
  section: JoinSection;
  sectionIndex: number;
}) {
  const body = (
    <JoinSectionBody
      opportunityId={opportunityId}
      section={section}
      sectionIndex={sectionIndex}
    />
  );

  if (section.collapsible && section.heading) {
    return (
      <details className="join-subsection group rounded-lg border border-border/80 bg-muted/20">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3 font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
          <span>{section.heading}</span>
          <span
            className="shrink-0 text-base leading-none text-muted-foreground transition-transform group-open:rotate-45"
            aria-hidden
          >
            +
          </span>
        </summary>
        <div className="space-y-3 border-t border-border/80 px-3.5 py-3">
          {body}
        </div>
      </details>
    );
  }

  return (
    <div className="space-y-3">
      {section.heading ? (
        <h3 className="font-medium text-foreground">{section.heading}</h3>
      ) : null}
      {body}
    </div>
  );
}

export function JoinOpportunityCards() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section") ?? "";

  // Hash fallback for older #phd-style links
  const [hashSection, setHashSection] = useState("");
  useEffect(() => {
    const syncHash = () => {
      setHashSection(window.location.hash.replace(/^#/, ""));
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  const requested = sectionParam || hashSection;
  const openId = isJoinSectionId(requested) ? requested : "";

  useEffect(() => {
    if (!openId) return;
    document.getElementById(openId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [openId]);

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
              router.replace(`${pathname}?section=${opportunity.id}`, {
                scroll: false,
              });
            }}
          />
          <label
            htmlFor={`join-toggle-${opportunity.id}`}
            className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4"
          >
            <div className="min-w-0">
              <h2 className="font-display text-xl font-semibold text-primary">
                {opportunity.title}
              </h2>
            </div>
            <span
              className="join-opportunity-icon shrink-0 text-xl leading-none text-muted-foreground"
              aria-hidden
            >
              +
            </span>
          </label>

          <div className="join-opportunity-body space-y-4 border-t border-border px-5 py-4 text-base leading-relaxed text-muted-foreground">
            {opportunity.sections.map((section, index) => (
              <JoinSectionBlock
                key={`${opportunity.id}-section-${index}`}
                opportunityId={opportunity.id}
                section={section}
                sectionIndex={index}
              />
            ))}

            {opportunity.howToApply && opportunity.howToApply.length > 0 && (
              <div>
                <h3 className="mb-2 font-medium text-foreground">How to apply</h3>
                <p>
                  <JoinInline parts={opportunity.howToApply} />
                </p>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
