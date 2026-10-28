import type { CartLine, Category, Offer, Product, Stock } from '../types'

export function isProduct(x: unknown): x is Product {
    return typeof x === 'object' && x !== null && 'id' in x && 'name' in x && 'price' in x
}

export function isCategory(x: unknown): x is Category {
    return typeof x === 'object' && x !== null && 'id' in x && 'slug' in x && 'name' in x
}

export function isOffer(x: unknown): x is Offer {
    return typeof x === 'object' && x !== null && 'productId' in x && 'percent' in x
}

export function isStock(x: unknown): x is Stock {
    return typeof x === 'object' && x !== null && 'items' in x
}

export function isCartLine(x: unknown): x is CartLine {
    return typeof x === 'object' && x !== null && 'productId' in x && 'quantity' in x
}