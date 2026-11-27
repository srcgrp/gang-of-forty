import type { Category, LoadState, Offer, Product, Stock } from '../../../shared/types.ts'
import { isCategory, isOffer, isProduct, isStock } from './guards.ts'
import { getJSON, type ApiFile } from './http.ts'

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
      const [products, offers, categories, stock]: [Product[], Offer[], Category[], Stock] =
      await Promise.all([
        loadList('products.json', isProduct),
        loadList('offers.json', isOffer),
        loadList('categories.json', isCategory),
        loadStock(),
      ])
    if (products.length === 0) return { status: 'empty' }
       return { status: 'success', products, stock, offers, categories }
  } catch (err) {
    console.error(err)
    return {
      status: 'error',
      message: 'بارگذاری محصولات ممکن نشد. اتصال اینترنت را بررسی کنید و صفحه را دوباره باز کنید.',
    }
  }
}