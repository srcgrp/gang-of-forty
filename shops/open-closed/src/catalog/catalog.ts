import type { Carousel, Catalog, LoadState, Product } from '../types.ts';

export function catalogProducts(state: LoadState<Catalog>): Product[] {
    return state.status === 'success' ? state.data.products : [];
}

export function productsByCategory(products: Product[], categoryId: number): Product[] {
    return products.filter((p) => p.categoryId === categoryId);
}

export function findCarousel(catalog: Catalog, carouselId: string): Carousel | undefined {
    return catalog.carousels.find((c) => c.id === carouselId);
}

export function carouselProducts(catalog: Catalog, carouselId: string): Product[] | null {
    const carousel = findCarousel(catalog, carouselId);
    if (carousel === undefined) return null;

    if (carousel.source === 'offers') {
        const offered = new Set(catalog.offers.map((o) => o.productId));
        return catalog.products.filter((p) => offered.has(p.id));
    }

    const { categoryId } = carousel;
    return categoryId === undefined ? [] : productsByCategory(catalog.products, categoryId);
}