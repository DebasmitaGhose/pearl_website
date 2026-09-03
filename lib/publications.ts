const LINK_LABELS: Record<string, string> = {
  paper: "Paper",
  code: "Code",
  video: "Video",
  poster: "Poster",
  project: "Project",
  pdf: "PDF",
};

export type PublicationLink = {
  label: string;
  url: string;
};

export function formatLinkLabel(value: string) {
  return LINK_LABELS[value] ?? value;
}

export function buildPublicationLinks(entry: {
  links?: ReadonlyArray<{ label: string; url: string | null } | null> | null;
  doi?: string;
  url?: string | null;
}): PublicationLink[] {
  const links: PublicationLink[] = [];

  for (const link of entry.links ?? []) {
    if (link?.url) {
      links.push({
        label: formatLinkLabel(link.label),
        url: link.url,
      });
    }
  }

  if (links.length === 0) {
    const paperUrl = paperUrlFromDoi(entry.doi) ?? entry.url ?? undefined;
    if (paperUrl) {
      links.push({ label: "Paper", url: paperUrl });
    }
  }

  return links;
}

function paperUrlFromDoi(doi?: string) {
  if (!doi) return undefined;
  const normalized = doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, "");
  return `https://doi.org/${normalized}`;
}

export function formatPublicationVenue(entry: {
  venue: string;
  journal?: string;
  year: number;
}) {
  const fullVenue = entry.journal?.trim() || entry.venue.trim();
  if (!fullVenue) return String(entry.year);
  if (fullVenue.includes(String(entry.year))) return fullVenue;
  return `${fullVenue}, ${entry.year}`;
}

const PUBLICATION_AWARD_PATTERN =
  /\s*[—–-]\s*((?:Best (?:Paper|Demo) Award)|(?:Best \w+(?:\s+\w+)* Award))\s*$/i;

export function splitPublicationVenueAndAward(entry: {
  venue: string;
  journal?: string;
  year: number;
}) {
  const fullVenue = formatPublicationVenue(entry);
  const match = fullVenue.match(PUBLICATION_AWARD_PATTERN);

  if (!match || match.index === undefined) {
    return { venueText: fullVenue, awardLabel: null as string | null };
  }

  return {
    venueText: fullVenue.slice(0, match.index).trim(),
    awardLabel: match[1].trim(),
  };
}

export function publicationSlug(title: string, index: number) {
  const slug = title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `publication-${index}`;
}

function formatAuthorsForBibtex(authors: string) {
  return authors
    .split(",")
    .map((name) => name.trim().replace(/\*+/g, "").trim())
    .filter(Boolean)
    .join(" and ");
}

function bibtexCiteKey(slug: string) {
  return slug.replace(/-/g, "");
}

function stripAwardFromVenue(venue: string) {
  return venue.replace(PUBLICATION_AWARD_PATTERN, "").trim();
}

function getBibtexEntryType(venue: string): "article" | "inproceedings" | "misc" {
  const lower = venue.toLowerCase();
  if (lower.includes("arxiv") || lower.includes("preprint")) return "misc";
  if (
    lower.includes("letters") ||
    lower.includes("autonomous robots") ||
    lower.includes("frontiers in robotics")
  ) {
    return "article";
  }
  return "inproceedings";
}

function journalNameFromVenue(venue: string) {
  const withoutParens = venue.replace(/\s*\([^)]*\)/g, "").trim();
  return withoutParens.split(",")[0]?.trim() || venue;
}

export function formatPublicationBibtex(entry: {
  slug?: string;
  authors: string;
  title: string;
  venue: string;
  journal?: string;
  year: number;
}) {
  const authors = formatAuthorsForBibtex(entry.authors);
  const key = bibtexCiteKey(entry.slug ?? publicationSlug(entry.title, 0));
  const { venueText } = splitPublicationVenueAndAward(entry);
  const venue = stripAwardFromVenue(venueText);
  const type = getBibtexEntryType(venue);

  const lines = [
    `@${type}{${key},`,
    `  author = {${authors}},`,
    `  title = {${entry.title}},`,
  ];

  if (type === "article") {
    lines.push(`  journal = {${journalNameFromVenue(venue)}},`);
    lines.push(`  year = {${entry.year}},`);
  } else if (type === "inproceedings") {
    lines.push(`  booktitle = {${venue}},`);
    lines.push(`  year = {${entry.year}},`);
  } else {
    lines.push(`  year = {${entry.year}},`);
    lines.push(`  note = {${venue}},`);
  }

  lines.push("}");
  return lines.join("\n");
}

export function formatPublicationCitation(entry: {
  authors: string;
  title: string;
  venue: string;
  journal?: string;
  year: number;
}) {
  return formatPublicationBibtex(entry);
}
