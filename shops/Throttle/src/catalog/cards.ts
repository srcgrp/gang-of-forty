import type { CardData, Catalog, Product } from '../types'
import { finalPrice, offerFor, stockOf } from './pricing'

export const buildCards = (products: readonly Product[], catalog: Catalog): CardData[] =>
  products.map((product) => {
    const offer = offerFor(catalog.offers, product.id)
    return {
      product,
      offer,
      price: finalPrice(product, offer),
      stock: stockOf(catalog.stock, product.id),
    }
  })
