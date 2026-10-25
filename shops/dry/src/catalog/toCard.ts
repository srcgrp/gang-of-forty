import type { Card, Offer, Product, Stock } from '../types.ts'
import { formatPercent, formatPrice } from './format.ts'
import { finalPrice, inStock } from './price.ts'
import { imageFor }   from './image.ts'
export function toCard(product: Product, stock: Stock, offer: Offer | undefined): Card {
  return {
    id: product.id,
    title: product.name,
    unit: product.unit,
    emoji: product.emoji,
    image: imageFor(product.id),
    price: formatPrice(finalPrice(product.price, offer)),
    oldPrice: offer ? formatPrice(product.price) : null,
    discount: offer ? formatPercent(offer.percent) : null,
    inStock: inStock(stock, product.id),
  }
}