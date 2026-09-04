import { SiteChrome } from "@/components/layout/site-chrome";
import { Footer } from "@/components/layout/footer";
import { getSiteSettings } from "@/lib/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSiteSettings();

  return (
    <SiteChrome labSubtitle={site.labSubtitle}>
      <main>{children}</main>
      <Footer
        contactEmail={site.contactEmail}
        contactEmailNote={site.contactEmailNote}
      />
    </SiteChrome>
  );
}
