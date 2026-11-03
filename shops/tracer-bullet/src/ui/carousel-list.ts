import type { CardProduct, Data } from "../types";
import { createCarouselSection, renderProductCards } from "./carousels";

export type PreparedCarousel = {
    definition: Data["home"]["carousels"][number];
    cards: CardProduct[];
};

export function renderCarouselList(
    container: HTMLElement,
    carousels: PreparedCarousel[]
): void {
    container.replaceChildren();

    carousels.forEach(({ definition, cards }) => {
        const { section, list } = createCarouselSection(definition);
        container.append(section);
        renderProductCards(list, cards, definition.id);
    });
}