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
    <article className="research-area-tile grid grid-rows-[auto_auto_auto_1fr] overflow-hidden rounded-2xl border border-border bg-card shadow-sm max-sm:h-full sm:row-span-4 sm:grid-rows-subgrid">
      <div className="relative h-52 w-full bg-white sm:h-60">
        {area.image ? (
          <Image
            src={area.image}
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 448px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Image coming soon
          </div>
        )}
      </div>

      <div className="flex items-center bg-primary px-5 py-3">
        <h2 className="font-display text-base font-semibold leading-snug text-balance text-primary-foreground sm:text-lg">
          {area.title}
        </h2>
      </div>

      <p className="px-5 pt-5 text-sm leading-relaxed text-muted-foreground">
        {area.description}
      </p>

      {area.publications.length > 0 ? (
        <div className="research-area-pubs px-5 pb-5 pt-3">
          <div className="border-t border-border pt-3">
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
        </div>
      ) : (
        <div className="px-5 pb-5" />
      )}
    </article>
  );
}
