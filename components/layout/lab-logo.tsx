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
        className={`flex items-center border-2 border-primary-foreground/90 bg-transparent ${
          large
            ? "gap-3 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2"
            : "gap-2.5 rounded-md px-2 py-1"
        }`}
      >
        {/* unoptimized avoids Next.js image cache flattening the transparent PNG */}
        <Image
          src="/pearl-logo-white.png"
          alt="PEARL logo: cupped human and robot hands with a pearl floating between them"
          width={large ? 64 : 48}
          height={large ? 64 : 48}
          unoptimized
          className={`${large ? "size-16" : "size-12"} shrink-0 bg-transparent object-contain transition-transform group-hover:scale-[1.02]`}
          priority
        />
        <div className="min-w-0 whitespace-nowrap text-center leading-tight">
          <p
            className={
              large
                ? "font-display text-lg font-semibold tracking-[0.04em] text-primary-foreground group-hover:text-secondary sm:text-xl"
                : "font-display text-sm font-semibold tracking-[0.04em] text-primary-foreground group-hover:text-secondary"
            }
            suppressHydrationWarning
          >
            PEARL
          </p>
          {subtitle ? (
            <>
              <div
                className="mx-auto my-1.5 h-px w-10 bg-primary-foreground/90"
                aria-hidden
              />
              <p
                className={
                  large
                    ? "font-display text-[0.8rem] font-medium tracking-wide text-primary-foreground/90 sm:text-[0.85rem]"
                    : "font-display text-xs font-medium tracking-wide text-primary-foreground/90"
                }
              >
                PEople Aligned
              </p>
              <p
                className={
                  large
                    ? "font-display text-[0.8rem] font-medium tracking-wide text-primary-foreground/90 sm:text-[0.85rem]"
                    : "font-display text-xs font-medium tracking-wide text-primary-foreground/90"
                }
              >
                Robots Lab
              </p>
            </>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
