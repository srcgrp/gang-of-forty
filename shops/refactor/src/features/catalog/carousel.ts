import type { Carousel, ProductView } from '../../types'

export const carouselProducts = (
  carousels: Carousel[],
  products: ProductView[],
  carouselId: string,
): ProductView[] | null => {
  const carousel = carousels.find((entry) => entry.id === carouselId)
  if (!carousel) {
    return null
  }
  if (carousel.source === 'offers') {
    return products.filter((product) => product.percent > 0)
  }
  return products.filter((product) => product.categoryId === carousel.categoryId)
}