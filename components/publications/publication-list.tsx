import {
  PublicationLinks,
} from "@/components/publications/publication-links";
import type { PublicationLink } from "@/lib/publications";

export type PublicationEntry = {
  slug: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  links: PublicationLink[];
};

export function PublicationList({ publications }: { publications: PublicationEntry[] }) {
  if (publications.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No publications yet.</p>
    );
  }

  const byYear = new Map<number, PublicationEntry[]>();
  for (const pub of publications) {
    const year = pub.year;
    const group = byYear.get(year) ?? [];
    group.push(pub);
    byYear.set(year, group);
  }

  const years = Array.from(byYear.keys()).sort((a, b) => b - a);

  return (
    <div className="space-y-8">
      {years.map((year) => (
        <section key={year}>
          <h2 className="mb-3 text-sm font-semibold text-foreground">{year}</h2>
          <ul className="divide-y divide-border">
            {byYear.get(year)?.map((pub) => (
              <li
                key={pub.slug}
                className="flex flex-col gap-2 py-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
              >
                <p className="min-w-0 text-sm leading-relaxed text-foreground">
                  <span className="mr-2 inline-block border border-border px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {pub.venue}
                  </span>
                  <span className="font-medium">{pub.title}</span>
                  <span className="text-muted-foreground"> — {pub.authors}</span>
                </p>
                <PublicationLinks links={pub.links} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
