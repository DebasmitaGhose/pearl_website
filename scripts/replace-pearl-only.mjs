import sharp from "sharp";
import { copyFileSync } from "fs";

// Restore original artwork (solid hands), then replace only the pearl.
copyFileSync("public/pearl-logo-from-index.png", "public/pearl-logo.png");

const src = "public/pearl-logo.png";
const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const w = info.width;
const h = info.height;

// Original composition: pearl sits slightly above vertical center
const cx = 512;
const cy = 470;

function isPearlPixel(x, y) {
  if (x < 0 || y < 0 || x >= w || y >= h) return false;
  const i = (y * w + x) * 4;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];
  if (a < 200) return false;
  if (r > 248 && g > 248 && b > 248) return false; // bg
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  if (lum > 240) return true; // existing highlight
  // lavender body (not deep plum hands)
  return lum > 145 && lum < 235 && b > 140 && r > 130 && Math.abs(r - b) < 50;
}

const rs = [];
for (let a = 0; a < 360; a += 2) {
  const rad = (a * Math.PI) / 180;
  let r = 0;
  for (; r < 220; r++) {
    const x = Math.round(cx + Math.cos(rad) * r);
    const y = Math.round(cy + Math.sin(rad) * r);
    if (!isPearlPixel(x, y)) break;
  }
  if (r > 70 && r < 190) rs.push(r);
}
rs.sort((a, b) => a - b);
const detected = rs[Math.floor(rs.length / 2)];
// Original artwork uses a larger pearl disk than edge-detection alone returns
const R = Math.max(detected, 145);
console.log({ cx, cy, detected, R, n: rs.length });

// Punch pearl disk to white background
const out = Buffer.from(data);
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const dx = x - cx;
    const dy = y - cy;
    if (dx * dx + dy * dy <= (R + 2) * (R + 2)) {
      const i = (y * w + x) * 4;
      out[i] = 255;
      out[i + 1] = 255;
      out[i + 2] = 255;
      out[i + 3] = 255;
    }
  }
}

const S = Math.ceil((R + 12) * 2);
const half = S / 2;

const pearlSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
  <defs>
    <radialGradient id="body" cx="36%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#f7f2fb"/>
      <stop offset="28%" stop-color="#e6d7ef"/>
      <stop offset="62%" stop-color="#c9b0d8"/>
      <stop offset="100%" stop-color="#a888bc"/>
    </radialGradient>
    <radialGradient id="iridescence" cx="68%" cy="62%" r="55%">
      <stop offset="0%" stop-color="#c5dce8" stop-opacity="0.4"/>
      <stop offset="45%" stop-color="#f0ddd0" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#dcc8e8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="sheen" cx="30%" cy="26%" r="38%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="bloom" x="-120%" y="-120%" width="340%" height="340%">
      <feGaussianBlur stdDeviation="${Math.max(2.2, R * 0.028)}" result="b"/>
      <feMerge>
        <feMergeNode in="b"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <circle cx="${half}" cy="${half}" r="${R}" fill="url(#body)"/>
  <circle cx="${half}" cy="${half}" r="${R}" fill="url(#iridescence)"/>
  <ellipse cx="${half - R * 0.2}" cy="${half - R * 0.26}"
           rx="${R * 0.46}" ry="${R * 0.34}" fill="url(#sheen)"/>

  <!-- soft specular pool -->
  <circle cx="${half - R * 0.28}" cy="${half - R * 0.34}" r="${R * 0.12}"
          fill="#ffffff" opacity="0.7" filter="url(#bloom)"/>

  <!-- classic pearl glimmer -->
  <g transform="translate(${half - R * 0.24}, ${half - R * 0.3})" filter="url(#bloom)">
    <path d="M0 -${R * 0.48} C ${R * 0.05} -${R * 0.11}, ${R * 0.05} ${R * 0.11}, 0 ${R * 0.48}
             C -${R * 0.05} ${R * 0.11}, -${R * 0.05} -${R * 0.11}, 0 -${R * 0.48} Z" fill="#ffffff"/>
    <path d="M-${R * 0.48} 0 C -${R * 0.11} -${R * 0.05}, ${R * 0.11} -${R * 0.05}, ${R * 0.48} 0
             C ${R * 0.11} ${R * 0.05}, -${R * 0.11} ${R * 0.05}, -${R * 0.48} 0 Z" fill="#ffffff"/>
    <path d="M-${R * 0.3} -${R * 0.3} C -${R * 0.04} -${R * 0.09}, ${R * 0.09} ${R * 0.04}, ${R * 0.3} ${R * 0.3}
             C ${R * 0.09} ${R * 0.04}, -${R * 0.04} -${R * 0.09}, -${R * 0.3} -${R * 0.3} Z" fill="#ffffff" opacity="0.92"/>
    <path d="M ${R * 0.3} -${R * 0.3} C ${R * 0.09} -${R * 0.04}, -${R * 0.04} ${R * 0.09}, -${R * 0.3} ${R * 0.3}
             C -${R * 0.09} ${R * 0.04}, ${R * 0.04} -${R * 0.09}, ${R * 0.3} -${R * 0.3} Z" fill="#ffffff" opacity="0.92"/>
    <circle cx="0" cy="0" r="${R * 0.07}" fill="#ffffff"/>
  </g>

  <!-- tiny secondary twinkle -->
  <g transform="translate(${half + R * 0.26}, ${half + R * 0.1})" filter="url(#bloom)" opacity="0.75">
    <path d="M0 -${R * 0.14} C ${R * 0.022} -${R * 0.03}, ${R * 0.022} ${R * 0.03}, 0 ${R * 0.14}
             C -${R * 0.022} ${R * 0.03}, -${R * 0.022} -${R * 0.03}, 0 -${R * 0.14} Z" fill="#ffffff"/>
    <path d="M-${R * 0.14} 0 C -${R * 0.03} -${R * 0.022}, ${R * 0.03} -${R * 0.022}, ${R * 0.14} 0
             C ${R * 0.03} ${R * 0.022}, -${R * 0.03} ${R * 0.022}, -${R * 0.14} 0 Z" fill="#ffffff"/>
  </g>
</svg>`;

const pearlPng = await sharp(Buffer.from(pearlSvg)).png().toBuffer();
const base = await sharp(out, {
  raw: { width: w, height: h, channels: 4 },
})
  .png()
  .toBuffer();

await sharp(base)
  .composite([
    {
      input: pearlPng,
      left: Math.round(cx - S / 2),
      top: Math.round(cy - S / 2),
    },
  ])
  .removeAlpha()
  .png()
  .toFile(src);

console.log("color logo updated");
