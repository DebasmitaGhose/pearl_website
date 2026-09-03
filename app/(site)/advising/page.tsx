import Link from "next/link";
import { MarkdownPage } from "@/components/content/markdown-page";
import { getAdvisingContent } from "@/lib/content";

export default async function AdvisingPage() {
  const advising = await getAdvisingContent();

  if (!advising) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-base text-muted-foreground sm:px-6">
        Advising statement content has not been added yet.
      </div>
    );
  }

  return (
    <MarkdownPage
      title="Advising statement"
      description="How I mentor students and what you can expect when joining PEARL."
      heroImage={advising.heroImage}
      content={() => advising.content()}
      footer={
        <p className="text-base text-muted-foreground">
          Interested in joining the lab?{" "}
          <Link
            href="/join"
            className="font-medium text-primary underline decoration-secondary underline-offset-4 hover:text-pearl-blue"
          >
            See open opportunities
          </Link>
          .
        </p>
      }
    />
  );
}
