import { getCatalog } from './api/endpoints'
import { addLine } from './cart/cart'
import { stockOf } from './catalog/pricing'
import { buildView } from './catalog/view'
import { loadCart, saveCart } from './storage/cartStorage'
import { readFilters, writeFilters } from './storage/urlState'
import { isSort, type CartLine, type Catalog, type Filters, type LoadState } from './types'
import { queryElements } from './ui/elements'
import { bindEvents } from './ui/events'
import { renderPage } from './ui/render'

const els = queryElements()
let catalog: Catalog | null = null
let load: LoadState = { status: 'loading' }
let cart: CartLine[] = loadCart()
let filters: Filters = readFilters()

const paint = (): void => renderPage(els, buildView(load, catalog, filters, cart))

const setFilters = (next: Filters): void => {
  filters = next
  writeFilters(next)
  paint()
}

bindEvents(els, {
  onSearch: (query) => setFilters({ ...filters, query }),
  onSort: (value) => setFilters({ ...filters, sort: isSort(value) ? value : 'default' }),
  onCategory: (category) => setFilters({ ...filters, category }),
  onAdd: (id) => {
    if (catalog === null) return
    cart = addLine(cart, id, stockOf(catalog.stock, id))
    saveCart(cart)
    paint()
  },
})

const start = async (): Promise<void> => {
  paint()
  try {
    catalog = await getCatalog()
    load = catalog.products.length === 0 ? { status: 'empty' } : { status: 'success', products: catalog.products }
  } catch (err: unknown) {
    console.error(err)
    load = { status: 'error', message: err instanceof Error ? err.message : 'unknown error' }
  }
  paint()
}

void start()
