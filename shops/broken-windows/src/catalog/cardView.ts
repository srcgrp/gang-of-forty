import type { CardView, Offer, Product } from "../types.ts";
import { finalPrice } from "./finalPrice.ts";
import { isUnavailable } from "./stock.ts";

export function toCardView(
    product: Product,
    offer: Offer | undefined,
    stockCount: number | undefined
): CardView {
    return {
        name: product.name,
        emoji: product.emoji,
        unit: product.unit,
        price: product.price,
        finalPrice: offer ? finalPrice(product, offer) : product.price,
        percent: offer?.percent,
        unavailable: isUnavailable(stockCount),
    };
}