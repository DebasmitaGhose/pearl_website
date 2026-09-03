import type { JoinInlinePart } from "@/lib/join-opportunities";

export function JoinInline({ parts }: { parts: JoinInlinePart[] }) {
  return (
    <>
      {parts.map((part, index) => {
        if (typeof part === "string") {
          return <span key={index}>{part}</span>;
        }
        if (part.type === "bold") {
          return (
            <strong key={index} className="font-medium text-foreground">
              {part.text}
            </strong>
          );
        }
        return (
          <a
            key={index}
            href={part.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline decoration-secondary underline-offset-4 hover:text-pearl-blue"
          >
            {part.label}
          </a>
        );
      })}
    </>
  );
}
