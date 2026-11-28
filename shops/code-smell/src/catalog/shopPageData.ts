import Fuse from "fuse.js"
import type { Carousel, CarouselWithProducts, ShopData } from "../types"
import { getVisibleCarousels } from "./catalogSelection"
import { getHomeCarousels } from "./getCarouselProducts"

export type ListingSearch = {
    sort: "default" | "price"
    q?: string
    cat?: number
}

function getHomeCarouselList(data: ShopData, categoryId: number | null): Carousel[] {
    const category = data.categories.find((item) => item.id === categoryId)
    return data.home.carousels.map(function (carousel) {
        if (!category || carousel.categoryId === undefined) {
            return carousel
        }
        return {
            ...carousel,
            id: category.slug,
            title: category.name,
            emoji: category.emoji,
            categoryId: category.id
        }
    })
}

export function getSearchCarousels(
    data: ShopData, query: string, categoryId: number | null
): CarouselWithProducts[] {
    const text = query.trim()
    const fuse = new Fuse(data.products, { keys: ["name"], threshold: 0.3, ignoreLocation: true })
    const products = text ? fuse.search(text).map((result) => result.item) : []
    if (data.categories.some((category) => category.id === categoryId)) {
        return getVisibleCarousels({ ...data, products }, categoryId)
    }

    const results: Carousel = { id: "search-results", title: "نتایج جستجو", emoji: "", source: "all" }
    return getHomeCarousels([results], products, data.categories, data.offers, data.stock.items)
}

export function getPageData(
    data: ShopData,
    catalogControls: {
        categoryId: number | null
        query: string
        onPick: (id: number | null) => void
        onQuery: (value: string) => void
    }
) {
    const { categoryId, query } = catalogControls
    const carousels = query.trim()
        ? getSearchCarousels(data, query, categoryId)
        : getHomeCarousels(
            getHomeCarouselList(data, categoryId),
            data.products,
            data.categories,
            data.offers,
            data.stock.items
        )

    return { data, carousels, catalogControls }
}
