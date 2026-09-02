/**
 * Stashes server-only app routes (Keystatic API + admin UI) so `output: export` can succeed.
 * Restored automatically after build. Local `npm run dev` keeps full Keystatic support.
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const root = process.cwd();
const stashRoot = path.join(root, ".static-skip");

const stashPaths = ["app/api", "app/keystatic"];

function stash() {
  fs.mkdirSync(stashRoot, { recursive: true });
  for (const rel of stashPaths) {
    const from = path.join(root, rel);
    if (!fs.existsSync(from)) continue;
    const to = path.join(stashRoot, rel.replace(/\//g, "__"));
    if (fs.existsSync(to)) fs.rmSync(to, { recursive: true, force: true });
    fs.renameSync(from, to);
    console.log(`stashed ${rel}`);
  }
}

function restore() {
  if (!fs.existsSync(stashRoot)) return;
  for (const rel of stashPaths) {
    const to = path.join(root, rel);
    const from = path.join(stashRoot, rel.replace(/\//g, "__"));
    if (!fs.existsSync(from)) continue;
    fs.mkdirSync(path.dirname(to), { recursive: true });
    if (fs.existsSync(to)) fs.rmSync(to, { recursive: true, force: true });
    fs.renameSync(from, to);
    console.log(`restored ${rel}`);
  }
  try {
    fs.rmdirSync(stashRoot);
  } catch {
    // ignore non-empty
  }
}

const command = process.argv[2];

if (command === "stash") {
  stash();
} else if (command === "restore") {
  restore();
} else if (command === "build") {
  try {
    stash();
    execSync("next build", {
      stdio: "inherit",
      cwd: root,
      env: { ...process.env, STATIC_EXPORT: "true" },
    });
  } finally {
    restore();
  }
} else {
  console.error("Usage: node scripts/static-build.mjs stash|restore|build");
  process.exit(1);
}
