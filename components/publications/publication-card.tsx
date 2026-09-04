import { Award } from "lucide-react";
import type { PublicationEntry } from "@/components/publications/publication-list";
import {
  formatPublicationBibtex,
  splitPublicationVenueAndAward,
} from "@/lib/publications";
import { cn } from "@/lib/utils";

function VenueTag({ label }: { label: string }) {
  return (
    <span className="inline-block w-fit rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold tracking-wide text-secondary-foreground">
      {label}
    </span>
  );
}

function AwardBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex w-fit items-center gap-1 rounded-md border border-pearl-award-border bg-pearl-award-bg px-2 py-0.5 text-xs font-semibold tracking-wide text-pearl-accent">
      <Award className="size-3.5 shrink-0" strokeWidth={2.25} aria-hidden />
      <span>{label}</span>
    </span>
  );
}

function PublicationFullVenue({ pub }: { pub: PublicationEntry }) {
  const { venueText } = splitPublicationVenueAndAward(pub);

  if (!venueText) return null;

  return (
    <p className="text-sm leading-relaxed text-muted-foreground">{venueText}</p>
  );
}

const actionChipClassName =
  "inline-block rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-primary transition-colors hover:border-secondary hover:bg-secondary/40 hover:text-secondary-foreground";

function resolveBibtex(pub: PublicationEntry) {
  const stored = pub.citation?.trim();
  if (stored?.startsWith("@")) return stored;
  return formatPublicationBibtex(pub);
}

export function PublicationCard({ pub }: { pub: PublicationEntry }) {
  const abstractId = `${pub.slug}-abstract`;
  const citationId = `${pub.slug}-citation`;
  const hasAbstract = Boolean(pub.abstract?.trim());
  const bibtex = resolveBibtex(pub);
  const hasEqualContribution = pub.authors.includes("*");
  const { awardLabel } = splitPublicationVenueAndAward(pub);

  return (
    <article className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="space-y-2">
        {pub.venue || awardLabel ? (
          <div className="flex flex-wrap items-center gap-1.5">
            {pub.venue ? <VenueTag label={pub.venue} /> : null}
            {awardLabel ? <AwardBadge label={awardLabel} /> : null}
          </div>
        ) : null}
        <h3 className="text-base font-semibold leading-snug text-foreground">
          {pub.title}
        </h3>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">{pub.authors}</p>

      <div className="mt-2">
        <PublicationFullVenue pub={pub} />
      </div>

      <div className="publication-actions mt-4">
        {hasAbstract ? (
          <input
            id={abstractId}
            type="checkbox"
            className="publication-toggle-abstract sr-only"
          />
        ) : null}
        <input
          id={citationId}
          type="checkbox"
          className="publication-toggle-citation sr-only"
        />

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {hasAbstract ? (
              <label
                htmlFor={abstractId}
                className={cn(
                  actionChipClassName,
                  "publication-label-abstract cursor-pointer"
                )}
              >
                Abstract
              </label>
            ) : null}

            <label
              htmlFor={citationId}
              className={cn(
                actionChipClassName,
                "publication-label-citation cursor-pointer"
              )}
            >
              Citation
            </label>

            {pub.links.map((link) => (
              <a
                key={`${link.label}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={actionChipClassName}
              >
                {link.label}
              </a>
            ))}
          </div>

          {hasEqualContribution ? (
            <p className="ml-auto shrink-0 text-[0.65rem] tracking-wide text-muted-foreground/65">
              * equal contribution
            </p>
          ) : null}
        </div>

        {hasAbstract ? (
          <div
            id={`${abstractId}-panel`}
            className="publication-panel publication-panel-abstract mt-3 rounded-lg border border-border bg-muted/40 p-3 text-sm leading-relaxed text-foreground"
          >
            <p>{pub.abstract}</p>
          </div>
        ) : null}

        <div
          id={`${citationId}-panel`}
          className="publication-panel publication-panel-citation mt-3 rounded-lg border border-border bg-muted/40 p-3 text-sm leading-relaxed text-foreground"
        >
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed">
            {bibtex}
          </pre>
        </div>
      </div>
    </article>
  );
}
