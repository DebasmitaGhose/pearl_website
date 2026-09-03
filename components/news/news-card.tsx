import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNewsFullDate } from "@/lib/dates";

export type NewsEntry = {
  slug: string;
  title: string;
  date: string | null;
  summary: string;
  image?: string | null;
};

export function NewsCard({ item }: { item: NewsEntry }) {
  return (
    <Card className="overflow-hidden border-border/70 shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/news/${item.slug}`} className="block">
        {item.image && (
          <div className="relative aspect-[16/9] w-full bg-muted">
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {formatNewsFullDate(item.date)}
          </p>
          <CardTitle className="text-lg leading-snug">{item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.summary}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}

export function NewsList({ items }: { items: NewsEntry[] }) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border bg-muted/30 px-6 py-12 text-center text-muted-foreground">
        No news posts yet. Add news in the Keystatic admin.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <NewsCard key={item.slug} item={item} />
      ))}
    </div>
  );
}
