import { NewsList } from "@/components/news/news-list";

export async function NewsTimeline({ limit }: { limit?: number }) {
  return <NewsList limit={limit} />;
}
