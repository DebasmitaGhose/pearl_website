import sharp from "sharp";

/**
 * Split carousel-lab-source.jpg (4 side-by-side lab photos) into
 * individual carousel slides with black borders trimmed and upscaled.
 */
const input = "public/images/home/carousel-lab-source.jpg";
const names = [
  "carousel-slide-1-music-clean.jpg",
  "carousel-slide-2-recycling-clean.jpg",
  "carousel-slide-3-mobile-clean.jpg",
  "carousel-slide-4-cooking-clean.jpg",
];

const { data, info } = await sharp(input)
  .raw()
  .toBuffer({ resolveWithObject: true });
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
const pad = 3;
const bounds = [
  [pad, d1 - pad],
  [d1 + pad, d2 - pad],
  [d2 + pad, d3 - pad],
  [d3 + pad, w - pad],
];

for (let i = 0; i < 4; i++) {
  const [L, R] = bounds[i];
  const left = Math.max(0, L);
  const width = Math.max(10, R - L);
  const extracted = await sharp(input)
    .extract({ left, top: 2, width, height: h - 4 })
    .toBuffer();

  const trimmed = await sharp(extracted)
    .trim({ background: "#000000", threshold: 40 })
    .toBuffer();

  const { data: tData, info: tInfo } = await sharp(trimmed)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const tw = tInfo.width;
  const th = tInfo.height;
  const tc = tInfo.channels;
  const darkRow = (y) => {
    let dark = 0;
    for (let x = 0; x < tw; x++) {
      const i = (y * tw + x) * tc;
      if ((tData[i] + tData[i + 1] + tData[i + 2]) / 3 < 40) dark++;
    }
    return dark / tw > 0.85;
  };
  let top = 0;
  while (top < th && darkRow(top)) top++;
  let bottom = th - 1;
  while (bottom > top && darkRow(bottom)) bottom--;
  top = Math.min(bottom - 20, top + 2);
  bottom = Math.max(top + 20, bottom - 2);

  const outPath = `public/images/home/${names[i]}`;
  await sharp(trimmed)
    .extract({
      left: 2,
      top,
      width: Math.max(10, tw - 4),
      height: bottom - top + 1,
    })
    .resize(1600, null, {
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    })
    .sharpen({ sigma: 0.5 })
    .jpeg({ quality: 93, mozjpeg: true })
    .toFile(outPath);

  const meta = await sharp(outPath).metadata();
  console.log(`Wrote ${outPath} (${meta.width}x${meta.height})`);
}
