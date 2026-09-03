import { SiteHeader } from "@/components/layout/site-header";

type SiteChromeProps = {
  institution: string;
  labSubtitle: string;
  children: React.ReactNode;
};

export function SiteChrome({
  institution,
  labSubtitle,
  children,
}: SiteChromeProps) {
  return (
    <div className="min-h-screen text-foreground">
      <SiteHeader institution={institution} labSubtitle={labSubtitle} />
      <div className="relative">{children}</div>
    </div>
  );
}
