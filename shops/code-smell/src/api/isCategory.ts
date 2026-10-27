import type { Category } from "../types"

export function isCategory(value: unknown): value is Category {
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