import type { CardView, LoadedState, Offer, PageView, Product } from "../types.ts";
import { toCardView } from "./cardView.ts";
import { discounted, findCategory, indexOffers, inCategory } from "./lookup.ts";

const SNACKS_SLUG: string = "snacks";

export function buildPageView(state: LoadedState): PageView {
    const { products, offers, stock, categories, shop } = state;
    const offerById: Map<number, Offer> = indexOffers(offers);
    const toCard = (product: Product): CardView =>
        toCardView(product, offerById.get(product.id), stock.items[product.id]);

    const snacks = findCategory(categories, SNACKS_SLUG);
    return {
        offerCards: discounted(products, offerById).map(toCard),
        snacks: snacks
            ? { slug: snacks.slug, cards: inCategory(products, snacks.id).map(toCard) }
            : undefined,
        categories,
        shop,
    };
}