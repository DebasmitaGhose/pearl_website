import {
  LAB_CONTACT_EMAIL,
  LAB_CONTACT_EMAIL_NOTE,
} from "@/lib/site.config";

type ContactEmailProps = {
  email?: string;
  note?: string | null;
  className?: string;
  /** Show the asterisk footnote below the address */
  showNote?: boolean;
};

export function ContactEmail({
  email = LAB_CONTACT_EMAIL,
  note = LAB_CONTACT_EMAIL_NOTE,
  className,
  showNote = true,
}: ContactEmailProps) {
  return (
    <span className={className}>
      <a
        href={`mailto:${email}`}
        className="font-medium text-primary underline decoration-secondary underline-offset-4 hover:text-pearl-blue"
      >
        {email}
      </a>
      {showNote && note ? (
        <>
          <sup className="text-primary">*</sup>
          <span className="mt-1 block text-xs text-muted-foreground">
            *{note}
          </span>
        </>
      ) : null}
    </span>
  );
}
