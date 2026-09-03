import sharp from "sharp";
import { copyFileSync, writeFileSync } from "fs";

copyFileSync("public/pearl-logo-from-index.png", "public/pearl-logo.png");

const { data, info } = await sharp("public/pearl-logo.png")
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const w = info.width;
const h = info.height;
const out = Buffer.from(data);

function isPlum(x, y) {
  if (x < 0 || y < 0 || x >= w || y >= h) return false;
  const i = (y * w + x) * 4;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];
  if (a < 200) return false;
  if (r > 248 && g > 248 && b > 248) return false;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum < 145 && r > 70 && b > 85 && Math.abs(r - b) < 45 && g < r + 10;
}

function isPearlPixel(x, y) {
  if (x < 0 || y < 0 || x >= w || y >= h) return false;
  if (isPlum(x, y)) return false;
  const i = (y * w + x) * 4;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];
  if (a < 200) return false;
  if (r > 250 && g > 250 && b > 250) return false;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  // lavender ball + white highlight
  return lum > 160 && lum < 250 && b > 150 && r > 150;
}

// Known composition center from original art
const pearlCx = 512;
const pearlCy = 470;

// Measure original pearl radius by rays that stay on pearl pixels
const rs = [];
for (let a = 0; a < 360; a += 2) {
  const rad = (a * Math.PI) / 180;
  let r = 0;
  for (; r < 200; r++) {
    const x = Math.round(pearlCx + Math.cos(rad) * r);
    const y = Math.round(pearlCy + Math.sin(rad) * r);
    if (!isPearlPixel(x, y)) break;
  }
  if (r > 80 && r < 180) rs.push(r);
}
rs.sort((a, b) => a - b);
const origR = rs[Math.floor(rs.length / 2)];
const pearlR = Math.round(origR * 0.97);

console.log({ pearlCx, pearlCy, origR, pearlR, samples: rs.length });

const bgI = ((100 * w + 100) * 4);
const bg = [data[bgI], data[bgI + 1], data[bgI + 2]];

// Clear original pearl disk completely (to bg), never touch plum hands
for (let y = pearlCy - origR - 2; y <= pearlCy + origR + 2; y++) {
  for (let x = pearlCx - origR - 2; x <= pearlCx + origR + 2; x++) {
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    if (isPlum(x, y)) continue;
    const dist = Math.hypot(x - pearlCx, y - pearlCy);
    if (dist > origR + 2) continue;
    const i = (y * w + x) * 4;
    out[i] = bg[0];
    out[i + 1] = bg[1];
    out[i + 2] = bg[2];
    out[i + 3] = 255;
  }
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}
function lerp3(c0, c1, t) {
  return [
    Math.round(lerp(c0[0], c1[0], t)),
    Math.round(lerp(c0[1], c1[1], t)),
    Math.round(lerp(c0[2], c1[2], t)),
  ];
}

const cHi = [247, 242, 251];
const cMid = [228, 212, 239];
const cLo = [154, 120, 176];
const hx = pearlCx - pearlR * 0.28;
const hy = pearlCy - pearlR * 0.32;

for (let y = pearlCy - pearlR; y <= pearlCy + pearlR; y++) {
  for (let x = pearlCx - pearlR; x <= pearlCx + pearlR; x++) {
    const dist = Math.hypot(x - pearlCx, y - pearlCy);
    if (dist > pearlR) continue;
    if (isPlum(x, y)) continue;
    const t = dist / pearlR;
    let col =
      t < 0.45 ? lerp3(cHi, cMid, t / 0.45) : lerp3(cMid, cLo, (t - 0.45) / 0.55);
    const sheen = Math.hypot(x - hx, y - hy) / (pearlR * 0.45);
    if (sheen < 1) {
      const s = (1 - sheen) * (1 - sheen) * 0.5;
      col = [
        Math.round(lerp(col[0], 255, s)),
        Math.round(lerp(col[1], 255, s)),
        Math.round(lerp(col[2], 255, s)),
      ];
    }
    const i = (y * w + x) * 4;
    out[i] = col[0];
    out[i + 1] = col[1];
    out[i + 2] = col[2];
    out[i + 3] = 255;
  }
}

function paintStar(sx, sy, arm, core) {
  for (let y = Math.floor(sy - arm); y <= Math.ceil(sy + arm); y++) {
    for (let x = Math.floor(sx - arm); x <= Math.ceil(sx + arm); x++) {
      if (Math.hypot(x - pearlCx, y - pearlCy) > pearlR) continue;
      if (isPlum(x, y)) continue;
      const lx = x - sx;
      const ly = y - sy;
      const ax = Math.abs(lx);
      const ay = Math.abs(ly);
      const cross =
        (ax < arm * 0.12 && ay < arm) || (ay < arm * 0.12 && ax < arm);
      const diag =
        Math.abs(ax - ay) < arm * 0.14 && ax < arm * 0.65 && ay < arm * 0.65;
      const inCore = ax * ax + ay * ay <= core * core;
      if (!cross && !diag && !inCore) continue;
      let strength = 1;
      if (cross) strength = 1 - Math.max(ax, ay) / arm;
      if (diag)
        strength = Math.min(strength, 1 - Math.hypot(ax, ay) / (arm * 0.75));
      if (inCore) strength = 1;
      strength = Math.max(0, strength);
      const i = (y * w + x) * 4;
      out[i] = Math.round(lerp(out[i], 255, strength));
      out[i + 1] = Math.round(lerp(out[i + 1], 255, strength));
      out[i + 2] = Math.round(lerp(out[i + 2], 255, strength));
    }
  }
}
paintStar(hx, hy, pearlR * 0.4, pearlR * 0.055);
paintStar(hx + pearlR * 0.34, hy + pearlR * 0.26, pearlR * 0.13, pearlR * 0.028);

await sharp(out, { raw: { width: w, height: h, channels: 4 } })
  .removeAlpha()
  .png()
  .toFile("public/pearl-logo.png");

writeFileSync(
  "scripts/pearl-placement.json",
  JSON.stringify({ pearlCx, pearlCy, pearlR }, null, 2)
);
console.log("done", { pearlCx, pearlCy, origR, pearlR });
