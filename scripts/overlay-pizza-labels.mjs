import sharp from "sharp";
import { writeFileSync } from "fs";

const clean =
  "C:/Users/Debasmita Ghose/.cursor/projects/c-Users-Debasmita-Ghose-Documents-pearl-website/assets/preference-learning-pizza-clean.png";
const out = "public/images/pages/research/preference-learning-pizza-teaser.jpg";

const meta = await sharp(clean).metadata();
const w = meta.width ?? 1536;
const h = meta.height ?? 1024;

const bx = Math.round(w * 0.175);
const by = Math.round(h * 0.355);
const tipX = Math.round(w * 0.18);
const tipY = Math.round(h * 0.52);

const wx = Math.round(w * 0.52);
const wy = Math.round(h * 0.78);
const wTipX = Math.round(w * 0.48);
const wTipY = Math.round(h * 0.62);

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <line x1="${bx + 26}" y1="${by + 16}" x2="${tipX}" y2="${tipY}" stroke="black" stroke-width="1.5"/>
  <circle cx="${tipX}" cy="${tipY}" r="2.5" fill="black"/>
  <rect x="${bx}" y="${by}" width="52" height="16" rx="3" fill="black"/>
  <text x="${bx + 26}" y="${by + 11.5}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="9" font-weight="600" fill="white">Buttons</text>

  <line x1="${wx + 31}" y1="${wy}" x2="${wTipX}" y2="${wTipY}" stroke="black" stroke-width="1.5"/>
  <circle cx="${wTipX}" cy="${wTipY}" r="2.5" fill="black"/>
  <rect x="${wx}" y="${wy}" width="62" height="16" rx="3" fill="black"/>
  <text x="${wx + 31}" y="${wy + 11.5}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="9" font-weight="600" fill="white">Workspace</text>
</svg>`;

writeFileSync("tmp/pizza-labels.svg", svg);

await sharp(clean)
  .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(out);

const m = await sharp(out).metadata();
console.log("wrote", out, `${m.width}x${m.height}`);
