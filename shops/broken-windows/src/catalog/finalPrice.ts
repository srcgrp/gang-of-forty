import type { Offer, Product } from "../types.ts";

export function finalPrice(product: Pick<Product, "price">, offer: Pick<Offer, "percent">): number {
    return Math.round((product.price * (100 - offer.percent)) / 100);
}