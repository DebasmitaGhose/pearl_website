import sharp from "sharp";

const src = "public/pearl-logo-white.png";
const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;

// Find pearl centroid (semi-transparent / shaded circular body near center)
let sx = 0;
let sy = 0;
let n = 0;
for (let y = Math.floor(h * 0.3); y < h * 0.7; y++) {
  for (let x = Math.floor(w * 0.3); x < w * 0.7; x++) {
    const i = (y * w + x) * 4;
    const a = data[i + 3];
    if (a > 40 && a < 250 && data[i] > 200) {
      sx += x;
      sy += y;
      n++;
    }
  }
}
const cx = Math.round(sx / n);
const cy = Math.round(sy / n);

const rs = [];
for (let a = 0; a < 360; a += 5) {
  const rad = (a * Math.PI) / 180;
  let r = 0;
  for (; r < 200; r++) {
    const x = Math.round(cx + Math.cos(rad) * r);
    const y = Math.round(cy + Math.sin(rad) * r);
    if (x < 0 || y < 0 || x >= w || y >= h) break;
    const i = (y * w + x) * 4;
    if (data[i + 3] < 30) break;
    r++;
  }
  // fix loop - recount properly
}
// recount radius cleanly
for (let a = 0; a < 360; a += 5) {
  const rad = (a * Math.PI) / 180;
  let r = 0;
  for (; r < 200; r++) {
    const x = Math.round(cx + Math.cos(rad) * r);
    const y = Math.round(cy + Math.sin(rad) * r);
    if (x < 0 || y < 0 || x >= w || y >= h) break;
    const i = (y * w + x) * 4;
    if (data[i + 3] < 30) break;
  }
  if (r > 40 && r < 180) rs.push(r);
}
rs.sort((a, b) => a - b);
const R = rs[Math.floor(rs.length / 2)];
console.log({ cx, cy, R, n });

// Soften body shading slightly, then stamp a crisp bloomed glimmer
const gx = cx - R * 0.28;
const gy = cy - R * 0.32;
const S = Math.ceil(R * 1.6);
const half = S / 2;

const glimmerSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
  <defs>
    <filter id="bloom" x="-150%" y="-150%" width="400%" height="400%">
      <feGaussianBlur stdDeviation="2.4" result="b"/>
      <feMerge>
        <feMergeNode in="b"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <radialGradient id="core" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="55%" stop-color="#ffffff" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g transform="translate(${half}, ${half})" filter="url(#bloom)">
    <circle cx="0" cy="0" r="${R * 0.22}" fill="url(#core)"/>
    <path d="M0 -${R * 0.55} C ${R * 0.05} -${R * 0.12}, ${R * 0.05} ${R * 0.12}, 0 ${R * 0.55}
             C -${R * 0.05} ${R * 0.12}, -${R * 0.05} -${R * 0.12}, 0 -${R * 0.55} Z" fill="#ffffff"/>
    <path d="M-${R * 0.55} 0 C -${R * 0.12} -${R * 0.05}, ${R * 0.12} -${R * 0.05}, ${R * 0.55} 0
             C ${R * 0.12} ${R * 0.05}, -${R * 0.12} ${R * 0.05}, -${R * 0.55} 0 Z" fill="#ffffff"/>
    <path d="M-${R * 0.36} -${R * 0.36} C -${R * 0.05} -${R * 0.1}, ${R * 0.1} ${R * 0.05}, ${R * 0.36} ${R * 0.36}
             C ${R * 0.1} ${R * 0.05}, -${R * 0.05} -${R * 0.1}, -${R * 0.36} -${R * 0.36} Z" fill="#ffffff" opacity="0.95"/>
    <path d="M ${R * 0.36} -${R * 0.36} C ${R * 0.1} -${R * 0.05}, -${R * 0.05} ${R * 0.1}, -${R * 0.36} ${R * 0.36}
             C -${R * 0.1} ${R * 0.05}, ${R * 0.05} -${R * 0.1}, ${R * 0.36} -${R * 0.36} Z" fill="#ffffff" opacity="0.95"/>
    <circle cx="0" cy="0" r="${R * 0.07}" fill="#ffffff"/>
  </g>
</svg>`;

// Dim pearl body slightly (except near-opaque hand pixels outside) so glimmer pops:
// only adjust pixels inside pearl radius with alpha < 250
const dimmed = Buffer.from(data);
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const dx = x - cx;
    const dy = y - cy;
    if (dx * dx + dy * dy > R * R) continue;
    const i = (y * w + x) * 4;
    if (dimmed[i + 3] > 20 && dimmed[i + 3] < 245) {
      dimmed[i + 3] = Math.round(dimmed[i + 3] * 0.82);
    }
  }
}

const base = await sharp(dimmed, {
  raw: { width: w, height: h, channels: 4 },
}).png().toBuffer();

const glimmer = await sharp(Buffer.from(glimmerSvg)).png().toBuffer();

await sharp(base)
  .composite([
    {
      input: glimmer,
      left: Math.round(gx - half),
      top: Math.round(gy - half),
      blend: "screen",
    },
  ])
  .png()
  .toFile(src);

console.log("glimmer stamped at", { gx, gy, R });
