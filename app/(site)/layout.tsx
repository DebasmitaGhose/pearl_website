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
    <SiteChrome labSubtitle={site.labSubtitle} institution={site.institution}>
      <main>{children}</main>
      <Footer
        labSubtitle={site.labSubtitle}
        institution={site.institution}
        contactEmail={site.contactEmail}
        address={site.address}
        footerText={site.footerText}
      />
    </SiteChrome>
  );
}
