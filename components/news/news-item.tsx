import Image from "next/image";
import type { NewsEntryData } from "@/components/news/news-types";

function formatDateTag(date: string | null | undefined) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export function NewsItem({
  item,
  children,
}: {
  item: NewsEntryData;
  children: React.ReactNode;
}) {
  return (
    <li className="py-2">
      <details id={item.slug} className="group">
        <summary
          className="cursor-pointer list-none text-sm leading-relaxed [&::-webkit-details-marker]:hidden"
        >
          {item.date && (
            <span className="mr-2 inline-block rounded-md border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
              {formatDateTag(item.date)}
            </span>
          )}
          <span className="font-medium text-foreground hover:text-primary hover:underline">
            {item.title}
          </span>
          <span className="ml-1.5 text-xs text-muted-foreground group-open:hidden">
            +
          </span>
          <span className="ml-1.5 hidden text-xs text-muted-foreground group-open:inline">
            −
          </span>
        </summary>

        <div className="mt-3 space-y-3 border-l-2 border-pearl-accent/50 pl-3 sm:pl-4">
          {item.image && (
            <div className="relative aspect-[16/9] max-w-lg border border-border bg-muted">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 512px) 100vw, 512px"
              />
            </div>
          )}
          {children ? (
            <div className="prose prose-neutral max-w-none text-sm">{children}</div>
          ) : item.summary ? (
            <p className="text-sm text-muted-foreground">{item.summary}</p>
          ) : null}
        </div>
      </details>
    </li>
  );
}
