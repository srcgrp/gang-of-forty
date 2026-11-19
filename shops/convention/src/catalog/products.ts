export function formatPrice(price: number): string {
    return new Intl.NumberFormat("fa-IR").format(price);
}
import type { Catalog, Product } from '../types'

export function carouselProducts(catalog: Catalog, carouselId: string): Product[] | null {
    const carousel = catalog.carousels.find((item) => item.id === carouselId)
    if (carousel) {
        return carousel.source === 'offers'
            ? catalog.products.filter((product) => catalog.offers.some((offer) => offer.productId === product.id))
            : catalog.products.filter((product) => product.categoryId === carousel.categoryId)
    }
    const category = catalog.categories.find((item) => item.slug === carouselId)
    return category ? catalog.products.filter((product) => product.categoryId === category.id) : null
}
