import type { Offer, Product } from '../../../shared/types.ts'

export function offerMap(offers: Offer[]): Map<number, Offer> {
    return new Map<number, Offer>(offers.map((o: Offer): [number, Offer] => [o.productId, o]))
}

export function inCategory(products: Product[], categoryId: number): Product[] {
    return products.filter((p: Product): boolean => p.categoryId === categoryId)
}

export function withOffer(products: Product[], offers: Map<number, Offer>): Product[] {
    return products.filter((p: Product): boolean => offers.has(p.id))
}