import type { CartSummary, Filters, Shop, Sort } from '../types'
import { SORTS } from '../types'
import type { Elements } from './elements'
import { formatNumber, formatPrice } from './format'

const SORT_LABELS = {
  default: 'پیش‌فرض',
  'price-asc': 'ارزان‌ترین',
  'price-desc': 'گران‌ترین',
} satisfies Record<Sort, string>

export const renderControls = (filters: Filters, els: Elements): void => {
  if (els.sort.options.length === 0) {
    els.sort.replaceChildren(...SORTS.map((s) => new Option(SORT_LABELS[s], s)))
  }
  els.sort.value = filters.sort
  if (els.search.value !== filters.query) els.search.value = filters.query
}

export const renderSummary = (summary: CartSummary, els: Elements): void => {
  els.cartCount.textContent = formatNumber(summary.count)
  els.cartTotal.textContent = summary.total > 0 ? formatPrice(summary.total) : ''
}

export const renderShop = (shop: Shop | null, els: Elements): void => {
  if (shop === null) return
  els.shopName.textContent = shop.name
  els.slogan.textContent = shop.slogan
  els.notice.textContent = shop.notice
}
