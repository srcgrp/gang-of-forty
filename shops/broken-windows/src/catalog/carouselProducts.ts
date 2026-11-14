import type { Catalog, Product } from "../types.ts";

export const OFFERS_CAROUSEL = "offers";
export const ALL_CAROUSEL = "all";
export function carouselProducts(catalog: Catalog, carouselId: string): Product[] | null {
    if (carouselId === ALL_CAROUSEL) return catalog.products;
    if (carouselId === OFFERS_CAROUSEL) {
        return catalog.products.filter((p) => catalog.offers.some((o) => o.productId === p.id));
    }
    const category = catalog.categories.find((c) => c.slug === carouselId);
    if (category === undefined) return null;
    return catalog.products.filter((p) => p.categoryId === category.id);
}