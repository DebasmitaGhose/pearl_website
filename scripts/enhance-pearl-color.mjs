import sharp from "sharp";

const src = "public/pearl-logo.png";
const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;

function isPearlPixel(x, y) {
  if (x < 0 || y < 0 || x >= w || y >= h) return false;
  const i = (y * w + x) * 4;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];
  if (a < 200) return false;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  // pearl body or existing white highlight
  if (lum > 240) return true;
  return lum > 140 && lum < 235 && b > r * 0.85 && Math.abs(r - g) < 60;
}

const guessCx = 512;
const guessCy = 470;
const rs = [];
for (let a = 0; a < 360; a += 3) {
  const rad = (a * Math.PI) / 180;
  let r = 0;
  for (; r < 220; r++) {
    const x = Math.round(guessCx + Math.cos(rad) * r);
    const y = Math.round(guessCy + Math.sin(rad) * r);
    if (!isPearlPixel(x, y)) break;
  }
  if (r > 60 && r < 180) rs.push(r);
}
rs.sort((a, b) => a - b);
const R = rs[Math.floor(rs.length / 2)] - 1;
const cx = guessCx;
const cy = guessCy;

// Sample plum color just outside pearl for seamless edge if needed
const out = Buffer.from(data);
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const dx = x - cx;
    const dy = y - cy;
    if (dx * dx + dy * dy <= (R + 2) * (R + 2)) {
      // restore to white background of the source artwork
      const i = (y * w + x) * 4;
      out[i] = 255;
      out[i + 1] = 255;
      out[i + 2] = 255;
      out[i + 3] = 255;
    }
  }
}

const S = Math.ceil((R + 10) * 2);
const half = S / 2;
const pearlSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
  <defs>
    <radialGradient id="body" cx="36%" cy="32%" r="70%">
      <stop offset="0%" stop-color="#f4eef8"/>
      <stop offset="35%" stop-color="#dcc8e8"/>
      <stop offset="70%" stop-color="#b79bcb"/>
      <stop offset="100%" stop-color="#8f6fa8"/>
    </radialGradient>
    <radialGradient id="iridescence" cx="62%" cy="58%" r="55%">
      <stop offset="0%" stop-color="#c8dde8" stop-opacity="0.45"/>
      <stop offset="50%" stop-color="#e8d4c8" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#dcc8e8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="sheen" cx="30%" cy="26%" r="40%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="bloom" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="${Math.max(2, R * 0.03)}" result="b"/>
      <feMerge>
        <feMergeNode in="b"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="${Math.max(1, R * 0.015)}"/>
    </filter>
  </defs>
  <circle cx="${half}" cy="${half}" r="${R}" fill="url(#body)"/>
  <circle cx="${half}" cy="${half}" r="${R}" fill="url(#iridescence)"/>
  <ellipse cx="${half - R * 0.22}" cy="${half - R * 0.28}" rx="${R * 0.45}" ry="${R * 0.34}" fill="url(#sheen)"/>
  <circle cx="${half - R * 0.3}" cy="${half - R * 0.34}" r="${R * 0.1}" fill="#ffffff" opacity="0.95" filter="url(#bloom)"/>
  <path d="M ${half - R * 0.58} ${half}
           A ${R * 0.72} ${R * 0.72} 0 0 1 ${half + R * 0.08} ${half - R * 0.58}"
        fill="none" stroke="#ffffff" stroke-width="${Math.max(2, R * 0.04)}"
        stroke-opacity="0.28" stroke-linecap="round" filter="url(#soft)"/>
  <g transform="translate(${half - R * 0.22}, ${half - R * 0.3})" filter="url(#bloom)" opacity="0.98">
    <path d="M0 -${R * 0.42} C ${R * 0.05} -${R * 0.1}, ${R * 0.05} ${R * 0.1}, 0 ${R * 0.42}
             C -${R * 0.05} ${R * 0.1}, -${R * 0.05} -${R * 0.1}, 0 -${R * 0.42} Z" fill="#ffffff"/>
    <path d="M-${R * 0.42} 0 C -${R * 0.1} -${R * 0.05}, ${R * 0.1} -${R * 0.05}, ${R * 0.42} 0
             C ${R * 0.1} ${R * 0.05}, -${R * 0.1} ${R * 0.05}, -${R * 0.42} 0 Z" fill="#ffffff"/>
    <path d="M-${R * 0.26} -${R * 0.26} C -${R * 0.04} -${R * 0.08}, ${R * 0.08} ${R * 0.04}, ${R * 0.26} ${R * 0.26}
             C ${R * 0.08} ${R * 0.04}, -${R * 0.04} -${R * 0.08}, -${R * 0.26} -${R * 0.26} Z" fill="#ffffff" opacity="0.85"/>
    <path d="M ${R * 0.26} -${R * 0.26} C ${R * 0.08} -${R * 0.04}, -${R * 0.04} ${R * 0.08}, -${R * 0.26} ${R * 0.26}
             C -${R * 0.08} ${R * 0.04}, ${R * 0.04} -${R * 0.08}, ${R * 0.26} -${R * 0.26} Z" fill="#ffffff" opacity="0.85"/>
    <circle cx="0" cy="0" r="${R * 0.055}" fill="#ffffff"/>
  </g>
</svg>`;

const pearlPng = await sharp(Buffer.from(pearlSvg)).png().toBuffer();
const base = await sharp(out, {
  raw: { width: w, height: h, channels: 4 },
}).png().toBuffer();

const left = Math.round(cx - S / 2);
const top = Math.round(cy - S / 2);

await sharp(base)
  .composite([{ input: pearlPng, left, top }])
  .removeAlpha()
  .png()
  .toFile(src);

console.log("updated", src, { cx, cy, R, S });
