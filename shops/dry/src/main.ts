import { renderCategoryGrid, renderSections } from './features/products/ui/categories.ts'
import { addToCart, cartCount } from './features/cart/rules/lines.ts'
import { loadCart, saveCart } from './features/cart/storage/cartStorage.ts'
import { findBadge, renderCart } from './features/cart/ui/cart.ts'
import { celebrate } from './features/cart/ui/feedback.ts'
import { loadState } from './features/products/api/load.ts'
import { formatNumber, searchSummary } from './features/products/catalog/format.ts'
import { buildShelves, type Shelves } from './features/products/catalog/shelves.ts'
import { readFilters, writeFilters, type Filters } from './features/products/storage/urlState.ts'
import { readAdd, type AddClick } from './features/products/ui/event.ts'
import { findPage, type Page } from './features/products/ui/page.ts'
import { renderProducts } from './features/products/ui/products.ts'
import { clearResults, renderResults } from './features/products/ui/results.ts'
import { renderState } from './features/products/ui/state.ts'
import { toggleTheme, type Theme } from './features/theme/rules/theme.ts'
import { loadTheme, saveTheme } from './features/theme/storage/themeStorage.ts'
import { applyTheme, findToggle, systemTheme } from './features/theme/ui/theme.ts'
import type { Card, CartLine, LoadSuccess } from './shared/types.ts'

const page: Page = findPage()
const badge: HTMLElement = findBadge()
let cart: CartLine[] = loadCart()
let filters: Filters = readFilters()
const themeToggle: HTMLButtonElement = findToggle()
let theme: Theme = loadTheme() ?? systemTheme()

function showCart(bump: boolean): void {
  renderCart(badge, formatNumber(cartCount(cart)), bump)
}

function onAdd(e: MouseEvent): void {
  const click: AddClick | null = readAdd(e)
  if (!click) return
  cart = addToCart(cart, click.id)
  saveCart(cart)
  showCart(true)
  celebrate(click.name)
}

function onThemeClick(): void {
  theme = toggleTheme(theme)
  saveTheme(theme)
  applyTheme(themeToggle, theme)
}

function showShelves({ products, stock, offers, categories }: LoadSuccess): void {
  const shelves: Shelves = buildShelves(products, stock, offers, categories)
  const onSearch = (): void => {
    filters = { ...filters, query: page.searchInput.value.trim() }
    writeFilters(filters)
    const cards: Card[] | null = shelves.search(filters.query, filters.category)
    if (cards === null) clearResults(page)
    else renderResults(page, cards, searchSummary(cards.length, filters.query))
  }
  renderProducts(page.offersBox, shelves.offered, 'offer')
  renderCategoryGrid(page.categoryGrid, shelves.categoryCards)
  renderSections(page.sectionsHost, shelves.sections)
  page.searchInput.value = filters.query
  page.searchInput.addEventListener('input', onSearch)
  onSearch()
}

async function start(): Promise<void> {
   const boxes: HTMLElement[] = [page.offersBox]
  for (const box of [...boxes, page.sectionsHost, page.resultsBox]) box.addEventListener('click', onAdd)
  showCart(false)
  applyTheme(themeToggle, theme)
  themeToggle.addEventListener('click', onThemeClick)
  renderState(boxes, { status: 'loading' }, showShelves)
  renderState(boxes, await loadState(), showShelves)
}

start()