import { reader } from "@/lib/keystatic";
import {
  buildPublicationLinks,
  publicationSlug,
} from "@/lib/publications";
import { renderMarkdoc } from "@/lib/markdoc";
import { defaultSiteSettings } from "@/lib/site.config";

export async function getSiteSettings() {
  const site = await reader.singletons.site.read();
  return {
    labName: site?.labName ?? defaultSiteSettings.labName,
    labSubtitle: site?.labSubtitle ?? defaultSiteSettings.labSubtitle,
    institution: site?.institution ?? defaultSiteSettings.institution,
    tagline: site?.tagline ?? defaultSiteSettings.tagline,
    researchSummary:
      site?.researchSummary ?? defaultSiteSettings.researchSummary,
    contactEmail: site?.contactEmail ?? defaultSiteSettings.contactEmail,
    address: site?.address ?? defaultSiteSettings.address,
    footerText: site?.footerText ?? defaultSiteSettings.footerText,
    githubUrl: site?.githubUrl ?? defaultSiteSettings.githubUrl,
    twitterUrl: site?.twitterUrl ?? defaultSiteSettings.twitterUrl,
  };
}

export async function getHomeCarousel() {
  const home = await reader.singletons.home.read();
  const slides =
    home?.carouselImages?.map((slide) => ({
      src: slide.image ?? "",
      caption: slide.caption ?? "",
    })) ?? [];
  return slides.filter((slide) => slide.src);
}

export async function getAboutContent() {
  return reader.singletons.about.read();
}

export async function getResearchContent() {
  const research = await reader.singletons.research.read();
  const publications = await getPublications();
  const byTitle = new Map(
    publications.map((pub) => [pub.title.trim().toLowerCase(), pub]),
  );

  const areas =
    research?.areas?.map((area) => {
      const matched = (area.publicationTitles ?? [])
        .map((title) => byTitle.get(title.trim().toLowerCase()))
        .filter((pub): pub is (typeof publications)[number] => Boolean(pub));

      return {
        title: area.title ?? "",
        slug: area.slug ?? "",
        description: area.description ?? "",
        image: area.image ?? null,
        publications: matched.map((pub) => ({
          slug: pub.slug,
          title: pub.title,
          authors: pub.authors,
          venue: pub.venue,
          journal: pub.journal,
          year: pub.year,
          href: pub.links[0]?.url ?? `/publications#${pub.slug}`,
        })),
      };
    }) ?? [];

  return {
    theme: research?.theme ?? "",
    areas,
  };
}

export async function getJoinContent() {
  return reader.singletons.join.read();
}

export async function getActiveMembers() {
  const members = await reader.collections.members.all();
  return members
    .filter((member) => member.entry.active)
    .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0))
    .map((member) => ({
      slug: member.slug,
      name: member.entry.name,
      role: member.entry.role,
      website: member.entry.website ?? undefined,
      scholarUrl: member.entry.scholarUrl ?? undefined,
      photo: member.entry.photo ?? undefined,
      order: member.entry.order ?? 0,
      active: member.entry.active,
    }));
}

export async function getPublications() {
  const data = await reader.singletons.publications.read();
  const publications = data?.publications ?? [];

  return publications
    .map((pub, index) => ({
      slug: publicationSlug(pub.title ?? "", index),
      title: pub.title ?? "",
      authors: pub.authors ?? "",
      venue: pub.venue ?? "",
      journal: pub.journal ?? "",
      year: pub.year ?? 0,
      sortOrder: pub.sortOrder ?? 0,
      abstract: pub.abstract ?? "",
      citation: pub.citation ?? "",
      links: buildPublicationLinks(pub),
    }))
    .sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return b.sortOrder - a.sortOrder;
    });
}

export async function getNewsEntries(limit?: number) {
  const news = await reader.collections.news.all();
  const sorted = news
    .filter((item) => item.entry.published !== false)
    .sort((a, b) => {
      const dateA = a.entry.date ?? "";
      const dateB = b.entry.date ?? "";
      return dateB.localeCompare(dateA);
    });
  const visible = limit ? sorted.slice(0, limit) : sorted;

  return Promise.all(
    visible.map(async (item) => {
      const post = await reader.collections.news.read(item.slug);
      const body = post ? await renderMarkdoc(() => post.body()) : null;
      return {
        slug: item.slug,
        title: item.entry.title,
        date: item.entry.date,
        summary: item.entry.summary,
        image: item.entry.image ?? undefined,
        body,
      };
    })
  );
}

export async function getNewsItems() {
  const news = await reader.collections.news.all();
  return news
    .filter((item) => item.entry.published !== false)
    .sort((a, b) => {
      const dateA = a.entry.date ?? "";
      const dateB = b.entry.date ?? "";
      return dateB.localeCompare(dateA);
    })
    .map((item) => ({
      slug: item.slug,
      title: item.entry.title,
      date: item.entry.date,
      summary: item.entry.summary,
      image: item.entry.image ?? undefined,
    }));
}
