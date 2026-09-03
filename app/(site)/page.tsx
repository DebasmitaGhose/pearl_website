import Link from "next/link";
import { HomeCarousel } from "@/components/home/home-carousel";
import { NewsTimeline } from "@/components/news/news-timeline";
import { ButtonLink } from "@/components/ui/button-link";
import {
  getAboutContent,
  getHomeCarousel,
  getSiteSettings,
} from "@/lib/content";
import { renderMarkdoc } from "@/lib/markdoc";

export default async function HomePage() {
  const site = await getSiteSettings();
  const about = await getAboutContent();
  const carouselSlides = await getHomeCarousel();
  const aboutContent = about
    ? await renderMarkdoc(() => about.content())
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="mt-6 rounded-2xl border border-primary/15 bg-gradient-to-br from-secondary via-secondary/80 to-accent px-6 py-6 sm:px-8 sm:py-7">
        <p className="font-display text-lg font-semibold leading-snug text-primary sm:text-xl">
          We are hiring Ph.D., master&apos;s, and undergraduate students to join
          the lab.{" "}
          <Link
            href="/join"
            className="underline decoration-primary/35 underline-offset-4 transition-colors hover:decoration-primary"
          >
            Learn more and apply
          </Link>
          .
        </p>
      </section>

      <section className="py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-10">
          <div className="space-y-3 order-2 lg:order-1">
            <h1 className="font-display text-2xl font-semibold leading-tight text-primary sm:text-3xl">
              {site.labSubtitle}
            </h1>
            <p className="text-muted-foreground">{site.tagline}</p>
          </div>
          <HomeCarousel slides={carouselSlides} className="order-1 lg:order-2" />
        </div>
      </section>

      <section className="border-t border-primary/10 py-8">
        <h2 className="font-display text-xl font-semibold text-primary">About the lab</h2>
        <div className="mt-4 max-w-4xl">
          {aboutContent ? (
            <div className="prose prose-neutral max-w-none">
              {aboutContent}
            </div>
          ) : (
            <p className="text-muted-foreground">{site.researchSummary}</p>
          )}
        </div>
      </section>

      <section className="border-t border-primary/10 py-8">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-xl font-semibold text-primary">Latest news</h2>
          <ButtonLink href="/news" variant="ghost" size="sm">
            All news
          </ButtonLink>
        </div>
        <NewsTimeline limit={5} />
      </section>
    </div>
  );
}
