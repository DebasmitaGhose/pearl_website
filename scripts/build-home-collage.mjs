import sharp from "sharp";

/**
 * Builds the home carousel collage from carousel-lab-source.jpg
 * (four side-by-side lab photos) into a 2×2 grid.
 */
const input = "public/images/home/carousel-lab-source.jpg";
const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;
const channels = info.channels;

const colDark = [];
for (let x = 0; x < w; x++) {
  let dark = 0;
  for (let y = 0; y < h; y++) {
    const i = (y * w + x) * channels;
    const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (lum < 25) dark++;
  }
  colDark[x] = dark / h;
}

const isDiv = colDark.map((v) => v > 0.7);

function findDividerNear(target) {
  let best = target;
  let bestScore = -1;
  const lo = Math.max(0, target - Math.floor(w * 0.08));
  const hi = Math.min(w - 1, target + Math.floor(w * 0.08));
  for (let x = lo; x <= hi; x++) {
    if (!isDiv[x]) continue;
    let L = x;
    let R = x;
    while (L > 0 && isDiv[L - 1]) L--;
    while (R < w - 1 && isDiv[R + 1]) R++;
    const mid = Math.floor((L + R) / 2);
    const score = R - L + 1 + (1 - Math.abs(mid - target) / w);
    if (score > bestScore) {
      bestScore = score;
      best = mid;
    }
  }
  return best;
}

const d1 = findDividerNear(Math.floor(w / 4));
const d2 = findDividerNear(Math.floor(w / 2));
const d3 = findDividerNear(Math.floor((3 * w) / 4));

const pad = 2;
const bounds = [
  [pad, d1 - pad],
  [d1 + pad, d2 - pad],
  [d2 + pad, d3 - pad],
  [d3 + pad, w - pad],
];

const panels = [];
for (const [L, R] of bounds) {
  const left = Math.max(0, L);
  const width = Math.max(10, R - L);
  panels.push(
    await sharp(input)
      .extract({ left, top: 2, width, height: h - 4 })
      .toBuffer()
  );
}

const cellW = 800;
const cellH = 600;
const gap = 4;
const outW = cellW * 2 + gap;
const outH = cellH * 2 + gap;
const bg = { r: 72, g: 58, b: 96 };

const resized = await Promise.all(
  panels.map((buf) =>
    sharp(buf)
      .resize(cellW, cellH, { fit: "cover", position: "attention" })
      .jpeg({ quality: 92 })
      .toBuffer()
  )
);

await sharp({
  create: {
    width: outW,
    height: outH,
    channels: 3,
    background: bg,
  },
})
  .composite([
    { input: resized[0], left: 0, top: 0 },
    { input: resized[1], left: cellW + gap, top: 0 },
    { input: resized[2], left: 0, top: cellH + gap },
    { input: resized[3], left: cellW + gap, top: cellH + gap },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile("public/images/home/carousel-lab-collage.jpg");

console.log("Wrote public/images/home/carousel-lab-collage.jpg");
