import { MarkdownPage } from "@/components/content/markdown-page";
import { getResearchContent } from "@/lib/content";

export default async function ResearchPage() {
  const research = await getResearchContent();

  if (!research) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-muted-foreground sm:px-6">
        Research page content has not been added yet.
      </div>
    );
  }

  return (
    <MarkdownPage
      title="Research"
      heroImage={research.heroImage}
      content={() => research.content()}
    />
  );
}
