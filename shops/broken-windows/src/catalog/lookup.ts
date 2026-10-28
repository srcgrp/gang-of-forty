import type { Category, Offer, Product } from "../types.ts";

export function indexOffers(offers: Offer[]): Map<number, Offer> {
    return new Map<number, Offer>(offers.map((offer: Offer): [number, Offer] => [offer.productId, offer]));
}

export function discounted(products: Product[], offerById: Map<number, Offer>): Product[] {
    return products.filter((product: Product): boolean => offerById.has(product.id));
}

export function inCategory(products: Product[], categoryId: number): Product[] {
    return products.filter((product: Product): boolean => product.categoryId === categoryId);
}

export function findCategory(categories: Category[], slug: string): Category | undefined {
    return categories.find((category: Category): boolean => category.slug === slug);
}