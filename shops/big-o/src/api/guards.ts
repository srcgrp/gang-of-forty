import type { Category, Product, Offer, Stock, Shop} from '../types';

// Check if the input is an object or not
// x: an unknown input, output: true if the input is an object and false if it's not
function isRecord(x: unknown): x is Record<string, unknown> {
    return typeof x === 'object' && x !== null && !Array.isArray(x);
}

// Check if the input is a correct form of a product or not
export function isProduct(x: unknown): x is Product {
    return (
        isRecord(x) &&
        typeof x.id === 'number' &&
        typeof x.categoryId === 'number' &&
        typeof x.name === 'string' &&
        typeof x.emoji === 'string' && 
        typeof x.unit === 'string' && 
        typeof x.price === 'number' && 
        (Array.isArray(x.tags) && x.tags.every(t => typeof t === 'string'))
    )
}

// Check if the input is a correct form of a category or not
export function isCategory(x: unknown): x is Category {
    return (
        isRecord(x) &&
        typeof x.id === 'number' &&
        typeof x.slug === 'string' && 
        typeof x.name === 'string' &&
        typeof x.emoji === 'string'
    )
}

// Check if the input is a correct form of an offer or not
export function isOffer(x: unknown): x is Offer {
    return (
        isRecord(x) &&
        typeof x.productId === 'number' &&
        typeof x.percent === 'number' &&
        typeof x.label === 'string'
    )
}

// Check if the input is a correct form of a shop or not
export function isShop(x: unknown): x is Shop {
    return (
        isRecord(x) &&
        typeof x.name === 'string' &&
        typeof x.slogan === 'string' && 
        typeof x.owner === 'string' && 
        typeof x.city === 'string' && 
        typeof x.phone === 'string' &&
        (isRecord(x.hours) && typeof x.hours.open === 'string' && typeof x.hours.close === 'string') &&
        typeof x.deliveryFee === 'number' && 
        typeof x.freeDeliveryOver === 'number' &&
        typeof x.currency === 'string'
    )
}

// Check if the input is a correct form of a stock or not
export function isStock(x: unknown): x is Stock {
    return (
        isRecord(x) &&
        typeof x.updatedAt === 'string' &&
        (isRecord(x.items) && Object.values(x.items).every(t => typeof t === 'number'))
    )
}