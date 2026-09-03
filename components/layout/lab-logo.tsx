import Image from "next/image";
import Link from "next/link";

type LabLogoProps = {
  subtitle?: string;
  institution?: string;
  className?: string;
};

export function LabLogo({ subtitle, institution, className }: LabLogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 min-w-0 ${className ?? ""}`}
    >
      <Image
        src="/pearl-logo.svg"
        alt="PEARL logo"
        width={52}
        height={52}
        className="shrink-0 text-primary"
        priority
      />
      <div className="min-w-0">
        <p
          className="text-lg font-semibold leading-tight text-primary group-hover:text-pearl-blue"
          suppressHydrationWarning
        >
          PEARL
        </p>
        {subtitle && (
          <p className="text-sm leading-snug text-muted-foreground">{subtitle}</p>
        )}
        {institution && (
          <p className="text-xs text-muted-foreground">{institution}</p>
        )}
      </div>
    </Link>
  );
}
