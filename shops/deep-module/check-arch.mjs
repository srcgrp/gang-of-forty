import { readdirSync, readFileSync, existsSync } from "node:fs";
import { resolve, dirname, relative, join } from "node:path";

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const srcDir = args[0] || "src";

const LAYER_ORDER = {
  "shared/types": 0,
  "shared/api": 1,
  "shared/ui": 1,
  "features/cart": 2,
  "features/catalog": 2,
  "features/theme": 2,
  "features/filter": 2,
  "main-render": 3,
  main: 3,
};

function listFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full));
    else if (entry.name.endsWith(".ts")) out.push(full);
  }
  return out;
}

function layerOf(file) {
  const rel = relative(srcDir, file).replace(/\\/g, "/").replace(/\.ts$/, "");
  if (rel === "shared/types") return "shared/types";
  if (rel === "main") return "main";
  if (rel === "main-render") return "main-render";

  const parts = rel.split("/");
  if (parts.length >= 2) {
    return `${parts[0]}/${parts[1]}`;
  }
  return "other";
}

function importsOf(file) {
  const text = readFileSync(file, "utf8");
  const imports = [];
  const re = /(?:from|import)\s+["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(text))) imports.push(m[1]);
  return imports;
}

function resolveRel(from, spec) {
  if (!spec.startsWith(".")) return null;
  const base = resolve(dirname(from), spec);
  for (const p of [base + ".ts", base + "/index.ts", base]) {
    if (existsSync(p)) return p;
  }
  return null;
}

const files = listFiles(srcDir);
const errors = [];

// Rule 1: shared/types نباید import داشته باشد
for (const f of files) {
  if (layerOf(f) === "shared/types" && importsOf(f).length > 0) {
    errors.push(`${relative(".", f)}: types.ts باید بدون import باشد`);
  }
}

// Rule 2: importها فقط به پایین
for (const f of files) {
  const fromLayer = layerOf(f);
  const fromLvl = LAYER_ORDER[fromLayer];
  if (fromLvl === undefined) continue;
  for (const spec of importsOf(f)) {
    const target = resolveRel(f, spec);
    if (!target) continue;
    const toLayer = layerOf(target);
    const toLvl = LAYER_ORDER[toLayer];
    if (toLvl === undefined) continue;
    if (toLvl > fromLvl) {
      errors.push(
        `${relative(".", f)} → ${relative(".", target)}: import غیرمجاز (${fromLayer} → ${toLayer})`,
      );
    }
  }
}

// Rule 3: circular dependency
const graph = new Map();
for (const f of files) {
  const deps = importsOf(f)
    .map((spec) => resolveRel(f, spec))
    .filter(Boolean);
  graph.set(f, deps);
}

function reachesStart(start, current, visited) {
  if (visited.has(current)) return false;
  visited.add(current);
  for (const dep of graph.get(current) || []) {
    if (dep === start) return true;
    if (reachesStart(start, dep, visited)) return true;
  }
  return false;
}

for (const f of files) {
  const hasCycle = (graph.get(f) || []).some(
    (dep) => dep === f || reachesStart(f, dep, new Set()),
  );
  if (hasCycle) {
    errors.push(`circular dependency detected around ${relative(".", f)}`);
  }
}

if (errors.length === 0) {
  console.log(`✓ All layer imports are valid. No circular dependencies found.`);
  console.log(`  Checked ${files.length} file(s) in ${srcDir}/`);
  process.exit(0);
} else {
  console.error(`✗ ${errors.length} error(s) found:`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
