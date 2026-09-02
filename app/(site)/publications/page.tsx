import { PageFrame } from "@/components/layout/page-frame";
import { PublicationList } from "@/components/publications/publication-list";
import { getPublications } from "@/lib/content";

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <PageFrame
      title="Publications"
      description="Peer-reviewed work from PEARL and Dr. Ghose's research group."
      wide
    >
      <PublicationList publications={publications} />
    </PageFrame>
  );
}
