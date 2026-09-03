import sharp from "sharp";
import { readFileSync } from "fs";

const srcColor = "public/pearl-logo.png";
const dest = "public/pearl-logo-white.png";
const { pearlCx: cx, pearlCy: cy, pearlR } = JSON.parse(
  readFileSync("scripts/pearl-placement.json", "utf8")
);

const { data, info } = await sharp(srcColor)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const w = info.width;
const h = info.height;
const out = Buffer.alloc(w * h * 4);

function isPlum(x, y) {
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

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const dist = Math.hypot(x - cx, y - cy);
    const inPearl = dist <= pearlR;

    if (inPearl) {
      let t = lum / 255;
      const isGlimmer = t > 0.93;
      if (isGlimmer) t = 1;
      else t = 0.5 + Math.min(t, 0.9) * 0.42;
      const shade = Math.round(255 * t);
      out[i] = shade;
      out[i + 1] = shade;
      out[i + 2] = shade;
      out[i + 3] = 255;
      continue;
    }

    if (isPlum(x, y)) {
      // White linework cutouts on robot hand
      if (lum > 200) {
        out[i] = out[i + 1] = out[i + 2] = out[i + 3] = 0;
      } else {
        out[i] = out[i + 1] = out[i + 2] = 255;
        out[i + 3] = 255;
      }
      continue;
    }

    // Everything else (bg + any remnant) transparent
    out[i] = out[i + 1] = out[i + 2] = out[i + 3] = 0;
  }
}

const full = await sharp(out, { raw: { width: w, height: h, channels: 4 } })
  .png()
  .toBuffer();

const trimmed = await sharp(full).trim({ threshold: 4 }).png().toBuffer();
const tMeta = await sharp(trimmed).metadata();
const side = Math.max(tMeta.width ?? 0, tMeta.height ?? 0) + 40;

await sharp({
  create: {
    width: side,
    height: side,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([{ input: trimmed, gravity: "centre" }])
  .png()
  .toFile(dest);

console.log("white logo", { side, cx, cy, pearlR });
