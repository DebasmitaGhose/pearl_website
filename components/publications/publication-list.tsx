import { PublicationCard } from "@/components/publications/publication-card";
import type { PublicationLink } from "@/lib/publications";

export type PublicationEntry = {
  slug: string;
  title: string;
  authors: string;
  venue: string;
  journal?: string;
  year: number;
  abstract?: string;
  citation?: string;
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
    <div className="space-y-10">
      {years.map((year) => (
        <section key={year}>
          <h2 className="mb-4 inline-block rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground shadow-sm">
            {year}
          </h2>
          <ul className="grid gap-4">
            {byYear.get(year)?.map((pub) => (
              <li key={pub.slug}>
                <PublicationCard pub={pub} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
