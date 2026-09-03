import Image from "next/image";
import Link from "next/link";
import { joinHrefForMemberRole } from "@/lib/join-opportunities";
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

function isPlaceholderMember(name: string) {
  return (
    name.includes("Open Position") || name.includes("This could be you")
  );
}

function memberDisplayName(name: string) {
  if (isPlaceholderMember(name)) return "This could be you";
  return name;
}

function MemberCard({ member }: { member: MemberEntry }) {
  const isPlaceholder = isPlaceholderMember(member.name);
  const displayName = memberDisplayName(member.name);
  const src = resolvePhoto(member.photo);

  return (
    <article className="flex flex-col items-center text-center">
      {src ? (
        <Image
          src={src}
          alt={member.name}
          width={136}
          height={136}
          className="size-[136px] rounded-full object-cover"
        />
      ) : (
        <div
          className="flex size-[136px] items-center justify-center rounded-full bg-muted text-xl text-muted-foreground"
          aria-hidden
        >
          {isPlaceholder ? "?" : member.name.slice(0, 1)}
        </div>
      )}
      <h3 className="mt-4 text-base font-semibold leading-snug text-foreground sm:text-lg">
        {displayName}
      </h3>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-sm">
        {isPlaceholder ? (
          <Link
            href={joinHrefForMemberRole(member.role)}
            className="text-foreground hover:underline"
          >
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

function RobotCard() {
  return (
    <article className="flex flex-col items-center text-center">
      <div
        className="flex size-[136px] items-center justify-center rounded-full bg-muted text-lg font-medium text-muted-foreground"
        aria-hidden
      >
        TBD
      </div>
      <h3 className="mt-4 text-base font-semibold leading-snug text-foreground sm:text-lg">
        TBD
      </h3>
    </article>
  );
}

export function PeopleSections({ members }: { members: MemberEntry[] }) {
  if (members.length === 0) {
    return (
      <p className="text-base text-muted-foreground">No team members listed yet.</p>
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
    <div className="space-y-12">
      {grouped.map((section) => (
        <section key={section.role}>
          <h2 className="mb-6 text-base font-semibold text-primary sm:text-lg">
            {section.label}
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {section.members.map((member) => (
              <MemberCard key={member.slug} member={member} />
            ))}
          </div>
        </section>
      ))}

      <section>
        <h2 className="mb-6 text-base font-semibold text-primary sm:text-lg">
          Robots
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          <RobotCard />
          <RobotCard />
        </div>
      </section>
    </div>
  );
}
