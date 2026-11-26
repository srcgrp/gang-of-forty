import type { Data, CardProduct } from "../types";
import { withOfferAndStock, getSpecialOfferProducts } from "./product-catalog";

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
            data.products, data.offers, data.stock
        );
    }

    return data.products
        .filter(product => product.categoryId === definition.categoryId)
        .map(product =>
            withOfferAndStock(product, data.offers, data.stock)
        );
}

export function carouselProducts(
  data: Data,
  carouselId: string,
): CardProduct[] | null {
  const definition = data.home.carousels.find((c) => c.id === carouselId);

  if (!definition) {
    return null;
  }

  return getCarouselCards(definition, data);
}

export type PlpList = { title: string; cards: CardProduct[] };

export function plpList(data: Data, id: string): PlpList | null {
  const definition = data.home.carousels.find((c) => c.id === id);
  if (definition) {
    return {
      title: definition.title, cards: getCarouselCards(definition, data),
    };
  }

  const category = data.categories.find((c) => c.slug === id);
  if (category) {
    return {
      title: category.name,
      cards: data.products
        .filter((p) => p.categoryId === category.id)
        .map((p) => withOfferAndStock(p, data.offers, data.stock)),
    };
  }

  return null;
}

export function prepareCarousels(data: Data): PreparedCarousel[] {
    return data.home.carousels.map(definition => ({
        definition, cards: getCarouselCards(definition, data)
    }));
}