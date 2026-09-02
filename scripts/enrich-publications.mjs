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

// Order in this array = newest first (used for sortOrder within year)
const slugOrder = [
  "robots-influencing-humans-reveal-goals",
  "on-the-job-robot-adaptation",
  "robot-led-activities-dementia-care-partners",
  "open-ended-goal-inference-actions-language",
  "replicable-autonomous-ommie-mental-health",
  "ive-changed-my-mind-changing-goals",
  "diverse-not-short-language-models",
  "adapting-robot-actions-human-intentions",
  "survey-data-curation-contrastive-learning",
  "integrating-multimodal-affective-stress",
  "planning-critical-decision-points",
  "interactive-policy-shaping-matrix-overlays",
  "tailoring-visual-object-representations",
  "in-home-colocated-robotic-coach-exercise",
  "active-learning-satellite-segmentation",
  "robots-that-teach-and-learn",
  "pedestrian-detection-thermal-saliency",
];

const linksBySlug = {
  "on-the-job-robot-adaptation": [
    {
      label: "paper",
      url: "https://www.researchgate.net/profile/Debasmita-Ghose/publication/406238549_On-the-Job_Robot_Adaptation_to_Human_Goals/links/6a2498a9ab27545911091e96/On-the-Job-Robot-Adaptation-to-Human-Goals.pdf",
    },
  ],
  "robot-led-activities-dementia-care-partners": [
    {
      label: "paper",
      url: "https://www.frontiersin.org/journals/robotics-and-ai/articles/10.3389/frobt.2026.1772079/abstract",
    },
  ],
  "open-ended-goal-inference-actions-language": [
    {
      label: "paper",
      url: "https://scazlab.yale.edu/sites/default/files/files/HRI_2026___BALI.pdf",
    },
  ],
  "replicable-autonomous-ommie-mental-health": [
    {
      label: "paper",
      url: "https://drive.google.com/file/d/1AqXdJhaLXQVho50AsVMS9qyitYT7pauA/view?usp=sharing",
    },
    {
      label: "video",
      url: "https://drive.google.com/file/d/1k--UVi2cg_V5o7Ri_AWBeNTlnFzC-Krc/view?usp=sharing",
    },
  ],
  "ive-changed-my-mind-changing-goals": [
    {
      label: "paper",
      url: "https://scazlab.yale.edu/sites/default/files/files/RA_L___Adaptive_CDP%20(9).pdf",
    },
  ],
  "diverse-not-short-language-models": [
    { label: "paper", url: "https://arxiv.org/pdf/2502.08134" },
  ],
  "adapting-robot-actions-human-intentions": [
    {
      label: "video",
      url: "https://www.linkedin.com/posts/human-robot-interaction-pioneers_hripioneers2025-activity-7296208123474673665-3ROi",
    },
  ],
  "integrating-multimodal-affective-stress": [
    {
      label: "paper",
      url: "https://scazlab.yale.edu/sites/default/files/files/ICMI_2024___Stress_Detection%20(13).pdf",
    },
    {
      label: "project",
      url: "https://sites.google.com/view/stress-detection-icmi-24/home",
    },
  ],
  "planning-critical-decision-points": [
    {
      label: "paper",
      url: "https://drive.google.com/file/d/1RX3bb-iqtAhuo6XdZDRYMggA75N1TVoE/view?usp=drive_link",
    },
  ],
  "interactive-policy-shaping-matrix-overlays": [
    {
      label: "paper",
      url: "https://dl.acm.org/doi/pdf/10.1145/3434073.3444647",
    },
  ],
  "tailoring-visual-object-representations": [
    {
      label: "project",
      url: "https://sites.google.com/view/corl22-contrastive-recycling/home",
    },
  ],
  "in-home-colocated-robotic-coach-exercise": [
    {
      label: "paper",
      url: "https://scazlab.yale.edu/sites/default/files/files/RO_MAN_2022%20coaching.pdf",
    },
  ],
  "active-learning-satellite-segmentation": [
    { label: "paper", url: "https://arxiv.org/abs/2110.07782" },
    {
      label: "project",
      url: "https://sites.google.com/view/al-s4gan-semi-sup-sseg/home",
    },
  ],
  "robots-that-teach-and-learn": [
    {
      label: "paper",
      url: "https://drive.google.com/file/d/1PaNi_FyYzQ2sHveb5xcp3uq0MyJc4ABM/view?usp=sharing",
    },
  ],
  "pedestrian-detection-thermal-saliency": [
    {
      label: "paper",
      url: "https://openaccess.thecvf.com/content_CVPRW_2019/papers/PBVS/Ghose_Pedestrian_Detection_in_Thermal_Images_Using_Saliency_Maps_CVPRW_2019_paper.pdf",
    },
    {
      label: "project",
      url: "https://information-fusion-lab-umass.github.io/Salient-Pedestrian-Detection/",
    },
    {
      label: "code",
      url: "https://github.com/Information-Fusion-Lab-Umass/Multimodal_Influenza_Detection/tree/fppi_LAMR/faster-rcnn.pytorch",
    },
  ],
};

const sortOrderBySlug = Object.fromEntries(
  slugOrder.map((slug, index) => [slug, slugOrder.length - index])
);

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

function writeLinks(links) {
  if (!links?.length) return [];
  return [
    "links:",
    ...links.flatMap((link) => [
      `  - label: ${link.label}`,
      `    url: ${link.url}`,
    ]),
  ];
}

for (const file of readdirSync(dir)) {
  if (!file.endsWith(".yaml")) continue;
  const slug = file.replace(/\.yaml$/, "");
  const filePath = join(dir, file);
  const parsed = parseYamlFile(readFileSync(filePath, "utf8"));
  const venue = venueBySlug[slug] ?? String(parsed.journal ?? "").slice(0, 24);
  const links = linksBySlug[slug] ?? [];
  const sortOrder = sortOrderBySlug[slug] ?? 0;

  const lines = [
    `title: ${yamlQuote(String(parsed.title ?? ""))}`,
    `authors: ${yamlQuote(String(parsed.authors ?? ""))}`,
    `venue: ${yamlQuote(venue)}`,
    `journal: ${yamlQuote(String(parsed.journal ?? ""))}`,
    `year: ${parsed.year ?? 0}`,
    `sortOrder: ${sortOrder}`,
    ...writeLinks(links),
  ];

  writeFileSync(filePath, lines.join("\n") + "\n");
  console.log("updated", file, links.length ? `${links.length} links` : "no links");
}
