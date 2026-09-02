import Image from "next/image";
import { PageFrame } from "@/components/layout/page-frame";
import { renderMarkdoc } from "@/lib/markdoc";

type MarkdownPageProps = {
  title: string;
  description?: string;
  heroImage?: string | null;
  footer?: React.ReactNode;
  content: () => Promise<{ node: unknown }>;
};

export async function MarkdownPage({
  title,
  description,
  heroImage,
  footer,
  content,
}: MarkdownPageProps) {
  const body = await renderMarkdoc(content);

  return (
    <PageFrame title={title} description={description}>
      {heroImage && (
        <div className="relative mb-8 aspect-[16/10] border border-border bg-muted">
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
          />
        </div>
      )}

      <div className="prose prose-neutral max-w-none">{body}</div>

      {footer && (
        <div className="mt-10 border-t border-border pt-6">{footer}</div>
      )}
    </PageFrame>
  );
}
