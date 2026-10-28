import type { Category, Offer, Product, Stock } from '../types'

function isObject(val: unknown): val is Record<string, unknown> {
    return typeof val === 'object' && val !== null && !Array.isArray(val)
}

export function isProduct(x: unknown): x is Product {
    if (!isObject(x)) return false
    return (
        typeof x.id === 'number' &&
        typeof x.categoryId === 'number' &&
        typeof x.name === 'string' &&
        typeof x.emoji === 'string' &&
        typeof x.unit === 'string' &&
        typeof x.price === 'number'
    )
}

export function isCategory(x: unknown): x is Category {
    if (!isObject(x)) return false
    return (
        typeof x.id === 'number' &&
        typeof x.slug === 'string' &&
        typeof x.name === 'string' &&
        typeof x.emoji === 'string' &&
        typeof x.color === 'string'
    )
}

export function isOffer(x: unknown): x is Offer {
    if (!isObject(x)) return false
    return typeof x.productId === 'number' && typeof x.percent === 'number'
}

export function isStock(x: unknown): x is Stock {
    if (!isObject(x)) return false
    const items = x.items
    if (!isObject(items)) return false
    return Object.entries(items).every(
        ([key, count]) => !Number.isNaN(Number(key)) && typeof count === 'number'
    )
}