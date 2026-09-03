import { readFileSync } from "fs";
import { parse } from "yaml";

const data = parse(readFileSync("content/publications.yaml", "utf8"));

function formatCitation(entry) {
  const full = (entry.journal || entry.venue || "").trim();
  const venue = full.includes(String(entry.year))
    ? full
    : full
      ? `${full}, ${entry.year}`
      : String(entry.year);
  return `${entry.authors}. "${entry.title}." ${venue}.`;
}

for (const pub of data.publications) {
  console.log(formatCitation(pub));
  console.log("---");
}
