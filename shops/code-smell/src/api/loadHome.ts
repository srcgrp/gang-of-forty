import type { Home, Banner } from "../types"
import { getJSON } from "./getJSON"
import { isLink } from "./isLink"
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

function isHome(value: unknown): value is Home {
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

export async function loadHome(path: string): Promise<Home> {
    const data = await getJSON(path)

    if (!isHome(data)) {
        throw new Error("اطلاعات صفحهٔ اصلی معتبر نیست.")
    }

    return data
}

function isBanner(value: unknown): value is Banner {
    if (typeof value !== "object" || value === null) {
        return false
    }

    return (
        "title" in value &&
        typeof value.title === "string" &&
        "text" in value &&
        typeof value.text === "string" &&
        "emoji" in value &&
        typeof value.emoji === "string" &&
        "cta" in value &&
        isLink(value.cta)
    )
}