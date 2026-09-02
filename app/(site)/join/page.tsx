import { MarkdownPage } from "@/components/content/markdown-page";
import { getJoinContent, getSiteSettings } from "@/lib/content";

export default async function JoinPage() {
  const site = await getSiteSettings();
  const join = await getJoinContent();

  if (!join) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-muted-foreground sm:px-6">
        Join page content has not been added yet.
      </div>
    );
  }

  return (
    <MarkdownPage
      title="Join the lab"
      heroImage={join.heroImage}
      content={() => join.content()}
      footer={
        <p className="text-sm text-muted-foreground">
          Questions?{" "}
          <a
            href={`mailto:${site.contactEmail}`}
            className="font-medium text-primary transition-colors hover:underline"
          >
            {site.contactEmail}
          </a>
        </p>
      }
    />
  );
}
