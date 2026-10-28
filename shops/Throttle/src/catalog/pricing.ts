import type { Offer, Product, Stock } from '../types'

export const offerFor = (offers: readonly Offer[], productId: number): Offer | undefined =>
  offers.find((o) => o.productId === productId)

export const finalPrice = (product: Pick<Product, 'price'>, offer: Offer | undefined): number =>
  offer === undefined ? product.price : Math.round((product.price * (100 - offer.percent)) / 100)

export const stockOf = (stock: Stock, productId: number): number =>
  stock.items[String(productId)] ?? 0
