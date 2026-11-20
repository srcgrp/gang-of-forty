import type { Catalog, Product } from '../types'

export function carouselProducts(
  catalog: Catalog,
  carouselId: string
): Product[] | null {
  const carousel = catalog.home.carousels.find(
    item => item.id === carouselId
  )

  if (!carousel) {
    return null
  }

  if (carousel.source === 'offers') {
    const offerIds = new Set(
      catalog.offers.map(offer => offer.productId)
    )

    return catalog.products.filter(
      product => offerIds.has(product.id)
    )
  }

  if (carousel.categoryId !== undefined) {
    return catalog.products.filter(
      product => product.categoryId === carousel.categoryId
    )
  }

  return null
}