import Image from "next/image";
import Link from "next/link";

type LabLogoProps = {
  subtitle?: string;
  className?: string;
  variant?: "default" | "onDark";
  size?: "sm" | "lg";
};

export function LabLogo({
  subtitle,
  className,
  size = "sm",
}: LabLogoProps) {
  const large = size === "lg";

  return (
    <Link
      href="/"
      className={`group inline-flex min-w-0 ${className ?? ""}`}
    >
      <div
        className={`flex flex-col items-center border-2 border-primary-foreground/90 bg-transparent ${
          large
            ? "gap-1 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5"
            : "gap-0.5 rounded-lg px-2.5 py-1.5"
        }`}
      >
        {/* unoptimized avoids Next.js image cache flattening the transparent PNG */}
        <Image
          src="/pearl-logo-white.png"
          alt="PEARL logo: cupped human and robot hands with a pearl floating between them"
          width={large ? 72 : 48}
          height={large ? 72 : 48}
          unoptimized
          className={`${large ? "size-[4.25rem]" : "size-12"} shrink-0 bg-transparent object-contain transition-transform group-hover:scale-[1.02]`}
          priority
        />
        <div className="min-w-0 text-center">
          <p
            className={
              large
                ? "font-display text-xl font-semibold leading-none tracking-[0.12em] text-primary-foreground group-hover:text-secondary"
                : "font-display text-base font-semibold leading-none tracking-[0.12em] text-primary-foreground group-hover:text-secondary"
            }
            suppressHydrationWarning
          >
            PEARL
          </p>
          {subtitle && (
            <p
              className={
                large
                  ? "mt-0.5 font-display text-[0.7rem] font-medium leading-tight tracking-wide text-primary-foreground/90 sm:text-xs"
                  : "mt-0.5 font-display text-[0.65rem] font-medium leading-tight tracking-wide text-primary-foreground/90"
              }
            >
              <span className="block">PEople Aligned</span>
              <span className="block">Robots Lab</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
