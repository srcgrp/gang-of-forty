import type { Card, CarouselSort, Catalog, Category, Product, Shelf } from '../shared/types'

export function catalogCarousels(
  configured: Shelf[],
  categories: Category[],
  hasOffers: boolean,
): Shelf[] {
  const shelves = new Map<string, Shelf>()
  if (hasOffers) {
    shelves.set('offers', { id: 'offers', title: 'پیشنهادهای ویژه امروز', source: 'offers' })
  }
  for (const category of categories) {
    shelves.set(category.slug, {
      id: category.slug,
      title: category.name,
      categoryId: category.id,
    })
  }
  if (categories.length === 0) {
    shelves.set('all', { id: 'all', title: 'همه محصولات' })
  }
  for (const shelf of configured) {
    const fallback = shelves.get(shelf.id)
    shelves.set(shelf.id, { ...fallback, ...shelf, title: fallback?.title ?? shelf.title })
  }
  return [...shelves.values()]
}

export function carouselProducts(catalog: Catalog, carouselId: string): Product[] | null {
  const shelf = catalog.carousels.find((item) => item.id === carouselId)
  if (!shelf) return null

  if (shelf.id === 'offers' || shelf.source === 'offers') {
    return catalog.products
      .filter((product) => catalog.offerMap.has(product.id))
      .sort((a, b) => (catalog.offerMap.get(b.id)?.percent ?? 0) - (catalog.offerMap.get(a.id)?.percent ?? 0))
  }
  if (shelf.categoryId === undefined) return catalog.products
  return catalog.products.filter((product) => product.categoryId === shelf.categoryId)
}

export function sortCarouselCards(cards: Card[], sort: CarouselSort): Card[] {
  return sort === 'price' ? [...cards].sort((a, b) => a.price - b.price) : cards
}
