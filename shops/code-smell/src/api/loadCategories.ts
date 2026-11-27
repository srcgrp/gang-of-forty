import type { Category } from "../types"
import { getJSON } from "./getJSON"

function isCategory(value: unknown): value is Category {
    if (typeof value !== "object" || value === null) {
        return false
    }

    return (
        "id" in value &&
        typeof value.id === "number" &&
        "slug" in value &&
        typeof value.slug === "string" &&
        "name" in value &&
        typeof value.name === "string" &&
        "emoji" in value &&
        typeof value.emoji === "string" &&
        "color" in value &&
        typeof value.color === "string"
    )
}

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