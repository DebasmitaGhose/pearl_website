import Link from "next/link";
import { HomeCarousel } from "@/components/home/home-carousel";
import { NewsTimeline } from "@/components/news/news-timeline";
import { ButtonLink } from "@/components/ui/button-link";
import { getHomeCarousel, getSiteSettings } from "@/lib/content";

export default async function HomePage() {
  const site = await getSiteSettings();
  const carouselSlides = await getHomeCarousel();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-primary/15 bg-gradient-to-br from-secondary via-secondary/80 to-accent px-4 py-3.5 sm:gap-6 sm:px-7 sm:py-5">
        <p className="min-w-0 text-sm font-semibold leading-snug text-primary sm:text-lg">
          We are hiring Ph.D., master&apos;s, and undergraduate students.
        </p>
        <ButtonLink
          href="/join"
          size="lg"
          className="shrink-0 px-3 text-xs sm:px-4 sm:text-sm"
        >
          Join the lab
        </ButtonLink>
      </section>

      <section className="py-5 sm:py-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:items-stretch lg:gap-8">
          <div className="order-2 space-y-4 lg:order-1">
            <h1 className="font-display text-2xl font-semibold leading-tight text-primary sm:text-3xl">
              {site.labSubtitle}
            </h1>
            <p className="text-lg font-medium leading-snug text-foreground sm:text-xl">
              Making robots ordinary in people&apos;s everyday lives.
            </p>
            <div className="max-w-xl space-y-3 text-base leading-relaxed text-muted-foreground">
              <p>
                The lab&apos;s long-term goal is to enable robots to work with
                people in everyday settings—noticing what someone is trying to
                do, adapting as goals change, and helping without constant
                instruction.
              </p>
              <p>
                PEARL studies how generalist robots can understand, model, and
                adapt to human behavior in natural environments.
              </p>
              <p>
                Day to day, we build computational methods for robots that adapt
                to people, prototype interactive systems for real environments,
                and run user studies to understand those interactions and
                validate our approaches.
              </p>
              <p>
                <Link
                  href="/research"
                  className="font-medium text-primary underline decoration-secondary underline-offset-4 hover:text-pearl-blue"
                >
                  See our research
                </Link>
                .
              </p>
            </div>
          </div>
          <HomeCarousel
            slides={carouselSlides}
            className="order-1 lg:order-2 lg:h-full"
          />
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
