import { loadState } from './api/load.ts'
import { addToCart, cartCount } from './cart/lines.ts'
import { formatNumber, searchSummary } from './catalog/format.ts'
import { buildShelves, type Shelves } from './catalog/shelves.ts'
import { loadCart, saveCart } from './storage/cartStorage.ts'
import type { Card, CartLine, LoadSuccess } from './types.ts'
import { renderCart } from './ui/cart.ts'
import { readAdd, type AddClick } from './ui/event.ts'
import { celebrate } from './ui/feedback.ts'
import { findPage, type Page } from './ui/page.ts'
import { renderProducts } from './ui/products.ts'
import { clearResults, renderResults } from './ui/results.ts'
import { renderState } from './ui/state.ts'

const page: Page = findPage()
let cart: CartLine[] = loadCart()

function showCart(bump: boolean): void {
  renderCart(page.cartCount, formatNumber(cartCount(cart)), bump)
}

function onAdd(e: MouseEvent): void {
  const click: AddClick | null = readAdd(e)
  if (!click) return
  cart = addToCart(cart, click.id)
  saveCart(cart)
  showCart(true)
  celebrate(click.name)
}

function showShelves({ products, stock, offers }: LoadSuccess): void {
  const shelves: Shelves = buildShelves(products, stock, offers)
  const onSearch = (): void => {
    const query: string = page.searchInput.value.trim()
    if (query === '') {
      clearResults(page)
      return
    }
    const cards: Card[] = shelves.search(query)
    renderResults(page, cards, searchSummary(cards.length, query))
  }
  renderProducts(page.offersBox, shelves.offered, 'offer')
  renderProducts(page.dairyBox, shelves.dairy, 'dairy')
  page.searchInput.addEventListener('input', onSearch)
  onSearch()
}

async function start(): Promise<void> {
  const boxes: HTMLElement[] = [page.offersBox, page.dairyBox]
  for (const box of [...boxes, page.resultsBox]) box.addEventListener('click', onAdd)
  showCart(false)
  renderState(boxes, { status: 'loading' }, showShelves)
  renderState(boxes, await loadState(), showShelves)
}

start()