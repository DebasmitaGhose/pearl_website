import { PageFrame } from "@/components/layout/page-frame";
import { PeopleSections } from "@/components/people/member-card";
import { getActiveMembers } from "@/lib/content";

export default async function TeamPage() {
  const members = await getActiveMembers();

  return (
    <PageFrame
      title="Team"
      description="Led by Dr. Debasmita Ghose. We are growing across PhD, master's, and undergraduate researchers."
      wide
    >
      <PeopleSections members={members} />
    </PageFrame>
  );
}
