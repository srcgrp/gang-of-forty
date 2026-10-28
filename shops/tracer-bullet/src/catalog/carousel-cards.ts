import type { Data, CardProduct } from "../types";
import {
    withOfferAndStock,
    getSpecialOfferProducts
} from "./product-catalog";

type CarouselDefinition = Data["home"]["carousels"][number];

export type PreparedCarousel = {
    definition: CarouselDefinition;
    cards: CardProduct[];
};

export function getCarouselCards(
    definition: CarouselDefinition,
    data: Data
): CardProduct[] {
    if ("source" in definition) {
        return getSpecialOfferProducts(
            data.products,
            data.offers,
            data.stock
        );
    }

    return data.products
        .filter(product => product.categoryId === definition.categoryId)
        .map(product =>
            withOfferAndStock(product, data.offers, data.stock)
        );
}

export function prepareCarousels(data: Data): PreparedCarousel[] {
    return data.home.carousels.map(definition => ({
        definition,
        cards: getCarouselCards(definition, data)
    }));
}