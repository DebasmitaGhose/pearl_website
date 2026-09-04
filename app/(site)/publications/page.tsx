import { PageFrame } from "@/components/layout/page-frame";
import { PublicationList } from "@/components/publications/publication-list";
import { getPublications } from "@/lib/content";

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <PageFrame
      title="Publications"
      description="We publish our work in leading journals and conferences in human–robot interaction, robotics, machine learning, and human–computer interaction."
      wide
    >
      <PublicationList publications={publications} />
    </PageFrame>
  );
}
