import type { CardProduct } from "../types";
import { createCard } from "./cards";

export function renderProductCards(
    carousel: HTMLUListElement,
    products: CardProduct[],
    idPrefix: string
): void {
    products.forEach((product, index) => {
        const card = createCard(product);

        if (index === 0) {
            card.id = `${idPrefix}-first`;
        } else if (index === products.length - 1) {
            card.id = `${idPrefix}-last`;
        } else {
            card.id = `${idPrefix}-product-${index + 1}`;
        }

        carousel.append(card);
    });
}