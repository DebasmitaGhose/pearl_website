import { readFileSync, writeFileSync } from "fs";

const path = "content/publications.yaml";
let text = readFileSync(path, "utf8");

const fixes = [
  [/\u00e2\u20ac\u201c/g, "\u2013"],
  [/\u00e2\u20ac\u201d/g, "\u2014"],
  [/\u00e2\u20ac\u2018/g, "\u2011"],
];

for (const [pattern, replacement] of fixes) {
  text = text.replace(pattern, replacement);
}

writeFileSync(path, text, "utf8");
console.log("Encoding fixed.");
