import type { Offer, Product } from "../types.ts";

export function unitPrice(offers: Offer[], product: Product): number {
    const percent = offers.find((o) => o.productId === product.id)?.percent;
    if (percent === undefined) return product.price;
    return Math.round((product.price * (100 - percent)) / 100);
}