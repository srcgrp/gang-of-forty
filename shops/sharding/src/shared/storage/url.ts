import type { UrlFilters } from '../types'

type ShopSearch = {
  category?: string
  q?: string
}

export function toShopSearch({ category, query }: UrlFilters): ShopSearch {
  return {
    ...(category ? { category } : {}),
    ...(query ? { q: query } : {}),
  }
}

export function validateShopSearch(search: Record<string, unknown>): ShopSearch {
  return toShopSearch({
    category: typeof search.category === 'string' ? search.category : '',
    query: typeof search.q === 'string' ? search.q : '',
  })
}

export function categorySearch(category: string) {
  return ({ q }: ShopSearch): ShopSearch => toShopSearch({ category, query: q ?? '' })
}

export function apiHashLink(href: string) {
  if (!href.startsWith('#')) return null

  const hash = href.slice(1)
  const activeOptions = { exact: true, includeHash: true }
  if (hash === 'main-content' || hash === 'footer' || hash === 'contact') {
    return { to: '.', hash, search: true, resetScroll: false, activeOptions } as const
  }
  if (!hash) return { to: '/', search: true, activeOptions } as const

  return {
    to: '/',
    hash,
    search: categorySearch(hash === 'offers' ? '' : hash),
    resetScroll: false,
    activeOptions,
  } as const
}
