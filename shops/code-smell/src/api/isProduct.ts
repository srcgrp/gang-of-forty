import type { Product } from "../types"

export function isProduct(value: unknown): value is Product {
    if (typeof value !== "object" || value === null) {
        return false
    }

    return (
        "id" in value &&
        typeof value.id === "number" &&
        "categoryId" in value &&
        typeof value.categoryId === "number" &&
        "name" in value &&
        typeof value.name === "string" &&
        "emoji" in value &&
        typeof value.emoji === "string" &&
        "unit" in value &&
        typeof value.unit === "string" &&
        "price" in value &&
        typeof value.price === "number" &&
        "tags" in value &&
        Array.isArray(value.tags) &&
        value.tags.every(function (tag: unknown) {
            return typeof tag === "string"
        })
    )
}