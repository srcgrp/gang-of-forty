import type { ProductWithDetails } from '../types'

export type ProductSort = 'default' | 'price'

export function sortProducts(
  products: ProductWithDetails[],
  sort: ProductSort,
): ProductWithDetails[] {
  if (sort === 'price') {
    return [...products].sort(
      (a, b) => a.finalPrice - b.finalPrice,
    )
  }

  return products
}