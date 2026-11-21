import type { Product } from "../types"
import { getJSON } from "./getJSON"

function isProduct(value: unknown): value is Product {
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

export async function loadProducts(path: string): Promise<Product[]> {
    const data = await getJSON(path)

    if (!Array.isArray(data)) {
        throw new Error("اطلاعات محصولات باید به صورت آرایه باشد.")
    }

    const items: unknown[] = data
    const validProducts = items.filter(isProduct)
    const invalidCount = items.length - validProducts.length

    if (invalidCount > 0) {
        console.log("تعداد محصولات نامعتبر:" + " " + invalidCount)
    }

    return validProducts
}