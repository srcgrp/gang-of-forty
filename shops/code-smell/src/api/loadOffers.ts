import type { Offer } from "../types"
import { getJSON } from "./getJSON"
import { isOffer } from "./isOffer"

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