import sharp from "sharp";

const src = "public/pearl-logo-white.png";
const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;

let sx = 0;
let sy = 0;
let n = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const a = data[(y * w + x) * 4 + 3];
    if (a > 35 && a < 250) {
      sx += x;
      sy += y;
      n++;
    }
  }
}
const cx = Math.round(sx / n);
const cy = Math.round(sy / n);
const rs = [];
for (let a = 0; a < 360; a += 3) {
  const rad = (a * Math.PI) / 180;
  let r = 0;
  for (; r < 200; r++) {
    const x = Math.round(cx + Math.cos(rad) * r);
    const y = Math.round(cy + Math.sin(rad) * r);
    if (x < 0 || y < 0 || x >= w || y >= h) break;
    if (data[(y * w + x) * 4 + 3] < 25) break;
  }
  if (r > 50 && r < 170) rs.push(r);
}
rs.sort((a, b) => a - b);
const R = rs[Math.floor(rs.length / 2)];
console.log({ cx, cy, R });

const left = Math.max(0, cx - R - 4);
const top = Math.max(0, cy - R - 4);
const size = (R + 4) * 2;
const pearlCrop = await sharp(src)
  .extract({
    left,
    top,
    width: Math.min(size, w - left),
    height: Math.min(size, h - top),
  })
  .blur(1.2)
  .png()
  .toBuffer();

const out = Buffer.from(data);
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const dx = x - cx;
    const dy = y - cy;
    if (dx * dx + dy * dy <= (R + 1) * (R + 1)) {
      const i = (y * w + x) * 4;
      out[i] = out[i + 1] = out[i + 2] = out[i + 3] = 0;
    }
  }
}
const punched = await sharp(out, {
  raw: { width: w, height: h, channels: 4 },
})
  .png()
  .toBuffer();

const S = Math.ceil(R * 1.25);
const half = S / 2;
const gx = cx - R * 0.28;
const gy = cy - R * 0.32;
const glimmerSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
  <defs>
    <filter id="b" x="-150%" y="-150%" width="400%" height="400%">
      <feGaussianBlur stdDeviation="${Math.max(1.8, R * 0.025)}" result="bl"/>
      <feMerge><feMergeNode in="bl"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <g transform="translate(${half},${half})" filter="url(#b)">
    <path d="M0 -${R * 0.42} C ${R * 0.04} -${R * 0.09}, ${R * 0.04} ${R * 0.09}, 0 ${R * 0.42}
             C -${R * 0.04} ${R * 0.09}, -${R * 0.04} -${R * 0.09}, 0 -${R * 0.42} Z" fill="#fff"/>
    <path d="M-${R * 0.42} 0 C -${R * 0.09} -${R * 0.04}, ${R * 0.09} -${R * 0.04}, ${R * 0.42} 0
             C ${R * 0.09} ${R * 0.04}, -${R * 0.09} ${R * 0.04}, -${R * 0.42} 0 Z" fill="#fff"/>
    <path d="M-${R * 0.26} -${R * 0.26} C -${R * 0.03} -${R * 0.07}, ${R * 0.07} ${R * 0.03}, ${R * 0.26} ${R * 0.26}
             C ${R * 0.07} ${R * 0.03}, -${R * 0.03} -${R * 0.07}, -${R * 0.26} -${R * 0.26} Z" fill="#fff" opacity="0.95"/>
    <path d="M ${R * 0.26} -${R * 0.26} C ${R * 0.07} -${R * 0.03}, -${R * 0.03} ${R * 0.07}, -${R * 0.26} ${R * 0.26}
             C -${R * 0.07} ${R * 0.03}, ${R * 0.03} -${R * 0.07}, ${R * 0.26} -${R * 0.26} Z" fill="#fff" opacity="0.95"/>
    <circle cx="0" cy="0" r="${R * 0.065}" fill="#fff"/>
  </g>
</svg>`;

const glimmer = await sharp(Buffer.from(glimmerSvg)).png().toBuffer();
await sharp(punched)
  .composite([
    { input: pearlCrop, left, top },
    {
      input: glimmer,
      left: Math.round(gx - half),
      top: Math.round(gy - half),
      blend: "screen",
    },
  ])
  .png()
  .toFile(src);

console.log("smoothed white pearl");
