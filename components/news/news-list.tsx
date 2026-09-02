import { NewsItem } from "@/components/news/news-item";
import { NewsHashSync } from "@/components/news/news-hash-sync";
import { getNewsEntries } from "@/lib/content";

export async function NewsList({ limit }: { limit?: number }) {
  const items = await getNewsEntries(limit);

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">No news yet.</p>;
  }

  return (
    <>
      <NewsHashSync />
      <ul className="divide-y divide-border">
        {items.map((item) => (
          <NewsItem
            key={item.slug}
            item={{
              slug: item.slug,
              title: item.title,
              date: item.date,
              summary: item.summary,
              image: item.image,
            }}
          >
            {item.body}
          </NewsItem>
        ))}
      </ul>
    </>
  );
}
