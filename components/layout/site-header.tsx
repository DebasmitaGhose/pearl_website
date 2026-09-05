import Image from "next/image";
import Link from "next/link";
import { LabLogo } from "@/components/layout/lab-logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteNavBar } from "@/components/layout/site-nav-bar";
import { withBasePath } from "@/lib/paths";

type SiteHeaderProps = {
  labSubtitle: string;
};

function UicLogo({ className }: { className?: string }) {
  return (
    <Link
      href="https://www.uic.edu/"
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 leading-none opacity-95 transition-opacity hover:opacity-100"
      aria-label="University of Illinois Chicago"
    >
      <Image
        src={withBasePath("/uic-logo-white.png")}
        alt="University of Illinois Chicago"
        width={280}
        height={78}
        unoptimized
        className={className ?? "h-14 w-auto object-contain"}
        priority
      />
    </Link>
  );
}

export function SiteHeader({ labSubtitle }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-primary/40 bg-primary text-primary-foreground shadow-[0_14px_32px_-14px_oklch(0.25_0.08_285/0.65)]">
      <div className="h-1 bg-gradient-to-r from-secondary via-pearl-accent/80 to-secondary" />
      <div className="bg-gradient-to-br from-pearl-blue via-primary to-primary">
        {/* Mobile: one row — PEARL, UIC, and menu with even spacing */}
        <div className="mx-auto flex h-[4.75rem] max-w-6xl items-center justify-between gap-4 px-3 md:hidden">
          <div className="min-w-0 origin-left scale-[0.7] [margin-right:-16%]">
            <LabLogo subtitle={labSubtitle} variant="onDark" size="lg" />
          </div>
          <div className="shrink-0 origin-center scale-[0.7]">
            <UicLogo />
          </div>
          <MobileNav className="shrink-0" />
        </div>

        {/* Desktop: original side-by-side layout */}
        <div className="mx-auto hidden max-w-6xl items-stretch justify-between gap-4 px-6 py-2.5 md:flex">
          <LabLogo subtitle={labSubtitle} variant="onDark" size="lg" />
          <div className="flex flex-col items-end justify-between py-0.5">
            <UicLogo />
            <SiteNavBar variant="onDark" className="-mb-0.5" />
          </div>
        </div>
      </div>
    </header>
  );
}
