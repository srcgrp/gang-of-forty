import { loadShop } from './shop'
import { loadHome } from './home'
import { loadCategories } from './categories'
import { loadProducts } from './products'
import { loadOffers } from './offers'
import { loadStock } from './stock'
import type { LoadState } from '../types'

export async function loadAllData() {
  const [shop, home, categories, products, offers, stock] = await Promise.all([
    loadShop(),
    loadHome(),
    loadCategories(),
    loadProducts(),
    loadOffers(),
    loadStock(),
  ])
  const offerMap = new Map(offers.map((offer) => [offer.productId, offer]))
  const res: LoadState = products.length === 0
    ? { status: 'empty' }
    : { status: 'success', products }
  return { shop, home, categories, products, stock, offerMap, res }
}
