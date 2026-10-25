// Week 4 · Lesson 5 — checks how you split shop.ts.   Run: node check-arch.mjs src/l5
// tsc checks the types (npm run check); this checks the architecture:
// who may import whom, which layer may touch the page, the network or storage.
//
// The layer of a file comes from its path inside the folder:
//   types.ts or types/          types  the model, imports nothing
//   api/  storage/  data/       data   talks to the outside: fetch, localStorage
//   ui/                         ui     the page: document, DOM elements
//   main.ts                     main   wires everything together
//   any other folder or file    logic  the rules, pure functions
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, normalize, relative } from "node:path";

const root = process.argv[2];
if (!root) {
  console.log("Usage: node check-arch.mjs src/l5");
  process.exit(1);
}

// Who may import whom. Imports point down; a layer may also use its own layer.
const ALLOWED = {
  main: ["main", "ui", "logic", "data", "types"],
  ui: ["ui", "types"],
  logic: ["logic", "types"],
  data: ["data", "types"],
  types: ["types"],
};
// Words a layer must not use: the page, the network, storage.
const FORBIDDEN = {
  types: ["document", "window", "fetch", "localStorage"],
  logic: ["document", "window", "fetch", "localStorage"],
  data: ["document"],
  ui: ["fetch", "localStorage"],
  main: [],
};
// Every function of the original shop.ts must still exist somewhere.
// addAndSave is not here: it did two jobs, so it should be gone.
const FUNCTIONS = [
  "getJSON",
  "isProduct",
  "isCategory",
  "isOffer",
  "isCartLine",
  "loadProducts",
  "loadCategories",
  "loadOffers",
  "loadStock",
  "saveCart",
  "loadCart",
  "finalPrice",
  "inStock",
  "formatPrice",
  "addToCart",
  "removeFromCart",
  "cartCount",
  "cartTotal",
  "cartRows",
  "visibleProducts",
  "toCard",
  "renderStatus",
  "renderCategories",
  "renderProducts",
  "renderCart",
  "renderTotal",
  "render",
  "start",
];
const MAX_LINES = 70;

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".ts"))
      files.push(relative(root, path).split("\\").join("/"));
  }
};
walk(root);

const layerOf = (file) => {
  const first = file.split("/")[0];
  if (file === "main.ts") return "main";
  if (first === "types.ts" || first === "types") return "types";
  if (["api", "storage", "data"].includes(first)) return "data";
  if (first === "ui") return "ui";
  return "logic";
};
// the code without comments and strings, so a word in a comment does not count
const codeOf = (text) =>
  text
    .replace(/\/\/.*$/gm, "")
    .replace(/'(\\.|[^'\\])*'|`(\\.|[^`\\])*`/g, "''");

const problems = [];
const graph = {};
for (const file of files) {
  const text = readFileSync(join(root, file), "utf8");
  const layer = layerOf(file);
  const lines = text.trimEnd().split("\n").length;
  if (/(^|\/)(utils|helpers|misc|common|stuff)(\/|\.ts$)/.test(file))
    problems.push(`${file}: name it after what it does, not utils / helpers`);
  if (lines > MAX_LINES)
    problems.push(
      `${file}: ${lines} lines (max ${MAX_LINES}): it still does more than one job`,
    );
  for (const word of FORBIDDEN[layer]) {
    if (new RegExp(`\\b${word}\\b`).test(codeOf(text)))
      problems.push(`${file}: the ${layer} layer must not use ${word}`);
  }
  graph[file] = [];
  for (const [, spec] of text.matchAll(/^import\s[^']*'([^']+)'/gm)) {
    if (!spec.startsWith(".")) continue;
    let target = normalize(join(dirname(file), spec))
      .split("\\")
      .join("/")
      .replace(/\.js$/, ".ts");
    if (!target.endsWith(".ts")) target += ".ts";
    if (!files.includes(target)) {
      problems.push(`${file}: imports ${spec}, which is not a file in ${root}`);
      continue;
    }
    graph[file].push(target);
    if (!ALLOWED[layer].includes(layerOf(target)))
      problems.push(
        `${file} → ${target}: ${layer} must not import ${layerOf(target)}`,
      );
  }
}

// a circle: a file that, following its imports, comes back to itself
const reaches = (from, to, seen = new Set()) =>
  graph[from].some(
    (next) =>
      next === to ||
      (!seen.has(next) && (seen.add(next), reaches(next, to, seen))),
  );
for (const file of files)
  if (reaches(file, file))
    problems.push(`${file}: is part of an import circle`);

const all = files.map((f) => readFileSync(join(root, f), "utf8")).join("\n");
for (const name of FUNCTIONS) {
  if (!new RegExp(`function\\s+${name}\\b|const\\s+${name}\\s*=`).test(all))
    problems.push(`function ${name} is missing`);
}
if (files.includes("shop.ts"))
  problems.push("shop.ts is still there: main.ts is the entry now");
if (!files.includes("main.ts")) problems.push("there is no main.ts");

const byLayer = {};
for (const f of files) (byLayer[layerOf(f)] ??= []).push(f);
for (const layer of ["main", "ui", "logic", "data", "types"])
  console.log(layer.padEnd(6), (byLayer[layer] || []).join("  "));
console.log("");
if (problems.length === 0) {
  console.log(
    `✅ ${files.length} files, every import points down, no circles. Now run: npm run check`,
  );
} else {
  for (const p of problems) console.log("❌ " + p);
  console.log(`\n${problems.length} problems`);
  process.exitCode = 1;
}
