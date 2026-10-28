import { countItems } from '../cart/cart'
import { summarize } from '../cart/summary'
import type { CartLine, Catalog, Filters, LoadState, ViewModel } from '../types'
import { buildCards } from './cards'
import { filterProducts, sortProducts } from './query'

const noData = (state: LoadState, filters: Filters, cart: readonly CartLine[]): ViewModel => ({
  state,
  cards: [],
  categories: [],
  filters,
  summary: { count: countItems(cart), total: 0 },
  shop: null,
})

export const buildView = (
  load: LoadState,
  catalog: Catalog | null,
  filters: Filters,
  cart: readonly CartLine[],
): ViewModel => {
  if (load.status !== 'success' || catalog === null) return noData(load, filters, cart)
  const found = filterProducts(catalog.products, catalog.categories, filters)
  const visible = sortProducts(found, filters.sort, catalog.offers)
  return {
    state: visible.length === 0 ? { status: 'empty' } : { status: 'success', products: visible },
    cards: buildCards(visible, catalog),
    categories: catalog.categories,
    filters,
    summary: summarize(cart, catalog),
    shop: catalog.shop,
  }
}
