import type { Catalog } from "../types.ts";
import { OFFERS_CAROUSEL } from "./carouselProducts.ts";
import { ALL_CAROUSEL } from "./carouselProducts.ts";
export function carouselTitle(catalog: Catalog, carouselId: string): string | null {
    if (carouselId === ALL_CAROUSEL) return "همه محصولات";

    if (carouselId === OFFERS_CAROUSEL) return "پیشنهاد ویژ";
    const category = catalog.categories.find((c) => c.slug === carouselId);
    return category === undefined ? null : category.name;
}
