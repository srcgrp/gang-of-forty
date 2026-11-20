import type { CardView } from "../types.ts";
import { formatNumber, formatPrice } from "./format.ts";

function createPrice(text: string): HTMLParagraphElement {
    const price: HTMLParagraphElement = document.createElement("p");
    price.className = "special-offer-price";
    price.textContent = text;
    return price;
}

export function createCardPrices(view: CardView): HTMLElement {
    if (view.percent === undefined) {
        return createPrice(formatPrice(view.price));
    }
    const oldPrice: HTMLModElement = document.createElement("del");
    oldPrice.className = "price-old";
    oldPrice.textContent = formatNumber(view.price);

    const prices: HTMLDivElement = document.createElement("div");
    prices.className = "special-offer-item-prices";
    prices.append(oldPrice, createPrice(formatPrice(view.finalPrice)));
    return prices;
}