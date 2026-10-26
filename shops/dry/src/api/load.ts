import type { LoadState, Offer, Product, Stock } from '../types.ts'
import { getJSON, type ApiFile } from './http.ts'
import { isOffer, isProduct, isStock } from './guards.ts'

async function loadList<T>(file: ApiFile, guard: (x: unknown) => x is T): Promise<T[]> {
  const data: unknown = await getJSON(file)
  if (!Array.isArray(data)) throw new Error(`${file}: expected a list`)
  const items: unknown[] = data
  const good: T[] = items.filter(guard)
  const bad: number = items.length - good.length
  if (bad > 0) console.warn(`${file}: ${bad} invalid item(s) were dropped`)
  return good
}

async function loadStock(): Promise<Stock> {
  const data: unknown = await getJSON('stock.json')
  if (!isStock(data)) throw new Error('stock.json: unexpected shape')
  return data
}

export async function loadState(): Promise<LoadState> {
  try {
    const [products, offers, stock]: [Product[], Offer[], Stock] = await Promise.all([
      loadList('products.json', isProduct),
      loadList('offers.json', isOffer),
      loadStock(),
    ])
    if (products.length === 0) return { status: 'empty' }
    return { status: 'success', products, stock, offers }
  } catch (err) {
    console.error(err)
    return {
      status: 'error',
      message: 'بارگذاری محصولات ممکن نشد. اتصال اینترنت را بررسی کنید و صفحه را دوباره باز کنید.',
    }
  }
}