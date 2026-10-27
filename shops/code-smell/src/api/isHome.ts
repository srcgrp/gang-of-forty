import type { Home } from "../types"
import { isBanner } from "./isBanner"
import { isCarousel } from "./isCarousel"

function isPromo(value: unknown): value is Home["promos"][number] {
    if (typeof value !== "object" || value === null) {
        return false
    }

    return (
        "text" in value &&
        typeof value.text === "string" &&
        "emoji" in value &&
        typeof value.emoji === "string" &&
        "color" in value &&
        typeof value.color === "string" &&
        "href" in value &&
        typeof value.href === "string"
    )
}

export function isHome(value: unknown): value is Home {
    if (typeof value !== "object" || value === null) {
        return false
    }

    return (
        "hero" in value &&
        isBanner(value.hero) &&
        "side" in value &&
        isBanner(value.side) &&
        "promos" in value &&
        Array.isArray(value.promos) &&
        value.promos.every(isPromo) &&
        "carousels" in value &&
        Array.isArray(value.carousels) &&
        value.carousels.every(isCarousel)
    )
}