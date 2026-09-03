import Image from "next/image";
import Link from "next/link";
import { JoinOpportunityCards } from "@/components/join/join-opportunity-cards";
import { JoinResearchOverview } from "@/components/join/join-research-overview";
import { PageFrame } from "@/components/layout/page-frame";
import { getJoinContent, getSiteSettings } from "@/lib/content";

export default async function JoinPage() {
  const site = await getSiteSettings();
  const join = await getJoinContent();

  return (
    <PageFrame
      title="Join the lab"
      description="PEARL welcomes motivated researchers who want to build robots that genuinely align with people."
      afterDescription={
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          If you&apos;d like to learn more about my approach to mentoring and
          advising students, you can{" "}
          <Link
            href="/advising"
            className="font-medium text-primary underline decoration-secondary underline-offset-4 hover:text-pearl-blue"
          >
            read my advising statement
          </Link>
          .
        </p>
      }
    >
      {join?.heroImage && (
        <div className="relative mb-8 aspect-[16/10] border border-border bg-muted">
          <Image
            src={join.heroImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
          />
        </div>
      )}

      <JoinResearchOverview />

      <JoinOpportunityCards />

      <div className="mt-10 border-t border-border pt-6">
        <p className="text-base text-muted-foreground">
          Questions?{" "}
          <a
            href={`mailto:${site.contactEmail}`}
            className="font-medium text-primary transition-colors hover:underline"
          >
            {site.contactEmail}
          </a>
        </p>
      </div>
    </PageFrame>
  );
}
