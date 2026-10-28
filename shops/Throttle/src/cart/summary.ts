import { finalPrice, offerFor } from '../catalog/pricing'
import type { CartLine, CartSummary, Catalog } from '../types'
import { countItems } from './cart'

export const summarize = (
  cart: readonly CartLine[],
  catalog: Pick<Catalog, 'products' | 'offers'>,
): CartSummary => {
  const total: number = cart.reduce((sum, line) => {
    const product = catalog.products.find((p) => p.id === line.id)
    if (product === undefined) return sum
    return sum + finalPrice(product, offerFor(catalog.offers, product.id)) * line.qty
  }, 0)
  return { count: countItems(cart), total }
}
