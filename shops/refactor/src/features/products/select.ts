import type { ProductView } from '../../types'

export const selectProducts = (
  products: ProductView[],
  categoryId: number | null,
  query = '',
): ProductView[] => {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  return products.filter((product) => {
    const matchesCategory = categoryId === null || product.categoryId === categoryId
    const searchableText = `${product.name} ${product.tags.join(' ')}`.toLocaleLowerCase()
    const matchesQuery = normalizedQuery === '' || searchableText.includes(normalizedQuery)
    return matchesCategory && matchesQuery
  })
}
