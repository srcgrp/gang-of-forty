
import type { ProductWithDetails } from '../types'

type Carousel =
  | {
      id: string
      title: string
      type: 'category'
      categoryId: string
    }
  | {
      id: string
      title: string
      type: 'offers'
    }

export function carouselProducts(
  products: ProductWithDetails[],
  carousel: Carousel,
): ProductWithDetails[] {
  if (carousel.type === 'offers') {
    return products.filter((product) => product.discountPercent > 0)
  }

  return products.filter(
    (product) => product.category === carousel.categoryId,
  )
}
