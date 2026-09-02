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
