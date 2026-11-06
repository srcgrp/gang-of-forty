import type { Product, Stock, Offer, Category } from '../../types'

export function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function isString(value: unknown): value is string {
    return typeof value === "string"
}

export function isNumber(value: unknown): value is number {
    return typeof value === "number" && Number.isFinite(value)
}

export function isPositiveId(value: unknown): value is number {
    return isNumber(value) && Number.isInteger(value) && value > 0
}

export function isNonNegativeInteger(value: unknown): value is number {
    return isNumber(value) && Number.isInteger(value) && value >= 0
}

export function isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
    return Array.isArray(value) && value.every(guard)
}

export function isProduct(value: unknown): value is Product {
    return isRecord(value) &&
        isPositiveId(value.id) && isPositiveId(value.categoryId) &&
        isString(value.name) && isString(value.emoji) && isString(value.unit) &&
        isNumber(value.price) && value.price >= 0 &&
        isArrayOf(value.tags, isString)
}

export function isStock(value: unknown): value is Stock {
    return isRecord(value) && isString(value.updatedAt) &&
        isRecord(value.items) &&
        Object.entries(value.items).every(([id, count]) =>
            isPositiveId(Number(id)) && isNonNegativeInteger(count))
}

export function isOffer(value: unknown): value is Offer {
    return isRecord(value) && isPositiveId(value.productId) &&
        isNumber(value.percent) && value.percent >= 0 && value.percent <= 100 &&
        isString(value.label)
}

export function isCategory(value: unknown): value is Category {
    return isRecord(value) && isPositiveId(value.id) &&
        isString(value.slug) && isString(value.name) &&
        isString(value.emoji) && isString(value.color)
}
