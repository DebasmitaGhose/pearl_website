import Image from "next/image";
import Link from "next/link";
import { roleLabels, memberRoleOrder } from "@/lib/site.config";

export type MemberEntry = {
  slug: string;
  name: string;
  role: string;
  website?: string;
  scholarUrl?: string;
  photo?: string | null;
  order: number;
  active: boolean;
};

function resolvePhoto(photo?: string | null) {
  if (!photo) return null;
  if (photo.startsWith("/")) return photo;
  return `/images/members/${photo}`;
}

function MemberCard({ member }: { member: MemberEntry }) {
  const isOpen = member.name.includes("Open Position");
  const src = resolvePhoto(member.photo);

  return (
    <article className="flex w-36 flex-col items-center text-center">
      {src ? (
        <Image
          src={src}
          alt={member.name}
          width={88}
          height={88}
          className="size-[88px] rounded-full object-cover"
        />
      ) : (
        <div
          className="flex size-[88px] items-center justify-center rounded-full bg-muted text-sm text-muted-foreground"
          aria-hidden
        >
          {isOpen ? "?" : member.name.slice(0, 1)}
        </div>
      )}
      <h3 className="mt-3 text-sm font-medium leading-snug text-foreground">
        {member.name}
      </h3>
      <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
        {isOpen ? (
          <Link href="/join" className="text-foreground hover:underline">
            Join us
          </Link>
        ) : (
          <>
            {member.website && (
              <Link
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                Website
              </Link>
            )}
            {member.scholarUrl && (
              <Link
                href={member.scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                Scholar
              </Link>
            )}
          </>
        )}
      </div>
    </article>
  );
}

export function PeopleSections({ members }: { members: MemberEntry[] }) {
  if (members.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No team members listed yet.</p>
    );
  }

  const grouped = memberRoleOrder
    .map((role) => ({
      role,
      label: roleLabels[role] ?? role,
      members: members.filter((m) => m.role === role),
    }))
    .filter((section) => section.members.length > 0);

  return (
    <div className="space-y-10">
      {grouped.map((section) => (
        <section key={section.role}>
          <h2 className="mb-5 text-sm font-semibold text-foreground">
            {section.label}
          </h2>
          <div className="flex flex-wrap gap-8">
            {section.members.map((member) => (
              <MemberCard key={member.slug} member={member} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
