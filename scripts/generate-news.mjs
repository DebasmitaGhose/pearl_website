import { writeFileSync } from "fs";
import { join } from "path";

const newsDir = join(process.cwd(), "content/news");

function yamlQuote(value) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

const items = [
  { date: "2026-07-15", slug: "invited-talk-university-of-melbourne", title: "Invited talk at the University of Melbourne", summary: "Gave an invited talk hosted by Wafa Johal at the University of Melbourne.", body: "Gave an invited talk at the University of Melbourne hosted by Wafa Johal!" },
  { date: "2026-04-10", slug: "rss-pioneer-2026", title: "Selected as RSS Pioneer 2026", summary: "Honored to be selected as an RSS Pioneer—one of 30 early-career robotics researchers worldwide.", body: "Honored to have been selected as an RSS Pioneer (one of 30 top early-career robotics researchers). Will present my work at RSS 2026 in Sydney, Australia." },
  { date: "2026-04-20", slug: "hri-2027-publications-co-chair", title: "Publications Co-Chair for HRI 2027", summary: "Serving as Publications Co-Chair for the ACM/IEEE International Conference on Human-Robot Interaction 2027.", body: "Serving as Publications Co-Chair for HRI 2027." },
  { date: "2026-03-05", slug: "frontiers-dementia-care-partners", title: "Frontiers paper on robot-led dementia activities", summary: "Exploring Robot-Led Activities between People Living with Dementia and Family Care Partners accepted to Frontiers in Robotics and AI.", body: "Exploring Robot-Led Activities between People Living with Dementia and Family Care Partners (led by Fern Limprayoon) accepted to Frontiers in Robotics and AI." },
  { date: "2026-02-01", slug: "thesis-defense", title: "Thesis defense: Robots Adapting to People", summary: "Defended Ph.D. thesis titled Robots Adapting to People without Becoming a Nuisance.", body: "Defended my thesis titled **Robots Adapting to People without Becoming a Nuisance**." },
  { date: "2026-01-10", slug: "hri-2026-best-demo-ommie", title: "Best Demo Award at HRI 2026", summary: "Ommie mental health deployment system won Best Demo at HRI 2026 Interactivity track.", body: "A Replicable, Autonomous System for In-the-Wild Mental Health Applications with the Ommie Robot (led by Kayla Matheus) accepted to HRI 2026 Demo/Interactivity track and won the **Best Demo Award**!" },
  { date: "2025-12-01", slug: "hri-2026-goal-inference-paper", title: "HRI 2026 paper on open-ended goal inference", summary: "Open-Ended Goal Inference through Actions and Language accepted to HRI 2026 technical track.", body: "Open-Ended Goal Inference through Actions and Language for Human-Robot Collaboration accepted to HRI 2026 (Technical track)." },
  { date: "2025-11-15", slug: "hri-pioneers-program-chair-2026", title: "Program Chair for HRI Pioneers Workshop 2026", summary: "Serving as Program Chair for the HRI Pioneers Workshop 2026 and Area Chair for Late Breaking Reports.", body: "Serving as Program Chair for the HRI Pioneers Workshop, 2026 and Area Chair for HRI Late Breaking Reports." },
  { date: "2025-11-01", slug: "ra-l-changing-goals", title: "RA-L paper on changing human goals", summary: "I've Changed My Mind: Robots Adapting to Changing Human Goals during Collaboration accepted to RA-L.", body: "I've Changed My Mind: Robots Adapting to Changing Human Goals during Collaboration accepted to IEEE Robotics and Automation Letters." },
  { date: "2025-08-15", slug: "emnlp-2025-diverse-not-short", title: "EMNLP 2025 paper on language model diversity", summary: "Diverse, not Short accepted to EMNLP 2025 main conference.", body: "Diverse, not Short: A Length-Controlled Data Selection Strategy for Improving Response Diversity of Language Models (led by Vijeta Deshpande) accepted to EMNLP 2025." },
  { date: "2024-12-01", slug: "hri-pioneer-2025", title: "Selected as HRI Pioneer 2025", summary: "Honored to be selected as an HRI Pioneer for 2025 in Melbourne, Australia.", body: "Honored to have been selected as an HRI Pioneer (one of 30 top early-career HRI researchers). Will present at the HRI Pioneers Workshop at HRI 2025 in Melbourne, Australia." },
  { date: "2024-07-01", slug: "icmi-2024-stress-detection", title: "ICMI 2024 paper on stress detection", summary: "Integrating Multimodal Affective Signals for Stress Detection accepted to ICMI 2024.", body: "Integrating Multimodal Affective Signals for Stress Detection from Audio-Visual Data accepted to ICMI 2024." },
  { date: "2024-05-01", slug: "ro-man-2024-critical-decision-points", title: "RO-MAN 2024 paper on critical decision points", summary: "Planning with Critical Decision Points accepted to RO-MAN 2024.", body: "Planning with Critical Decision Points: Robots that Influence Humans to Infer Their Strategy accepted to RO-MAN 2024." },
  { date: "2022-12-01", slug: "hri-2023-best-paper", title: "Best Paper Award at HRI 2023", summary: "Interactive Policy Shaping with Transparent Matrix Overlays won Best Paper at HRI 2023.", body: "Interactive Policy Shaping for Human-Robot Collaboration with Transparent Matrix Overlays (led by Jake Brawer) accepted to HRI 2023 and won the **Best Paper Award** (Technical track)." },
];

for (const item of items) {
  const frontmatter = [
    `title: ${yamlQuote(item.title)}`,
    `date: ${item.date}`,
    `summary: ${yamlQuote(item.summary)}`,
  ].join("\n");

  writeFileSync(
    join(newsDir, `${item.slug}.mdoc`),
    `${frontmatter}\n\n${item.body}\n`
  );
}

console.log(`Wrote ${items.length} news items`);
