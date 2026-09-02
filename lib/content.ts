import { reader } from "@/lib/keystatic";
import { buildPublicationLinks } from "@/lib/publications";
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
  return reader.singletons.research.read();
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
  const publications = await reader.collections.publications.all();
  return publications
    .map((pub) => ({
      slug: pub.slug,
      title: pub.entry.title,
      authors: pub.entry.authors,
      venue: pub.entry.venue ?? pub.entry.journal ?? "",
      year: pub.entry.year ?? 0,
      sortOrder: pub.entry.sortOrder ?? 0,
      links: buildPublicationLinks(pub.entry),
    }))
    .sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return b.sortOrder - a.sortOrder;
    });
}

export async function getNewsEntries(limit?: number) {
  const news = await reader.collections.news.all();
  const sorted = news.sort((a, b) => {
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
