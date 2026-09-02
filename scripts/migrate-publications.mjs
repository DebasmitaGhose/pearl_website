import { writeFileSync, readFileSync, readdirSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "content/publications");

const venueBySlug = {
  "robots-influencing-humans-reveal-goals": "AURO",
  "on-the-job-robot-adaptation": "RSS Pioneers",
  "robot-led-activities-dementia-care-partners": "Frontiers",
  "open-ended-goal-inference-actions-language": "HRI 2026",
  "replicable-autonomous-ommie-mental-health": "HRI 2026",
  "ive-changed-my-mind-changing-goals": "RA-L",
  "diverse-not-short-language-models": "EMNLP 2025",
  "adapting-robot-actions-human-intentions": "HRI Pioneers",
  "survey-data-curation-contrastive-learning": "Survey",
  "integrating-multimodal-affective-stress": "ICMI 2024",
  "planning-critical-decision-points": "RO-MAN 2024",
  "interactive-policy-shaping-matrix-overlays": "HRI 2023",
  "tailoring-visual-object-representations": "CoRL 2022",
  "in-home-colocated-robotic-coach-exercise": "RO-MAN 2022",
  "active-learning-satellite-segmentation": "WACV 2022",
  "robots-that-teach-and-learn": "HRI 2021",
  "pedestrian-detection-thermal-saliency": "CVPR 2019",
};

function yamlQuote(value) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function parseYamlFile(text) {
  const data = {};
  for (const line of text.split("\n")) {
    const match = line.match(/^([a-zA-Z]+):\s*(.*)$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2].trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1).replace(/\\"/g, '"');
    }
    if (key === "year") {
      data[key] = Number(value);
    } else {
      data[key] = value;
    }
  }
  return data;
}

for (const file of readdirSync(dir)) {
  if (!file.endsWith(".yaml")) continue;
  const slug = file.replace(/\.yaml$/, "");
  const filePath = join(dir, file);
  const parsed = parseYamlFile(readFileSync(filePath, "utf8"));
  const venue = venueBySlug[slug] ?? String(parsed.journal ?? "").slice(0, 24);

  const lines = [
    `title: ${yamlQuote(String(parsed.title ?? ""))}`,
    `authors: ${yamlQuote(String(parsed.authors ?? ""))}`,
    `venue: ${yamlQuote(venue)}`,
    `journal: ${yamlQuote(String(parsed.journal ?? ""))}`,
    `year: ${parsed.year ?? 0}`,
  ];

  writeFileSync(filePath, lines.join("\n") + "\n");
  console.log("updated", file);
}
