import Link from "next/link";

type LabLogoProps = {
  subtitle?: string;
  institution?: string;
  className?: string;
  /** Kept for callers; logo is always light-on-dark for header/footer. */
  variant?: "default" | "onDark";
};

function PearlMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Human hand from top — cupped palm */}
      <g fill="currentColor">
        <path d="M48 18c3 20 9 36 22 48 6 6 14 10 23 12l2-12c-7-1-13-4-18-9-10-10-16-23-18-39z" />
        <path d="M94 66c12 2 22 10 27 20l-12 7c-3-7-10-13-20-15z" />
        {/* Fingers curling down around pearl */}
        <path d="M74 82c-2 14 0 26 8 34l8-8c-4-5-5-13-4-26z" />
        <path d="M90 78c-1 16 0 28 3 36l9-5c-2-8-2-18-1-31z" />
        <path d="M108 80c1 15 0 26-3 34l-9-4c3-7 5-16 5-30z" />
        <path d="M124 86c2 12 1 22-2 30l-8-3c3-7 4-15 4-27z" />
      </g>

      {/* Floating pearl */}
      <circle cx="100" cy="118" r="20" fill="currentColor" />
      <circle cx="92" cy="110" r="6" fill="#fff" opacity="0.4" />
      <circle cx="95" cy="113" r="2.2" fill="#fff" opacity="0.85" />

      {/* Robot hand from bottom — cupped palm */}
      <g fill="currentColor">
        <path d="M152 182c-8-18-18-32-34-42l11-11c14 10 24 23 31 39z" />
        <path d="M104 148l24 11-9 16-24-12z" />
        <rect
          x="74"
          y="120"
          width="9"
          height="28"
          rx="2.5"
          transform="rotate(18 78.5 134)"
        />
        <rect x="92" y="114" width="10" height="34" rx="2.5" />
        <rect
          x="112"
          y="120"
          width="9"
          height="28"
          rx="2.5"
          transform="rotate(-18 116.5 134)"
        />
        <path d="M68 146l-14-16 9-7 14 15z" />
        <circle cx="132" cy="164" r="2.8" opacity="0.85" />
        <circle cx="122" cy="174" r="2.2" opacity="0.7" />
      </g>
    </svg>
  );
}

export function LabLogo({
  subtitle,
  institution,
  className,
}: LabLogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex min-w-0 items-center gap-4 ${className ?? ""}`}
    >
      <PearlMark className="size-20 shrink-0 text-primary-foreground transition-transform group-hover:scale-[1.02]" />
      <div className="min-w-0">
        <p
          className="font-display text-2xl font-semibold leading-tight tracking-[0.14em] text-primary-foreground group-hover:text-secondary"
          suppressHydrationWarning
        >
          PEARL
        </p>
        {subtitle && (
          <p className="mt-1 text-sm font-medium leading-snug text-primary-foreground/85">
            {subtitle}
          </p>
        )}
        {institution && (
          <p className="mt-0.5 text-xs text-primary-foreground/65">
            {institution}
          </p>
        )}
      </div>
    </Link>
  );
}
