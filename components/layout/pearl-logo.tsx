import Link from "next/link";

type PearlLogoProps = {
  size?: "sm" | "lg";
  showWordmark?: boolean;
  variant?: "sidebar" | "light";
  className?: string;
};

export function PearlLogo({
  size = "sm",
  showWordmark = true,
  variant = "sidebar",
  className,
}: PearlLogoProps) {
  const dim = size === "lg" ? 96 : 56;
  const fg = variant === "sidebar" ? "#f4f0e8" : "#1a2332";
  const accent = variant === "sidebar" ? "#e8b86d" : "#c45c3e";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className ?? ""}`}
    >
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 120 120"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-transform group-hover:scale-[1.02]"
      >
        <circle
          cx="60"
          cy="60"
          r="56"
          stroke={fg}
          strokeWidth="2"
          opacity="0.35"
        />
        <circle
          cx="60"
          cy="60"
          r="38"
          stroke={fg}
          strokeWidth="1.5"
          opacity="0.5"
        />
        <circle cx="52" cy="54" r="18" fill={accent} opacity="0.95" />
        <circle cx="48" cy="48" r="5" fill={fg} opacity="0.45" />
      </svg>
      {showWordmark && (
        <div className="min-w-0">
          <p
            className={`font-display font-semibold tracking-[0.2em] ${size === "lg" ? "text-2xl" : "text-sm"}`}
            style={{ color: variant === "sidebar" ? fg : undefined }}
          >
            PEARL
          </p>
          {size === "lg" && (
            <p
              className="mt-1 text-xs leading-snug"
              style={{
                color: variant === "sidebar" ? fg : undefined,
                opacity: variant === "sidebar" ? 0.7 : 1,
              }}
            >
              PEople Aligned Robots Lab
            </p>
          )}
        </div>
      )}
    </Link>
  );
}
