import sharp from "sharp";

const src = "public/pearl-logo-white.png";
const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;

// Center of the cupped pearl; clear a wide disk to remove old flat circle remnants
const cx = 350;
const cy = 312;
const clearR = 112;
const pearlR = 96;

const out = Buffer.from(data);
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const dx = x - cx;
    const dy = y - cy;
    if (dx * dx + dy * dy <= clearR * clearR) {
      const i = (y * w + x) * 4;
      // Only clear pixels that are part of the old pearl (near-white), not hand tips
      // Hand tips enter the clear disk — preserve non-circular hand pixels by
      // clearing only if inside pearlR+margin OR if pixel is isolated from hands.
      // Safer: clear everything in clearR, then we must not overlap hands.
      // Hands approach but the pearl disk between them is empty of hand fill.
      out[i] = 0;
      out[i + 1] = 0;
      out[i + 2] = 0;
      out[i + 3] = 0;
    }
  }
}

// Restore hand pixels that were wrongly cleared: re-copy from original any
// opaque white pixel that is outside the true pearl circle but was in clearR,
// only if it looks like hand (connected to outside of clear disk).
// Simpler approach: only clear inside pearlR+6 — but then ring remains.
// Best: clear clearR, then composite hands back from a mask of non-circular regions.

// Detect hand pixels in original: white, inside clearR but outside pearl circle,
// that belong to the elongated hand shapes (not the old round pearl).
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const dx = x - cx;
    const dy = y - cy;
    const d2 = dx * dx + dy * dy;
    if (d2 > clearR * clearR || d2 <= (pearlR + 4) * (pearlR + 4)) continue;
    const i = (y * w + x) * 4;
    if (data[i + 3] < 180 || data[i] < 200) continue;
    // If this pixel is outside the pearl and was white, it is likely a finger tip —
    // restore it from original.
    out[i] = data[i];
    out[i + 1] = data[i + 1];
    out[i + 2] = data[i + 2];
    out[i + 3] = data[i + 3];
  }
}

const S = Math.ceil((pearlR + 18) * 2);
const half = S / 2;
const R = pearlR;

const pearlSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
  <defs>
    <radialGradient id="body" cx="38%" cy="34%" r="66%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="40%" stop-color="#fbfcfe" stop-opacity="0.98"/>
      <stop offset="78%" stop-color="#e8ecf4" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#cfd6e4" stop-opacity="0.78"/>
    </radialGradient>
    <radialGradient id="innerGlow" cx="42%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="bloom" x="-140%" y="-140%" width="380%" height="380%">
      <feGaussianBlur stdDeviation="3.2" result="b"/>
      <feMerge>
        <feMergeNode in="b"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="softBloom" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="1.6" result="b"/>
      <feMerge>
        <feMergeNode in="b"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <circle cx="${half}" cy="${half}" r="${R}" fill="url(#body)"/>
  <circle cx="${half}" cy="${half}" r="${R * 0.72}" fill="url(#innerGlow)"/>

  <!-- primary pearl glimmer -->
  <g transform="translate(${half - R * 0.22}, ${half - R * 0.3})" filter="url(#bloom)">
    <path d="M0 -${R * 0.62} C ${R * 0.06} -${R * 0.14}, ${R * 0.06} ${R * 0.14}, 0 ${R * 0.62}
             C -${R * 0.06} ${R * 0.14}, -${R * 0.06} -${R * 0.14}, 0 -${R * 0.62} Z" fill="#ffffff"/>
    <path d="M-${R * 0.62} 0 C -${R * 0.14} -${R * 0.06}, ${R * 0.14} -${R * 0.06}, ${R * 0.62} 0
             C ${R * 0.14} ${R * 0.06}, -${R * 0.14} ${R * 0.06}, -${R * 0.62} 0 Z" fill="#ffffff"/>
    <path d="M-${R * 0.4} -${R * 0.4} C -${R * 0.05} -${R * 0.12}, ${R * 0.12} ${R * 0.05}, ${R * 0.4} ${R * 0.4}
             C ${R * 0.12} ${R * 0.05}, -${R * 0.05} -${R * 0.12}, -${R * 0.4} -${R * 0.4} Z" fill="#ffffff" opacity="0.92"/>
    <path d="M ${R * 0.4} -${R * 0.4} C ${R * 0.12} -${R * 0.05}, -${R * 0.05} ${R * 0.12}, -${R * 0.4} ${R * 0.4}
             C -${R * 0.12} ${R * 0.05}, ${R * 0.05} -${R * 0.12}, ${R * 0.4} -${R * 0.4} Z" fill="#ffffff" opacity="0.92"/>
    <circle cx="0" cy="0" r="${R * 0.085}" fill="#ffffff"/>
  </g>

  <!-- soft specular pool under the sparkle -->
  <ellipse cx="${half - R * 0.22}" cy="${half - R * 0.3}"
           rx="${R * 0.2}" ry="${R * 0.14}" fill="#ffffff" opacity="0.55" filter="url(#softBloom)"/>

  <!-- tiny secondary twinkle -->
  <g transform="translate(${half + R * 0.28}, ${half + R * 0.12})" filter="url(#softBloom)" opacity="0.8">
    <path d="M0 -${R * 0.16} C ${R * 0.025} -${R * 0.035}, ${R * 0.025} ${R * 0.035}, 0 ${R * 0.16}
             C -${R * 0.025} ${R * 0.035}, -${R * 0.025} -${R * 0.035}, 0 -${R * 0.16} Z" fill="#ffffff"/>
    <path d="M-${R * 0.16} 0 C -${R * 0.035} -${R * 0.025}, ${R * 0.035} -${R * 0.025}, ${R * 0.16} 0
             C ${R * 0.035} ${R * 0.025}, -${R * 0.035} ${R * 0.025}, -${R * 0.16} 0 Z" fill="#ffffff"/>
  </g>
</svg>`;

const pearlPng = await sharp(Buffer.from(pearlSvg)).png().toBuffer();
const punched = await sharp(out, {
  raw: { width: w, height: h, channels: 4 },
}).png().toBuffer();

await sharp(punched)
  .composite([
    {
      input: pearlPng,
      left: Math.round(cx - S / 2),
      top: Math.round(cy - S / 2),
    },
  ])
  .png()
  .toFile(src);

// Verify no leftover ring
const check = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (const r of [70, 90, 100, 108, 115]) {
  const x = cx + r;
  const y = cy;
  const i = (y * w + x) * 4;
  const d = check.data;
  console.log("r", r, "rgba", d[i], d[i + 1], d[i + 2], d[i + 3]);
}
console.log("done", { cx, cy, pearlR, clearR, S });
