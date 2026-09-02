import { LabLogo } from "@/components/layout/lab-logo";
import { SiteNavBar } from "@/components/layout/site-nav-bar";

type SiteHeaderProps = {
  institution: string;
  labSubtitle: string;
};

export function SiteHeader({ institution, labSubtitle }: SiteHeaderProps) {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5 sm:px-6 sm:py-6">
        <LabLogo subtitle={labSubtitle} institution={institution} />
        <SiteNavBar />
      </div>
    </header>
  );
}
