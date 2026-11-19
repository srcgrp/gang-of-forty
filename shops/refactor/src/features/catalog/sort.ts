import type { ProductView } from '../../types'

export type SortOrder = 'default' | 'price'

export const sortProducts = (products: ProductView[], sort: SortOrder): ProductView[] => {
  if (sort === 'default') {
    return products
  }
  return [...products].sort((a, b) => a.price - b.price)
}
