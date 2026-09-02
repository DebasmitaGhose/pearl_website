import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "content/publications");
mkdirSync(dir, { recursive: true });

function yamlQuote(value) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

const publications = [
  {
    slug: "robots-influencing-humans-reveal-goals",
    title: "Robots Influencing Humans to Reveal their Goals during Collaboration and Competition",
    authors: "Debasmita Ghose*, Oz Gitelson*, Michal Lewkowicz, Jake Brawer, Alessandro Roncone, Marynel Vazquez, Brian Scassellati",
    journal: "Autonomous Robots (AURO), 2026",
    year: 2026,
    abstract: "We propose a unified strategy for fast goal inference in human–robot interaction. The core idea is to drive the human toward Critical Decision Points (CDPs)—states where competing human strategies prescribe different next actions and thus maximally reveal the goal.",
    tags: ["human-robot interaction", "goal inference"],
  },
  {
    slug: "on-the-job-robot-adaptation",
    title: "On-the-Job Robot Adaptation to Human Goals",
    authors: "Debasmita Ghose",
    journal: "Robotics: Science and Systems (RSS) Pioneers Workshop, Sydney, Australia, 2026",
    year: 2026,
    tags: ["human-robot interaction"],
  },
  {
    slug: "robot-led-activities-dementia-care-partners",
    title: "Exploring Robot-Led Activities between People Living with Dementia and Family Care Partners",
    authors: "Jirachaya Fern Limprayoon, Debasmita Ghose, Kayla Matheus, Paula V. Enriquez, Michal A. Lewkowicz, Moon Hwan Kim, Austin Narcomey, Natnaree Proud Ua-Arak, Andy Cheng, Chayan Sarkar, Joan K. Monin, Brian Scassellati",
    journal: "Frontiers in Robotics and AI, 2026",
    year: 2026,
    abstract: "This paper investigates the adaptation of a socially assistive robot, Ommie, to address the needs of people living with dementia and their care partners through shared breathing and singing activities.",
    tags: ["social robotics", "healthcare"],
  },
  {
    slug: "open-ended-goal-inference-actions-language",
    title: "Open-Ended Goal Inference through Actions and Language for Human-Robot Collaboration",
    authors: "Debasmita Ghose, Oz Gitelson, Marynel Vazquez, Brian Scassellati",
    journal: "ACM/IEEE International Conference on Human-Robot Interaction (HRI 2026), Edinburgh, Scotland (Oral)",
    year: 2026,
    abstract: "We present BALI (Bidirectional Action–Language Inference) for goal prediction, integrating natural language preferences with observed human actions in a receding-horizon planning tree.",
    tags: ["human-robot collaboration", "language"],
  },
  {
    slug: "replicable-autonomous-ommie-mental-health",
    title: "A Replicable, Autonomous System for In-the-Wild Mental Health Applications with the Ommie Robot",
    authors: "Kayla Matheus, Debasmita Ghose, Jirachaya Fern Limprayoon, Michal Lewkowicz, Brian Scassellati",
    journal: "HRI 2026 Interactivity Track, Edinburgh, Scotland — Best Demo Award",
    year: 2026,
    tags: ["social robotics", "mental health"],
  },
  {
    slug: "ive-changed-my-mind-changing-goals",
    title: "I've Changed My Mind: Robots Adapting to Changing Human Goals during Collaboration",
    authors: "Debasmita Ghose*, Oz Gitelson*, Ryan Jin, Grace Abawe, Marynel Vazquez, Brian Scassellati",
    journal: "IEEE Robotics and Automation Letters (RA-L), 2025 (IROS 2026)",
    year: 2025,
    abstract: "We propose a method for detecting goal changes by tracking multiple candidate action sequences and verifying their plausibility against a policy bank.",
    tags: ["human-robot collaboration", "goal inference"],
  },
  {
    slug: "diverse-not-short-language-models",
    title: "Diverse, not Short: A Length-Controlled Data Selection Strategy for Improving Response Diversity of Language Models",
    authors: "Vijeta Deshpande, Debasmita Ghose, John D. Patterson, Roger Beaty, Anna Rumshisky",
    journal: "EMNLP 2025, Suzhou, China (Main Conference, Poster)",
    year: 2025,
    tags: ["language models", "NLP"],
  },
  {
    slug: "adapting-robot-actions-human-intentions",
    title: "Adapting Robot Actions to Human Intentions in Dynamic Shared Environments",
    authors: "Debasmita Ghose",
    journal: "ACM/IEEE HRI Pioneers Workshop, Melbourne, Australia, 2025",
    year: 2025,
    tags: ["human-robot interaction"],
  },
  {
    slug: "survey-data-curation-contrastive-learning",
    title: "A Survey on Data Curation for Visual Contrastive Learning: Why Crafting Effective Positive and Negative Pairs Matters",
    authors: "Shasvat Desai, Debasmita Ghose, Deep Chakraborty",
    journal: "Survey, 2025",
    year: 2025,
    tags: ["machine learning", "contrastive learning"],
  },
  {
    slug: "integrating-multimodal-affective-stress",
    title: "Integrating Multimodal Affective Signals for Stress Detection from Audio-Visual Data",
    authors: "Debasmita Ghose*, Oz Gitelson*, Brian Scassellati",
    journal: "ACM International Conference on Multimodal Interaction (ICMI 2024), San Jose, Costa Rica",
    year: 2024,
    abstract: "We integrate stress indicators from facial expressions, vocal prosody, textual sentiment, and physical fidgeting to achieve an F1 score of 0.85 for binary stress detection.",
    tags: ["affective computing", "multimodal"],
  },
  {
    slug: "planning-critical-decision-points",
    title: "Planning with Critical Decision Points: Robots that Influence Humans to Infer Their Strategy",
    authors: "Debasmita Ghose*, Michal Lewkowicz*, David Dong, Andy Cheng, Tran Doan, Emma Adams, Marynel Vazquez, Brian Scassellati",
    journal: "IEEE RO-MAN 2024, Pasadena, California",
    year: 2024,
    abstract: "We identify Critical Decision Points where human actions are especially indicative of strategy, and use Receding Horizon Planning in a hide-and-seek game.",
    tags: ["human-robot interaction", "planning"],
  },
  {
    slug: "interactive-policy-shaping-matrix-overlays",
    title: "Interactive Policy Shaping for Human-Robot Collaboration with Transparent Matrix Overlays",
    authors: "Jake Brawer, Debasmita Ghose, Kate Candon, Meiying Qin, Alessandro Roncone, Marynel Vazquez, Brian Scassellati",
    journal: "HRI 2023, Stockholm, Sweden (Oral) — Best Paper Award",
    year: 2023,
    abstract: "Transparent Matrix Overlays modify learned policies at execution time via symbolic rules that humans can alter through verbal commands.",
    tags: ["human-robot collaboration", "policy shaping"],
  },
  {
    slug: "tailoring-visual-object-representations",
    title: "Tailoring Visual Object Representations to Human Requirements: A Case Study with a Recycling Robot",
    authors: "Debasmita Ghose, Michal Lewkowicz, Kaleb Gezahegn, Juilan Lee*, Timothy Adamson*, Marynel Vazquez, Brian Scassellati",
    journal: "Conference on Robot Learning (CoRL 2022), Auckland, New Zealand",
    year: 2022,
    tags: ["robot learning", "perception"],
  },
  {
    slug: "in-home-colocated-robotic-coach-exercise",
    title: "The Impact of an In-Home Co-Located Robotic Coach in Helping People Make Fewer Exercise Mistakes",
    authors: "Nicole Salomons*, Tom Wallenstein*, Debasmita Ghose*, Brian Scassellati",
    journal: "IEEE RO-MAN 2022, Naples, Italy (Oral)",
    year: 2022,
    tags: ["social robotics", "health"],
  },
  {
    slug: "active-learning-satellite-segmentation",
    title: "Active Learning for Improved Semi-Supervised Semantic Segmentation in Satellite Images",
    authors: "Shasvat Desai*, Debasmita Ghose*",
    journal: "IEEE/CVF WACV 2022, Waikoloa, HI (Oral)",
    year: 2022,
    tags: ["computer vision", "active learning"],
  },
  {
    slug: "robots-that-teach-and-learn",
    title: "Why We Should Build Robots that both Teach and Learn",
    authors: "Timothy Adamson*, Debasmita Ghose*, Shannon Yasuda, Lucas Shepard, Michal Lewkowicz, Joyce Duan, Brian Scassellati",
    journal: "HRI 2021, Boulder, CO (Oral)",
    year: 2021,
    tags: ["human-robot interaction", "education"],
  },
  {
    slug: "pedestrian-detection-thermal-saliency",
    title: "Pedestrian Detection In Thermal Images Using Saliency Maps",
    authors: "Debasmita Ghose*, Shasvat Desai*, Sneha Bhattacharya*, Deep Chakraborty*, Madalina Fiterau, Tauhidur Rahman",
    journal: "CVPR 2019 Workshop on Perception Beyond the Visible Spectrum (Oral - Spotlight)",
    year: 2019,
    tags: ["computer vision", "pedestrian detection"],
  },
];

for (const pub of publications) {
  const lines = [
    `title: ${yamlQuote(pub.title)}`,
    `authors: ${yamlQuote(pub.authors)}`,
    `journal: ${yamlQuote(pub.journal)}`,
    `year: ${pub.year}`,
  ];
  if (pub.abstract) lines.push(`abstract: ${yamlQuote(pub.abstract)}`);
  if (pub.tags?.length) {
    lines.push("tags:");
    pub.tags.forEach((t) => lines.push(`  - ${t}`));
  }
  writeFileSync(join(dir, `${pub.slug}.yaml`), lines.join("\n") + "\n");
}

console.log(`Wrote ${publications.length} publications`);
