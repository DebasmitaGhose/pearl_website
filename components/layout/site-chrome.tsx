import { SiteHeader } from "@/components/layout/site-header";

type SiteChromeProps = {
  labSubtitle: string;
  children: React.ReactNode;
};

export function SiteChrome({ labSubtitle, children }: SiteChromeProps) {
  return (
    <div className="min-h-screen text-foreground">
      <SiteHeader labSubtitle={labSubtitle} />
      <div className="relative">{children}</div>
    </div>
  );
}
