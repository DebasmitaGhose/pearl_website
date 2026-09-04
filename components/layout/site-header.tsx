import Image from "next/image";
import Link from "next/link";
import { LabLogo } from "@/components/layout/lab-logo";
import { SiteNavBar } from "@/components/layout/site-nav-bar";

type SiteHeaderProps = {
  labSubtitle: string;
};

export function SiteHeader({ labSubtitle }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-primary/40 bg-primary text-primary-foreground shadow-[0_14px_32px_-14px_oklch(0.25_0.08_285/0.65)]">
      <div className="h-1 bg-gradient-to-r from-secondary via-pearl-accent/80 to-secondary" />
      <div className="bg-gradient-to-br from-pearl-blue via-primary to-primary">
        <div className="mx-auto flex max-w-6xl items-stretch justify-between gap-3 px-4 py-2 sm:gap-4 sm:px-6 sm:py-2.5">
          <LabLogo subtitle={labSubtitle} variant="onDark" size="lg" />
          <div className="flex flex-col items-end justify-between py-0.5">
            <Link
              href="https://www.uic.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 leading-none opacity-95 transition-opacity hover:opacity-100"
              aria-label="University of Illinois Chicago"
            >
              <Image
                src="/uic-logo-white.png"
                alt="University of Illinois Chicago"
                width={280}
                height={78}
                unoptimized
                className="h-8 w-auto object-contain sm:h-10"
                priority
              />
            </Link>
            <SiteNavBar variant="onDark" className="-mb-0.5" />
          </div>
        </div>
      </div>
    </header>
  );
}
