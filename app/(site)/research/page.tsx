import { PageFrame } from "@/components/layout/page-frame";
import { ResearchAreaTile } from "@/components/research/research-area-tile";
import { getResearchContent } from "@/lib/content";

export default async function ResearchPage() {
  const research = await getResearchContent();

  if (!research.theme && research.areas.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-muted-foreground sm:px-6">
        Research page content has not been added yet.
      </div>
    );
  }

  return (
    <PageFrame title="Research" description={research.theme || undefined} wide>
      <div className="grid items-stretch gap-6 sm:grid-cols-2">
        {research.areas.map((area) => (
          <ResearchAreaTile key={area.slug || area.title} area={area} />
        ))}
      </div>
    </PageFrame>
  );
}
