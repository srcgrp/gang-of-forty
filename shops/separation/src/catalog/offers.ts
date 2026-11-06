import type { Category, Offer, Product, StockMap } from '../types.ts'

export type PricedItem = {
  product: Product
  price: number
  oldPrice?: number
  percent?: number
  soldOut?: boolean
}

export function priceOf(product: Product, offers: Offer[], stock: StockMap): PricedItem {
  let item: PricedItem = { product, price: product.price }
  for (const o of offers) {
    if (o.productId === product.id) {
      const price = Math.round((product.price * (100 - o.percent)) / 100)
      item = { product, price, oldPrice: product.price, percent: o.percent }
    }
  }
  if (stock[product.id] === 0) item.soldOut = true
  return item
}

export function splitShop(
  products: Product[],
  offers: Offer[],
  cats: Category[],
  stock: StockMap,
): { sales: PricedItem[]; milks: PricedItem[] } {
  let dairyId = 0
  for (const c of cats) if (c.slug === 'dairy') dairyId = c.id
  const sales: PricedItem[] = []
  const milks: PricedItem[] = []
  for (const p of products) {
    const item = priceOf(p, offers, stock)
    if (item.percent !== undefined) sales.push(item)
    if (p.categoryId === dairyId) milks.push(item)
  }
  return { sales, milks }
}
