import type { Carousel } from "../types"
import { productFilters } from "../types"

export function isCarousel(value: unknown): value is Carousel {
    if (typeof value !== "object" || value === null) {
        return false
    }

    if ("source" in value) {
        const source = value.source
        const isValidSource = productFilters.some(function (filter) {
            return filter === source
        })

        if (!isValidSource) {
            return false
        }
    }

    if ("categoryId" in value && typeof value.categoryId !== "number") {
        return false
    }

    return (
        "id" in value &&
        typeof value.id === "string" &&
        "title" in value &&
        typeof value.title === "string" &&
        "emoji" in value &&
        typeof value.emoji === "string"
    )
}