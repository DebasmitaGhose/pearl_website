import type { PublicationLink } from "@/lib/publications";

export function PublicationLinks({ links }: { links: PublicationLink[] }) {
  if (links.length === 0) return null;

  return (
    <span className="inline-flex shrink-0 flex-wrap items-center gap-1.5">
      {links.map((link) => (
        <a
          key={`${link.label}-${link.url}`}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-border px-2 py-0.5 text-xs text-foreground hover:bg-muted"
        >
          {link.label}
        </a>
      ))}
    </span>
  );
}
