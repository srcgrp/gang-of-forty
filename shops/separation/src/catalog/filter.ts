import type { Category, Product, Sort } from '../types.ts'

export function categoryIdOf(cats: Category[], slug: string | undefined): number | undefined {
  if (slug === undefined) return undefined
  for (const c of cats) {
    if (c.slug === slug) return c.id
  }
  return undefined
}

export function filterProducts(
  products: Product[],
  categoryId: number | undefined,
  query: string,
): Product[] {
  const q = query.trim()
  const out: Product[] = []
  for (const p of products) {
    if (categoryId !== undefined && p.categoryId !== categoryId) continue
    if (q !== '' && p.name.includes(q) === false) continue
    out.push(p)
  }
  return out
}

export function sortProducts(products: Product[], sort: Sort): Product[] {
  const copy = [...products]
  if (sort === 'ارزان‌ترین') copy.sort((a, b) => a.price - b.price)
  if (sort === 'گران‌ترین') copy.sort((a, b) => b.price - a.price)
  return copy
}
