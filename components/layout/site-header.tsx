import { LabLogo } from "@/components/layout/lab-logo";
import { SiteNavBar } from "@/components/layout/site-nav-bar";

type SiteHeaderProps = {
  institution: string;
  labSubtitle: string;
};

export function SiteHeader({ institution, labSubtitle }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-primary/40 bg-primary text-primary-foreground shadow-[0_14px_32px_-14px_oklch(0.25_0.08_285/0.65)]">
      <div className="h-1.5 bg-gradient-to-r from-secondary via-pearl-accent/80 to-secondary" />
      <div className="bg-gradient-to-br from-pearl-blue via-primary to-primary">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <SiteNavBar variant="onDark" />
            </div>
            <LabLogo
              subtitle={labSubtitle}
              institution={institution}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
