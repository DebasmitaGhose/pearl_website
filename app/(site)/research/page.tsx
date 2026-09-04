import { PageFrame } from "@/components/layout/page-frame";
import { ResearchAreaTile } from "@/components/research/research-area-tile";
import { getResearchContent } from "@/lib/content";

export default async function ResearchPage() {
  const research = await getResearchContent();

  if (!research.theme && research.areas.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-sm text-muted-foreground sm:px-6">
        Research page content has not been added yet.
      </div>
    );
  }

  const pairs: (typeof research.areas)[] = [];
  for (let i = 0; i < research.areas.length; i += 2) {
    pairs.push(research.areas.slice(i, i + 2));
  }

  return (
    <PageFrame title="Research" description={research.theme || undefined} wide>
      <div className="flex flex-col gap-6">
        {pairs.map((pair) => (
          <div
            key={pair.map((area) => area.slug || area.title).join("-")}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0"
          >
            {pair.map((area) => (
              <ResearchAreaTile key={area.slug || area.title} area={area} />
            ))}
          </div>
        ))}
      </div>
    </PageFrame>
  );
}
