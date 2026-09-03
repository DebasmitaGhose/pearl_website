import type { PublicationLink } from "@/lib/publications";

export function PublicationLinks({
  links,
  className,
}: {
  links: PublicationLink[];
  className?: string;
}) {
  if (links.length === 0) return null;

  return (
    <span
      className={`inline-flex flex-wrap items-center gap-1.5 ${className ?? ""}`}
    >
      {links.map((link) => (
        <a
          key={`${link.label}-${link.url}`}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-primary transition-colors hover:border-secondary hover:bg-secondary/40 hover:text-secondary-foreground"
        >
          {link.label}
        </a>
      ))}
    </span>
  );
}
