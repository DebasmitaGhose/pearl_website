import { NewsList } from "@/components/news/news-list";
import { PageFrame } from "@/components/layout/page-frame";

export default function NewsPage() {
  return (
    <PageFrame title="News" wide>
      <NewsList />
    </PageFrame>
  );
}
