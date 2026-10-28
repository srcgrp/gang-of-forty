// Usage:
//   node check-arch.mjs src                (Standard layer-based architecture)
//   node check-arch.mjs src --feature-based (Feature-based architecture)
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, dirname, normalize } from 'node:path'

const root = process.argv[2]
const isFeatureBased = process.argv.includes('--feature-based')

if (!root) {
  console.log('Usage: node check-arch.mjs src [--feature-based]')
  process.exit(1)
}

const ALLOWED = {
  main: ['main', 'ui', 'logic', 'data', 'types'],
  ui: ['ui', 'types'],
  logic: ['logic', 'types'],
  data: ['data', 'types'],
  types: ['types'],
}

const FORBIDDEN = {
  types: ['document', 'window', 'fetch', 'localStorage'],
  logic: ['document', 'window', 'fetch', 'localStorage'],
  data: ['document'],
  ui: ['fetch', 'localStorage'],
  main: [],
}

const FUNCTIONS = [
  'getJSON', 'isProduct', 'isCategory', 'isOffer', 'isCartLine',
  'loadProducts', 'loadCategories', 'loadOffers', 'loadStock', 'saveCart', 'loadCart',
  'finalPrice', 'inStock', 'formatPrice', 'addToCart', 'removeFromCart', 'cartCount', 'cartTotal',
  'cartRows', 'visibleProducts', 'toCard',
  'renderStatus', 'renderCategories', 'renderProducts', 'renderCart', 'renderTotal', 'render', 'start',
]
const MAX_LINES = 70

const files = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path)
    else if (name.endsWith('.ts')) files.push(relative(root, path).split('\\').join('/'))
  }
}
walk(root)

const featureOf = (file) => {
  const match = file.match(/^features\/([^/]+)\//)
  return match ? match[1] : null
}

const layerOf = (file) => {
  const parts = file.split('/')
  const first = parts[0]

  if (file === 'main.ts') return 'main'
  if (file === 'types.ts' || file === 'shared/types.ts' || first === 'types') return 'types'

  if (isFeatureBased) {
    if (first === 'features') {
      if (parts[2] === 'ui') return 'ui'
      if (['api', 'storage', 'data'].includes(parts[2])) return 'data'
      return 'logic'
    }
    if (first === 'shared') {
      if (['api', 'storage', 'data'].includes(parts[1])) return 'data'
      if (parts[1] === 'ui') return 'ui'
      return 'logic'
    }
  }

  if (['api', 'storage', 'data'].includes(first)) return 'data'
  if (first === 'ui') return 'ui'
  return 'logic'
}

// the code without comments and strings, so a word in a comment does not count
const codeOf = (text) => text.replace(/\/\/.*$/gm, '').replace(/'(\\.|[^'\\])*'|`(\\.|[^`\\])*`/g, "''")

const problems = []
const graph = {}
for (const file of files) {
  const text = readFileSync(join(root, file), 'utf8')
  const layer = layerOf(file)
  const lines = text.trimEnd().split('\n').length
  const first = file.split('/')[0]

  // New rule for feature-based mode
  if (isFeatureBased && first !== 'features' && first !== 'shared' && file !== 'main.ts') {
    problems.push(`${file}: in feature mode, files must be inside 'shared/' or 'features/'`)
  }

  if (/(^|\/)(utils|helpers|misc|common|stuff)(\/|\.ts$)/.test(file)) problems.push(`${file}: name it after what it does, not utils / helpers`)
  if (lines > MAX_LINES) problems.push(`${file}: ${lines} lines (max ${MAX_LINES}): it still does more than one job`)
  
  for (const word of FORBIDDEN[layer]) {
    if (new RegExp(`\\b${word}\\b`).test(codeOf(text))) problems.push(`${file}: the ${layer} layer must not use ${word}`)
  }
  
  graph[file] = []
  for (const [, spec] of text.matchAll(/^import\s[^']*'([^']+)'/gm)) {
    if (!spec.startsWith('.')) continue
    let target = normalize(join(dirname(file), spec)).split('\\').join('/').replace(/\.js$/, '.ts')
    if (!target.endsWith('.ts')) target += '.ts'
    if (!files.includes(target)) {
      problems.push(`${file}: imports ${spec}, which is not a file in ${root}`)
      continue
    }
    graph[file].push(target)

    if (isFeatureBased) {
      const sourceFeature = featureOf(file)
      const targetFeature = featureOf(target)

      if (sourceFeature && targetFeature && sourceFeature !== targetFeature) {
        problems.push(`${file} → ${target}: features must not import each other`)
      }

      if (targetFeature && !sourceFeature && file !== 'main.ts') {
        problems.push(`${file} → ${target}: shared code must not import features`)
      }

      const sameFeature = sourceFeature !== null && sourceFeature === targetFeature
      const sameFeatureUiToLogic = sameFeature && layer === 'ui' && layerOf(target) === 'logic'

      if (!ALLOWED[layer].includes(layerOf(target)) && !sameFeatureUiToLogic) {
        problems.push(`${file} → ${target}: ${layer} must not import ${layerOf(target)}`)
      }
    } else {
      if (!ALLOWED[layer].includes(layerOf(target))) {
        problems.push(`${file} → ${target}: ${layer} must not import ${layerOf(target)}`)
      }
    }
  }
}

// a circle: a file that, following its imports, comes back to itself
const reaches = (from, to, seen = new Set()) =>
  graph[from].some((next) => next === to || (!seen.has(next) && (seen.add(next), reaches(next, to, seen))))
for (const file of files) if (reaches(file, file)) problems.push(`${file}: is part of an import circle`)

const all = files.map((f) => readFileSync(join(root, f), 'utf8')).join('\n')
for (const name of FUNCTIONS) {
  if (!new RegExp(`function\\s+${name}\\b|const\\s+${name}\\s*=`).test(all)) problems.push(`function ${name} is missing`)
}
if (files.includes('shop.ts')) problems.push('shop.ts is still there: main.ts is the entry now')
if (!files.includes('main.ts')) problems.push('there is no main.ts')

const byLayer = {}
for (const f of files) (byLayer[layerOf(f)] ??= []).push(f)
for (const layer of ['main', 'ui', 'logic', 'data', 'types']) console.log(layer.padEnd(6), (byLayer[layer] || []).join('  '))
console.log('')
if (problems.length === 0) {
  console.log(`✅ ${files.length} files, every import points down, no circles. Now run: npm run check`)
} else {
  for (const p of problems) console.log('❌ ' + p)
  console.log(`\n${problems.length} problems`)
  process.exitCode = 1
}