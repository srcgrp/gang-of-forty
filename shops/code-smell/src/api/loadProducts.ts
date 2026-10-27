import type { Product } from "../types"
import { getJSON } from "./getJSON"
import { isProduct } from "./isProduct"

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

