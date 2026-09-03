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
    <footer className="mt-12 border-t border-primary/10 bg-secondary/35">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2">
        <LabLogo subtitle={labSubtitle} institution={institution} />
        <div className="space-y-1 text-sm">
          <p className="font-medium">Contact</p>
          <p className="text-muted-foreground">{address}</p>
          <Link
            href={`mailto:${contactEmail}`}
            className="text-primary hover:text-pearl-blue hover:underline"
          >
            {contactEmail}
          </Link>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 sm:px-6">
        <p className="mx-auto max-w-5xl text-xs text-muted-foreground">
          {footerText}
        </p>
      </div>
    </footer>
  );
}
