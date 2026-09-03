import { readFileSync } from "fs";

const text = readFileSync("content/publications.yaml", "utf8");
const idx = text.indexOf("human");
const sample = text.slice(idx, idx + 20);
console.log([...sample].map((c) => c.charCodeAt(0).toString(16)).join(" "));
