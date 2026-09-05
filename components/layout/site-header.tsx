import Image from "next/image";
import Link from "next/link";
import { LabLogo } from "@/components/layout/lab-logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteNavBar } from "@/components/layout/site-nav-bar";
import { withBasePath } from "@/lib/paths";

type SiteHeaderProps = {
  labSubtitle: string;
};

function UicLogo() {
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
        className="h-14 w-auto object-contain"
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
        {/* Mobile: full logos stacked so nothing is cropped or shrunk */}
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2 md:hidden">
          <div className="flex items-start justify-between gap-3">
            <LabLogo subtitle={labSubtitle} variant="onDark" size="lg" />
            <MobileNav />
          </div>
          <div className="flex justify-end">
            <UicLogo />
          </div>
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
