import { readFileSync, writeFileSync } from "fs";

const PUBLICATION_AWARD_PATTERN =
  /\s*[—–-]\s*((?:Best (?:Paper|Demo) Award)|(?:Best \w+(?:\s+\w+)* Award))\s*$/i;

function parseYamlValue(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith('"') || trimmed.startsWith("{")) {
    return JSON.parse(trimmed);
  }
  if (trimmed.startsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  return trimmed;
}

function parsePublications(content) {
  const pubs = [];
  const entries = content.replace(/^\uFEFF/, "").split(/\r?\n  - title: /).slice(1);

  for (const entry of entries) {
    const lines = entry.split(/\r?\n/);
    const pub = {
      title: parseYamlValue(lines[0]),
      links: [],
    };

    let inLinks = false;
    let currentLink = null;

    for (let i = 1; i < lines.length; i += 1) {
      const line = lines[i];
      if (!line.trim()) continue;

      if (line.startsWith("    links:")) {
        inLinks = true;
        continue;
      }

      if (inLinks) {
        const labelMatch = line.match(/^      - label: (.+)$/);
        if (labelMatch) {
          currentLink = { label: parseYamlValue(labelMatch[1]) };
          pub.links.push(currentLink);
          continue;
        }
        const urlMatch = line.match(/^        url: (.+)$/);
        if (urlMatch && currentLink) {
          currentLink.url = parseYamlValue(urlMatch[1]);
        }
        continue;
      }

      const fieldMatch = line.match(/^    (\w+): (.+)$/);
      if (fieldMatch) {
        pub[fieldMatch[1]] = parseYamlValue(fieldMatch[2]);
      }
    }

    pubs.push(pub);
  }

  return pubs;
}

function publicationSlug(title, index) {
  const slug = title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `publication-${index}`;
}

function formatPublicationVenue(entry) {
  const fullVenue = entry.journal?.trim() || entry.venue.trim();
  if (!fullVenue) return String(entry.year);
  if (fullVenue.includes(String(entry.year))) return fullVenue;
  return `${fullVenue}, ${entry.year}`;
}

function splitPublicationVenueAndAward(entry) {
  const fullVenue = formatPublicationVenue(entry);
  const match = fullVenue.match(PUBLICATION_AWARD_PATTERN);
  if (!match || match.index === undefined) {
    return { venueText: fullVenue };
  }
  return { venueText: fullVenue.slice(0, match.index).trim() };
}

function formatAuthorsForBibtex(authors) {
  return authors
    .split(",")
    .map((name) => name.trim().replace(/\*+/g, "").trim())
    .filter(Boolean)
    .join(" and ");
}

function formatPublicationBibtex(entry, slug) {
  const authors = formatAuthorsForBibtex(entry.authors);
  const key = slug.replace(/-/g, "");
  const { venueText } = splitPublicationVenueAndAward(entry);
  const venue = venueText.replace(PUBLICATION_AWARD_PATTERN, "").trim();
  const lower = venue.toLowerCase();

  let type = "inproceedings";
  if (lower.includes("arxiv") || lower.includes("preprint")) type = "misc";
  else if (
    lower.includes("letters") ||
    lower.includes("autonomous robots") ||
    lower.includes("frontiers in robotics")
  ) {
    type = "article";
  }

  const lines = [
    `@${type}{${key},`,
    `  author = {${authors}},`,
    `  title = {${entry.title}},`,
  ];

  if (type === "article") {
    const journal = venue.replace(/\s*\([^)]*\)/g, "").split(",")[0].trim();
    lines.push(`  journal = {${journal}},`);
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

function yamlQuote(text) {
  return JSON.stringify(text);
}

function renderLinks(links) {
  if (!links.length) return "    links: []";
  const lines = ["    links:"];
  for (const link of links) {
    lines.push(`      - label: ${link.label}`);
    lines.push(`        url: ${link.url}`);
  }
  return lines.join("\n");
}

const yamlPath = "content/publications.yaml";
const raw = readFileSync(yamlPath, "utf8");
const publications = parsePublications(raw);

if (publications.length === 0) {
  throw new Error("No publications parsed — aborting to avoid data loss.");
}

const rebuilt = ["publications:"];
for (const [index, pub] of publications.entries()) {
  const slug = publicationSlug(pub.title, index);
  const bibtex = formatPublicationBibtex(pub, slug);

  rebuilt.push(`  - title: ${yamlQuote(pub.title)}`);
  rebuilt.push(`    authors: ${yamlQuote(pub.authors)}`);
  rebuilt.push(`    venue: ${yamlQuote(pub.venue)}`);
  rebuilt.push(`    journal: ${yamlQuote(pub.journal)}`);
  rebuilt.push(`    year: ${pub.year}`);
  rebuilt.push(`    sortOrder: ${pub.sortOrder}`);
  if (pub.abstract) {
    rebuilt.push(`    abstract: ${yamlQuote(pub.abstract)}`);
  }
  rebuilt.push("    citation: |");
  for (const line of bibtex.split("\n")) {
    rebuilt.push(`      ${line}`);
  }
  rebuilt.push(renderLinks(pub.links));
}

writeFileSync(yamlPath, `${rebuilt.join("\n")}\n`);
console.log(`Updated BibTeX citations for ${publications.length} publications.`);
