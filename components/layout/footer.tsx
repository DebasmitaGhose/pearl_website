import { ContactEmail } from "@/components/ui/contact-email";

type FooterProps = {
  contactEmail?: string;
  contactEmailNote?: string | null;
};

export function Footer({ contactEmail, contactEmailNote }: FooterProps) {
  return (
    <footer className="mt-10 border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-sm text-muted-foreground sm:px-6">
        <p>
          Contact:{" "}
          <ContactEmail email={contactEmail} note={contactEmailNote} />
        </p>
      </div>
      <div
        className="h-3 bg-gradient-to-r from-pearl-blue via-primary to-primary"
        aria-hidden
      />
    </footer>
  );
}
