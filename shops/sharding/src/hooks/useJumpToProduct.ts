import { useNavigate } from '@tanstack/react-router'
import { carouselProducts } from '../catalog/carousels'
import type { Catalog } from '../shared/types'

export function useJumpToProduct(catalog: Catalog) {
  const navigate = useNavigate()

  return (id: number) => {
    const element = document.querySelector(`[data-product-id="${id}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    const carousel = catalog.carousels.find((shelf) =>
      carouselProducts(catalog, shelf.id)?.some((product) => product.id === id),
    )
    if (carousel) {
      void navigate({
        to: '/plp/$carouselId',
        params: { carouselId: carousel.id },
        search: true,
        hash: `product-${id}`,
      })
    }
  }
}
