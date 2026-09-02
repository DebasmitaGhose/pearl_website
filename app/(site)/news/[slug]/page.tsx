import { reader } from "@/lib/keystatic";
import { NewsSlugRedirect } from "@/components/news/news-slug-redirect";

export async function generateStaticParams() {
  const news = await reader.collections.news.all();
  return news.map((item) => ({ slug: item.slug }));
}

export default async function NewsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <NewsSlugRedirect slug={slug} />;
}
