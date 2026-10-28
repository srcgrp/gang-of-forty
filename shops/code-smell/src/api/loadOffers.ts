import type { Offer } from "../types"
import { getJSON } from "./getJSON"

function isOffer(value: unknown): value is Offer {
    if (typeof value !== "object" || value === null) {
        return false
    }

    return (
        "productId" in value &&
        typeof value.productId === "number" &&
        "percent" in value &&
        typeof value.percent === "number" &&
        "label" in value &&
        typeof value.label === "string"
    )
}

export async function loadOffers(path: string): Promise<Offer[]> {
    const data = await getJSON(path)

    if (!Array.isArray(data)) {
        throw new Error("اطلاعات تخفیف‌ها باید به صورت آرایه باشد.")
    }

    const items: unknown[] = data

    if (!items.every(isOffer)) {
        throw new Error("اطلاعات تخفیف‌ها معتبر نیست.")
    }

    return items
}