import type { Stock } from "../types"
import { getJSON } from "./getJSON"
import { isStock } from "./isStock"

export async function loadStock(path: string): Promise<Stock> {
    const data = await getJSON(path)

    if (!isStock(data)) {
        throw new Error("اطلاعات موجودی کالاها معتبر نیست.")
    }

    return data
}