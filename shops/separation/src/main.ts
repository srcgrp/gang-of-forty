import { loadCategories, loadOffers, loadProducts, loadStock } from './api/loadShop.ts'
import { addLine, cartCount, cartTotal, joinCart, removeLine } from './cart/cart.ts'
import { categoryIdOf, filterProducts, sortProducts } from './catalog/filter.ts'
import { splitShop } from './catalog/offers.ts'
import { loadCart, saveCart } from './storage/cartStorage.ts'
import { readFilters, subscribeFilters, writeFilters } from './storage/urlState.ts'
import { readElements, setQuery, wireSearch, wireSort } from './ui/controls.ts'
import { renderCart } from './ui/cartView.ts'
import { renderCategories } from './ui/categories.ts'
import { renderProducts } from './ui/productCards.ts'
import { renderLoadState } from './ui/statusView.ts'
import { SORTS, type CartLine, type Category, type Offer, type Product, type Sort, type StockMap } from './types.ts'
const el = readElements()
const start = readFilters()
let all: Product[] = []
let cats: Category[] = []
let offers: Offer[] = []
let cart = loadCart()
let stock: StockMap = {}
let catSlug = start.category
let query = start.query
let sort: Sort = SORTS[0]
function refresh(): void {
  const rows = splitShop(sortProducts(filterProducts(all, categoryIdOf(cats, catSlug), query), sort), offers, cats, stock)
  const add = (id: number): void => save(addLine(cart, id))
  renderProducts(el.salesCar, rows.sales, add)
  renderProducts(el.dairyCar, rows.milks, add)
  renderCategories(el.catBox, cats, catSlug, (slug) => applyFilters(slug, query))
  renderCart(el.box, joinCart(cart, all), cartTotal(cart, all), cartCount(cart), (id) => save(removeLine(cart, id)), () => save([]))
}
function save(next: CartLine[]): void {
  cart = next
  saveCart(cart)
  refresh()
}
function applyFilters(nextSlug: string | undefined, nextQuery: string): void {
  catSlug = nextSlug
  query = nextQuery
  writeFilters({ category: catSlug, query })
  refresh()
}
async function init(): Promise<void> {
  renderLoadState(el.status, { status: 'loading' })
  try {
    all = await loadProducts()
    cats = await loadCategories()
    offers = await loadOffers()
    const s = await loadStock()
    if (s !== null) stock = s.items
    setQuery(el.field, query)
    wireSearch(el.form, el.field, (q) => applyFilters(catSlug, q))
    wireSort(el.sorts, (s) => {
      sort = s
      refresh()
    })
    subscribeFilters((f) => {
      catSlug = f.category
      query = f.query
      setQuery(el.field, query)
      refresh()
    })
    renderLoadState(el.status, all.length === 0 ? { status: 'empty' } : { status: 'success', products: all })
  } catch (err) {
    renderLoadState(el.status, { status: 'error', message: err instanceof Error ? err.message : 'خطا' })
    return
  }
  refresh()
}
void init()
