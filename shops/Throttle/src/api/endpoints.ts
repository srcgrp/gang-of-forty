import type { Catalog, Category, Offer, Product, Shop, Stock } from '../types'
import { getJSON } from './client'
import { isCategory, isOffer, isProduct, isShop, isStock } from './guards'

const getList = async <T>(path: string, guard: (x: unknown) => x is T): Promise<T[]> => {
  const data: unknown = await getJSON(path)
  if (!Array.isArray(data)) throw new Error(`${path}: expected a list`)
  const valid: T[] = data.filter(guard)
  const dropped: number = data.length - valid.length
  if (dropped > 0) console.warn(`${path}: dropped ${dropped} invalid item(s)`)
  return valid
}

const getChecked = async <T>(path: string, guard: (x: unknown) => x is T): Promise<T> => {
  const data: unknown = await getJSON(path)
  if (!guard(data)) throw new Error(`${path}: unexpected shape`)
  return data
}

const getShop = async (): Promise<Shop | null> => {
  try {
    return await getChecked('shop.json', isShop)
  } catch (err: unknown) {
    console.warn('shop.json ignored:', err)
    return null
  }
}

export const getCatalog = async (): Promise<Catalog> => {
  const [products, categories, stock, offers, shop] = await Promise.all([
    getList<Product>('products.json', isProduct),
    getList<Category>('categories.json', isCategory),
    getChecked<Stock>('stock.json', isStock),
    getList<Offer>('offers.json', isOffer),
    getShop(),
  ])
  return { products, categories, stock, offers, shop }
}
