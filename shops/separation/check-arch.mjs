// Architecture check for the separation shop (Week 4).
// Usage: node check-arch.mjs src --shop
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const root = process.argv[2] ?? 'src'

function listTs(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) out.push(...listTs(full))
    else if (name.endsWith('.ts')) out.push(full)
  }
  return out
}

function layerOf(file) {
  const rel = relative(root, file).split(sep).join('/')
  if (rel === 'types.ts') return 'types'
  if (rel === 'main.ts') return 'main'
  if (rel.startsWith('api/') || rel.startsWith('storage/')) return 'data'
  if (rel.startsWith('cart/') || rel.startsWith('catalog/')) return 'logic'
  if (rel.startsWith('ui/')) return 'ui'
  return 'other'
}

const allowed = {
  types: [],
  data: ['types', 'data'],
  logic: ['types', 'logic'],
  ui: ['types', 'ui'],
  main: ['types', 'data', 'logic', 'ui', 'main'],
  other: ['types', 'data', 'logic', 'ui', 'main', 'other'],
}

let failed = false
const fail = (msg) => {
  failed = true
  console.error(`❌ ${msg}`)
}

let files = []
try {
  files = listTs(root)
} catch {
  fail(`پوشه پیدا نشد: ${root}`)
}

if (files.length === 0) fail('فایل TypeScript پیدا نشد')

for (const f of files) {
  const base = f.split(sep).pop() ?? ''
  if (base === 'helpers.ts' || base === 'utils.ts') {
    fail(`${f}: فایل helpers/utils ممنوع است`)
  }
  const text = readFileSync(f, 'utf8')
  const lines = text.split('\n').length
  if (lines > 70) fail(`${f}: بیشتر از ۷۰ خط دارد (${lines})`)
  if (/(^|\s)enum\s/.test(text)) fail(`${f}: enum ممنوع است`)
  if (/@ts-ignore|@ts-expect-error/.test(text)) fail(`${f}: ts-ignore ممنوع است`)
  const noComments = text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '')
  if (/\bany\b/.test(noComments)) fail(`${f}: any ممنوع است`)
  const withoutAsConst = noComments.replace(/\bas\s+const\b/g, '')
  if (/\bas\b/.test(withoutAsConst)) fail(`${f}: استفاده از as ممنوع است (به‌جز as const)`)
  const withoutNeq = withoutAsConst.replace(/!==?/g, '')
  if (/!/.test(withoutNeq)) fail(`${f}: استفاده از ! ممنوع است`)
  const layer = layerOf(f)
  const imports = [...text.matchAll(/from\s+['"]([^'"]+)['"]/g)].map((m) => m[1])
  if (layer === 'types' && imports.length > 0) {
    fail(`${f}: لایه types نباید چیزی import کند`)
  }
  for (const imp of imports) {
    if (imp.startsWith('.') === false) continue
    let target = imp.replace(/\.ts$/, '').replace(/^\.\//, '').replace(/^\.\.\//, '')
    let targetLayer = 'other'
    if (target.startsWith('types')) targetLayer = 'types'
    else if (target.startsWith('api') || target.startsWith('storage')) targetLayer = 'data'
    else if (target.startsWith('cart') || target.startsWith('catalog')) targetLayer = 'logic'
    else if (target.startsWith('ui')) targetLayer = 'ui'
    else if (target.startsWith('main')) targetLayer = 'main'
    else {
      const parts = relative(root, join(f, '..', imp)).split(sep).join('/')
      targetLayer = layerOf(join(root, parts))
    }
    const ok = (allowed[layer] ?? []).includes(targetLayer)
    if (ok === false) fail(`${f}: import غیرمجاز از لایه ${targetLayer} (${imp})`)
  }
  const has = (re) => re.test(noComments)
  if (layer === 'types' && (has(/fetch\s*\(/) || has(/document/) || has(/localStorage/))) {
    fail(`${f}: لایه types نباید fetch/document/localStorage داشته باشد`)
  }
  if (f.includes(`${sep}api${sep}`) && (has(/document/) || has(/localStorage/))) {
    fail(`${f}: لایه api نباید document/localStorage داشته باشد`)
  }
  if (f.includes(`${sep}storage${sep}`) && (has(/document/) || has(/fetch\s*\(/))) {
    fail(`${f}: لایه storage نباید document/fetch داشته باشد`)
  }
  if (layer === 'logic' && (has(/document/) || has(/fetch\s*\(/) || has(/localStorage/))) {
    fail(`${f}: لایه logic باید خالص باشد (بدون fetch/document/localStorage)`)
  }
  if (layer === 'ui' && (has(/fetch\s*\(/) || has(/localStorage/))) {
    fail(`${f}: لایه ui نباید fetch/localStorage داشته باشد`)
  }
  if (layer === 'main' && (has(/fetch\s*\(/) || has(/localStorage/))) {
    fail(`${f}: لایه main نباید مستقیم fetch/localStorage کند (از لایه data استفاده کن)`)
  }
}

if (failed === false) console.log('✅ معماری سالم است.')
process.exit(failed ? 1 : 0)
