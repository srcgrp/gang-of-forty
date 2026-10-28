import type { Stock } from "../types"
import { getJSON } from "./getJSON"

function isStock(value: unknown): value is Stock {
    if (typeof value !== "object" || value === null) {
        return false
    }

    return (
        "updatedAt" in value &&
        typeof value.updatedAt === "string" &&
        "items" in value &&
        typeof value.items === "object" &&
        value.items !== null &&
        !Array.isArray(value.items) &&
        Object.values(value.items).every(function (quantity: unknown) {
            return typeof quantity === "number"
        })
    )
}

export async function loadStock(path: string): Promise<Stock> {
    const data = await getJSON(path)

    if (!isStock(data)) {
        throw new Error("اطلاعات موجودی کالاها معتبر نیست.")
    }

    return data
}