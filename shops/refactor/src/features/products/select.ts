import type { ProductView } from '../../types'

export const selectProducts = (products: ProductView[], categoryId: number | null): ProductView[] => {
  if (categoryId === null) {
    return products
  }
  return products.filter((product) => product.categoryId === categoryId)
}
