import { config, collection, fields, singleton } from "@keystatic/core";
import {
  aboutImageOptions,
  advisingImageOptions,
  homeImageOptions,
  joinImageOptions,
  researchImageOptions,
} from "@/lib/keystatic-images";

const publicationLinkLabels: Record<string, string> = {
  paper: "Paper",
  code: "Code",
  video: "Video",
  poster: "Poster",
  project: "Project",
  pdf: "PDF",
};

function publicationLinkLabel(value: string) {
  return publicationLinkLabels[value] ?? value;
}

function publicationEntryFields() {
  return {
    title: fields.text({ label: "Title" }),
    authors: fields.text({ label: "Authors" }),
    venue: fields.text({
      label: "Venue tag (short, e.g. HRI 2026)",
    }),
    journal: fields.text({
      label: "Full venue",
    }),
    year: fields.integer({ label: "Year" }),
    sortOrder: fields.integer({
      label: "Sort order within year (higher = listed first)",
      defaultValue: 0,
    }),
    doi: fields.text({ label: "DOI (optional)" }),
    url: fields.url({ label: "Paper URL (optional)" }),
    abstract: fields.text({
      label: "Abstract (optional)",
      multiline: true,
    }),
    citation: fields.text({
      label: "BibTeX citation (optional; auto-generated if empty)",
      multiline: true,
    }),
    links: fields.array(
      fields.object({
        label: fields.select({
          label: "Link type",
          options: [
            { label: "Paper", value: "paper" },
            { label: "Code", value: "code" },
            { label: "Video", value: "video" },
            { label: "Poster", value: "poster" },
            { label: "Project", value: "project" },
            { label: "PDF", value: "pdf" },
          ],
          defaultValue: "paper",
        }),
        url: fields.url({ label: "URL" }),
      }),
      {
        label: "Links",
        itemLabel: (props) =>
          publicationLinkLabel(props.fields.label.value ?? "paper"),
      }
    ),
  };
}

export const showAdminUI =
  process.env.NODE_ENV === "development" ||
  process.env.KEYSTATIC_SHOW_ADMIN === "true";

function getStorage() {
  if (process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND === "github") {
    const owner = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER;
    const name = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO;
    if (owner && name) {
      return {
        kind: "github" as const,
        repo: { owner, name },
      };
    }
  }
  return { kind: "local" as const };
}

