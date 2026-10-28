import { getJSON } from './getJson.ts'
import { isCategory, isOffer, isProduct, isStock } from './guards.ts'
import type { Category, Offer, Product, Stock } from '../types.ts'

function apiUrl(path: string): string {
  const base: unknown = import.meta.env.VITE_API_URL
  if (typeof base !== 'string' || base === '') {
    throw new Error('VITE_API_URL در فایل env تنظیم نشده است')
  }
  return `${base}/${path}`
}

export async function loadProducts(): Promise<Product[]> {
  const raw: unknown = await getJSON(apiUrl('products.json'))
  if (Array.isArray(raw) === false) throw new Error('products.json آرایه نیست')
  const good: Product[] = []
  let bad = 0
  for (const item of raw) {
    if (isProduct(item)) good.push(item)
    else bad += 1
  }
  if (bad > 0) console.warn(`${bad} محصول خراب حذف شد`)
  return good
}

export async function loadCategories(): Promise<Category[]> {
  const raw: unknown = await getJSON(apiUrl('categories.json'))
  if (Array.isArray(raw) === false) throw new Error('categories.json آرایه نیست')
  const good: Category[] = []
  for (const item of raw) {
    if (isCategory(item)) good.push(item)
  }
  return good
}

export async function loadOffers(): Promise<Offer[]> {
  const raw: unknown = await getJSON(apiUrl('offers.json'))
  if (Array.isArray(raw) === false) return []
  const good: Offer[] = []
  for (const item of raw) {
    if (isOffer(item)) good.push(item)
  }
  return good
}

export async function loadStock(): Promise<Stock | null> {
  const raw: unknown = await getJSON(apiUrl('stock.json'))
  if (isStock(raw)) return raw
  console.warn('stock.json نامعتبر است')
  return null
}
