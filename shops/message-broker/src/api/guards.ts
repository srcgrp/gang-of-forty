import type { CartLine, Category, Offer, Product, Stock } from '../types'

export function isProduct(x: unknown): x is Product {
  return typeof x === 'object' && x !== null &&
    'id' in x && typeof x.id === 'number' &&
    'name' in x && typeof x.name === 'string' &&
    'price' in x && typeof x.price === 'number'
}


export function isCategory(x: unknown): x is Category {
    return typeof x === 'object' && x !== null &&
        'id' in x && typeof x.id === 'number' &&
        'slug' in x && typeof x.slug === 'string' &&
        'name' in x && typeof x.name === 'string' &&
        'emoji' in x && typeof x.emoji === 'string' &&
        'color' in x && typeof x.color === 'string'
}

export function isOffer(x: unknown): x is Offer {
    return typeof x === 'object' && x !== null &&
        'productId' in x && typeof x.productId === 'number' &&
        'percent' in x && typeof x.percent === 'number' &&
        'label' in x && typeof x.label === 'string'
}

export function isStock(x: unknown): x is Stock {
    return typeof x === 'object' && x !== null &&
        'updatedAt' in x && typeof x.updatedAt === 'string' &&
        'items' in x &&
        typeof x.items === 'object' && x.items !== null &&
        !Array.isArray(x.items) &&
        Object.values(x.items).every(value => typeof value === 'number')
}

export function isCartLine(x: unknown): x is CartLine {
    return typeof x === 'object' && x !== null &&
        'productId' in x && typeof x.productId === 'number' &&
        'quantity' in x && typeof x.quantity === 'number'
}
