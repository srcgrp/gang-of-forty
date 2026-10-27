import type { Category } from "../types"
import { getJSON } from "./getJSON"
import { isCategory } from "./isCategory"

export async function loadCategories(path: string): Promise<Category[]> {
    const data = await getJSON(path)

    if (!Array.isArray(data)) {
        throw new Error("اطلاعات دسته‌بندی‌ها باید به صورت آرایه باشد.")
    }

    const items: unknown[] = data

    if (!items.every(isCategory)) {
        throw new Error("اطلاعات دسته‌بندی‌ها معتبر نیست.")
    }

    return items
}