export default config({
  storage: getStorage(),
  singletons: {
    site: singleton({
      label: "Site Settings",
      path: "content/site",
      schema: {
        labName: fields.text({ label: "Lab Name" }),
        labSubtitle: fields.text({
          label: "Lab Subtitle (e.g. PEople Aligned Robots Lab)",
        }),
        institution: fields.text({ label: "Institution" }),
        tagline: fields.text({ label: "Tagline", multiline: true }),
        researchSummary: fields.text({
          label: "Research Summary",
          multiline: true,
        }),
        contactEmail: fields.text({ label: "Contact Email" }),
        address: fields.text({ label: "Address", multiline: true }),
        footerText: fields.text({ label: "Footer Text", multiline: true }),
        githubUrl: fields.url({ label: "GitHub URL" }),
        twitterUrl: fields.url({ label: "Twitter / X URL" }),
      },
    }),
    home: singleton({
      label: "Home page",
      path: "content/home",
      format: "yaml",
      schema: {
        carouselImages: fields.array(
          fields.object({
            image: fields.image({
              label: "Image",
              directory: homeImageOptions.directory,
              publicPath: homeImageOptions.publicPath,
            }),
            caption: fields.text({ label: "Caption (optional)" }),
          }),
          {
            label: "Hero carousel images",
            itemLabel: (props) =>
              props.fields.caption.value || "Carousel slide",
          }
        ),
      },
    }),
    about: singleton({
      label: "About the Lab (Home page)",
      path: "content/about",
      format: { contentField: "content" },
      schema: {
        heroImage: fields.image({
          label: "Hero image (optional)",
          directory: aboutImageOptions.directory,
          publicPath: aboutImageOptions.publicPath,
        }),
        content: fields.markdoc({
          label: "About the lab (Markdown)",
          options: { image: aboutImageOptions },
        }),
      },
    }),
    advising: singleton({
      label: "Advising statement",
      path: "content/advising",
      format: { contentField: "content" },
      schema: {
        heroImage: fields.image({
          label: "Hero image (optional)",
          directory: advisingImageOptions.directory,
          publicPath: advisingImageOptions.publicPath,
        }),
        content: fields.markdoc({
          label: "Advising statement (Markdown)",
          options: { image: advisingImageOptions },
        }),
      },
    }),
    research: singleton({
      label: "Research page",
      path: "content/research-page",
      format: "yaml",
      schema: {
        theme: fields.text({
          label: "Overarching theme",
          multiline: true,
        }),
        areas: fields.array(
          fields.object({
            title: fields.text({ label: "Area title" }),
            slug: fields.text({ label: "Slug (stable id)" }),
            description: fields.text({
              label: "Short description",
              multiline: true,
            }),
            image: fields.image({
              label: "Area image",
              directory: researchImageOptions.directory,
              publicPath: researchImageOptions.publicPath,
            }),
            publicationTitles: fields.array(
              fields.text({ label: "Publication title" }),
              {
                label: "Related publications (exact titles from Publications)",
                itemLabel: (props) => props.value || "Publication",
              }
            ),
          }),
          {
            label: "Research areas",
            itemLabel: (props) => props.fields.title.value || "Area",
          }
        ),
      },
    }),
    join: singleton({
      label: "Join the Lab page",
      path: "content/join",
      format: { contentField: "content" },
      schema: {
        heroImage: fields.image({
          label: "Hero image (optional)",
          directory: joinImageOptions.directory,
          publicPath: joinImageOptions.publicPath,
        }),
        content: fields.markdoc({
          label: "Join page (Markdown)",
          options: { image: joinImageOptions },
        }),
      },
    }),
    publications: singleton({
      label: "Publications",
      path: "content/publications",
      format: "yaml",
      schema: {
        publications: fields.array(
          fields.object(publicationEntryFields()),
          {
            label: "Publications",
            itemLabel: (props) => props.fields.title.value || "Publication",
          }
        ),
      },
    }),
  },
  collections: {
    members: collection({
      label: "Members",
      slugField: "name",
      path: "content/members/*",
      format: "yaml",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        role: fields.select({
          label: "Role",
          options: [
            { label: "Principal Investigator", value: "pi" },
            { label: "Ph.D. Student", value: "graduate_student" },
            { label: "Master's Student", value: "masters_student" },
            { label: "Undergraduate", value: "undergraduate" },
            { label: "Postdoctoral Researcher", value: "postdoc" },
            { label: "Alumni", value: "alumni" },
          ],
          defaultValue: "graduate_student",
        }),
        photo: fields.image({
          label: "Photo",
          directory: "public/images/members",
          publicPath: "/images/members",
        }),
        email: fields.text({ label: "Email" }),
        website: fields.url({ label: "Website" }),
        scholarUrl: fields.url({ label: "Google Scholar URL" }),
        bio: fields.text({ label: "Bio (not shown on site)", multiline: true }),
        order: fields.integer({ label: "Sort Order", defaultValue: 0 }),
        active: fields.checkbox({
          label: "Active member",
          defaultValue: true,
        }),
      },
    }),
    news: collection({
      label: "News",
      slugField: "title",
      path: "content/news/*",
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({ label: "Date" }),
        summary: fields.text({ label: "Summary", multiline: true }),
        image: fields.image({
          label: "Cover image",
          directory: "public/images/news",
          publicPath: "/images/news",
        }),
        published: fields.checkbox({
          label: "Published",
          defaultValue: true,
        }),
        body: fields.markdoc({
          label: "Body (Markdown)",
          options: {
            image: {
              directory: "public/images/news",
              publicPath: "/images/news",
            },
          },
        }),
      },
    }),
  },
});
