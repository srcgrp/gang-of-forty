import type { Category, ShopData, CarouselWithProducts } from "../types"
import { getCategoryCards } from "./getProductCardData"
import { getHomeCarousels } from "./getCarouselProducts"

export function getSelectedCategory(
    categories: Category[],
    slug: string | null
): Category | null {
    return categories.find(function (category) {
        return category.slug === slug
    }) || null
}

export function getCatalogCarousels(
    data: ShopData,
    category: Category | null
): CarouselWithProducts[] {
    if (category) {
        const cards = getCategoryCards(
            category,
            data.products,
            data.offers,
            data.stock.items
        )

        return [{
            id: "filtered-products",
            title: category.name,
            emoji: category.emoji,
            products: cards
        }]
    } else {
        return getHomeCarousels(
            data.home.carousels,
            data.products,
            data.categories,
            data.offers,
            data.stock.items
        )
    }
}