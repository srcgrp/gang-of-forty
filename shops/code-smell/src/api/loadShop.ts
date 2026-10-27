import type { Shop } from "../types"
import { getJSON } from "./getJSON"
import { isShop } from "./isShop"

export async function loadShop(path: string): Promise<Shop> {
    const data = await getJSON(path)

    if (!isShop(data)) {
        throw new Error("اطلاعات فروشگاه معتبر نیست.")
    }

    return data
}