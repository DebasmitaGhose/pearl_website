import { PageFrame } from "@/components/layout/page-frame";
import { PeopleSections } from "@/components/people/member-card";
import { getActiveMembers } from "@/lib/content";

export default async function TeamPage() {
  const members = await getActiveMembers();

  return (
    <PageFrame title="Team" wide>
      <PeopleSections members={members} />
    </PageFrame>
  );
}
