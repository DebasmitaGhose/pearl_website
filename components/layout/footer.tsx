import { LabLogo } from "@/components/layout/lab-logo";
import Link from "next/link";

type FooterProps = {
  labSubtitle: string;
  institution: string;
  contactEmail: string;
  address: string;
  footerText: string;
};

export function Footer({
  labSubtitle,
  institution,
  contactEmail,
  address,
  footerText,
}: FooterProps) {
  return (
    <footer className="mt-12 border-t border-primary/30 bg-gradient-to-br from-pearl-blue via-primary to-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2">
        <LabLogo
          subtitle={labSubtitle}
          institution={institution}
        />
        <div className="space-y-1 text-sm">
          <p className="font-medium text-primary-foreground">Contact</p>
          <p className="text-primary-foreground/75">{address}</p>
          <Link
            href={`mailto:${contactEmail}`}
            className="text-primary-foreground underline decoration-primary-foreground/35 underline-offset-4 hover:decoration-primary-foreground"
          >
            {contactEmail}
          </Link>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 px-4 py-4 sm:px-6">
        <p className="mx-auto max-w-6xl text-xs text-primary-foreground/65">
          {footerText}
        </p>
      </div>
    </footer>
  );
}
