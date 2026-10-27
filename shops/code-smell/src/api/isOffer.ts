import type { Offer } from "../types"

export function isOffer(value: unknown): value is Offer {
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