import type { Category, Offer, Product } from '../types.ts'

export type PricedItem = {
  product: Product
  price: number
  oldPrice?: number
  percent?: number
}

export function priceOf(product: Product, offers: Offer[]): PricedItem {
  for (const o of offers) {
    if (o.productId === product.id) {
      const price = Math.round((product.price * (100 - o.percent)) / 100)
      return { product, price, oldPrice: product.price, percent: o.percent }
    }
  }
  return { product, price: product.price }
}

export function splitShop(
  products: Product[],
  offers: Offer[],
  cats: Category[],
): { sales: PricedItem[]; milks: PricedItem[] } {
  let dairyId = 0
  for (const c of cats) if (c.slug === 'dairy') dairyId = c.id
  const sales: PricedItem[] = []
  const milks: PricedItem[] = []
  for (const p of products) {
    const item = priceOf(p, offers)
    if (item.percent !== undefined) sales.push(item)
    if (p.categoryId === dairyId) milks.push(item)
  }
  return { sales, milks }
}
