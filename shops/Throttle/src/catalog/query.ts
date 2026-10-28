import type { Category, Filters, Offer, Product, Sort } from '../types'
import { finalPrice, offerFor } from './pricing'

export const filterProducts = (
  products: readonly Product[],
  categories: readonly Category[],
  filters: Filters,
): Product[] => {
  const category: Category | undefined = categories.find((c) => c.slug === filters.category)
  const query: string = filters.query.trim().toLowerCase()
  return products.filter(
    (p) =>
      (filters.category === null || category?.id === p.categoryId) &&
      p.name.toLowerCase().includes(query),
  )
}

export const sortProducts = (
  products: readonly Product[],
  sort: Sort,
  offers: readonly Offer[],
): Product[] => {
  const price = (p: Product): number => finalPrice(p, offerFor(offers, p.id))
  const list: Product[] = [...products]
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => price(a) - price(b))
    case 'price-desc':
      return list.sort((a, b) => price(b) - price(a))
    case 'default':
      return list
  }
}
