import Link from "next/link";
import Image from "next/image";
import { formatPublicationVenue } from "@/lib/publications";

const PREVIEW_COUNT = 3;

export type ResearchAreaPublication = {
  slug: string;
  title: string;
  authors: string;
  venue: string;
  journal: string;
  year: number;
  href: string;
};

export type ResearchArea = {
  title: string;
  slug: string;
  description: string;
  image?: string | null;
  publications: ResearchAreaPublication[];
};

function PublicationCitation({ pub }: { pub: ResearchAreaPublication }) {
  const venue = formatPublicationVenue(pub);
  const external = pub.href.startsWith("http");

  return (
    <li className="text-xs leading-snug text-muted-foreground">
      <span>{pub.authors}. </span>
      <Link
        href={pub.href}
        className="font-medium text-foreground transition-colors hover:text-primary hover:underline"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        “{pub.title}.”
      </Link>
      {venue ? <span> {venue}.</span> : null}
    </li>
  );
}

export function ResearchAreaTile({ area }: { area: ResearchArea }) {
  const preview = area.publications.slice(0, PREVIEW_COUNT);
  const extra = area.publications.slice(PREVIEW_COUNT);
  const hasExtra = extra.length > 0;
  const toggleId = `research-area-${area.slug || "area"}-pubs`;

  return (
    <article className="research-area-tile flex h-full flex-col rounded-2xl border border-border bg-card">
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden rounded-t-2xl bg-muted">
        {area.image ? (
          <Image
            src={area.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 448px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Image coming soon
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 py-5">
        <div className="min-h-[7.5rem]">
          <h2 className="font-display text-lg font-semibold leading-snug text-primary">
            {area.title}
          </h2>
          <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
            {area.description}
          </p>
        </div>

        {area.publications.length > 0 && (
          <div className="research-area-pubs mt-auto border-t border-border pt-3">
            {hasExtra ? (
              <input
                id={toggleId}
                type="checkbox"
                className="research-area-toggle sr-only"
              />
            ) : null}

            <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">
              Publications
            </h3>

            <ul className="research-area-preview mt-2 space-y-2">
              {preview.map((pub) => (
                <PublicationCitation key={pub.slug} pub={pub} />
              ))}
            </ul>

            {hasExtra ? (
              <>
                <ul className="research-area-extra mt-2 space-y-2">
                  {extra.map((pub) => (
                    <PublicationCitation key={pub.slug} pub={pub} />
                  ))}
                </ul>

                <div className="mt-3 min-h-7">
                  <label
                    htmlFor={toggleId}
                    className="research-area-label-more cursor-pointer text-xs font-semibold text-primary hover:underline"
                  >
                    Show {extra.length} more
                  </label>
                  <label
                    htmlFor={toggleId}
                    className="research-area-label-less cursor-pointer text-xs font-semibold text-primary hover:underline"
                  >
                    Show less
                  </label>
                </div>
              </>
            ) : (
              <div className="mt-3 min-h-7" aria-hidden />
            )}
          </div>
        )}
      </div>
    </article>
  );
}
