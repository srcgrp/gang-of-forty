import { loadCategories, loadOffers, loadProducts } from './api/loadShop.ts'
import { addLine, cartCount, cartTotal, joinCart, removeLine } from './cart/cart.ts'
import { filterProducts, sortProducts } from './catalog/filter.ts'
import { splitShop } from './catalog/offers.ts'
import { loadCart, saveCart } from './storage/cartStorage.ts'
import { readElements, wireSearch, wireSort } from './ui/controls.ts'
import { renderCart } from './ui/cartView.ts'
import { renderCategories } from './ui/categories.ts'
import { renderProducts } from './ui/productCards.ts'
import { renderLoadState } from './ui/statusView.ts'
import { SORTS, type CartLine, type Category, type LoadState, type Offer, type Product, type Sort } from './types.ts'
const el = readElements()
let all: Product[] = []
let cats: Category[] = []
let offers: Offer[] = []
let cart = loadCart()
let catId: number | undefined = undefined
let query = ''
let sort: Sort = SORTS[0]
function refresh(): void {
  const rows = splitShop(sortProducts(filterProducts(all, catId, query), sort), offers, cats)
  renderProducts(el.salesCar, rows.sales, addToCart)
  renderProducts(el.dairyCar, rows.milks, addToCart)
  renderCategories(el.catBox, cats, catId, pickCat)
  renderCart(el.box, joinCart(cart, all), cartTotal(cart, all), cartCount(cart), dropLine, clearCart)
}
function save(next: CartLine[]): void { cart = next; saveCart(cart); refresh() }
function addToCart(id: number): void { save(addLine(cart, id)) }
function dropLine(id: number): void { save(removeLine(cart, id)) }
function clearCart(): void { save([]) }
function pickCat(id: number | undefined): void { catId = id; refresh() }
async function init(): Promise<void> {
  renderLoadState(el.status, { status: 'loading' })
  try {
    all = await loadProducts()
    cats = await loadCategories()
    offers = await loadOffers()
    wireSearch(el.form, el.field, (q) => {
      query = q
      refresh()
    })
    wireSort(el.sorts, (s) => { sort = s; refresh() })
    const done: LoadState = all.length === 0 ? { status: 'empty' } : { status: 'success', products: all }
    renderLoadState(el.status, done)
  } catch (err) {
    renderLoadState(el.status, { status: 'error', message: err instanceof Error ? err.message : 'خطا' })
    return
  }
  refresh()
}
void init()
