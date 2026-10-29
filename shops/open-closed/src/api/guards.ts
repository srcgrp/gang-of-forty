import type { Category, Offer, Product, Stock } from '../types.ts';

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

export function isProduct(x: unknown): x is Product {
    return (
        isRecord(x) &&
        typeof x.id === 'number' &&
        typeof x.categoryId === 'number' &&
        typeof x.name === 'string' &&
        typeof x.emoji === 'string' &&
        typeof x.unit === 'string' &&
        typeof x.price === 'number' &&
        Number.isFinite(x.price) &&
        x.price >= 0 &&
        isStringArray(x.tags)
    );
}

export function isCategory(x: unknown): x is Category {
    return (
        isRecord(x) &&
        typeof x.id === 'number' &&
        typeof x.slug === 'string' &&
        typeof x.name === 'string' &&
        typeof x.emoji === 'string' &&
        typeof x.color === 'string'
    );
}

export function isOffer(x: unknown): x is Offer {
    return (
        isRecord(x) &&
        typeof x.productId === 'number' &&
        typeof x.percent === 'number' &&
        x.percent > 0 &&
        x.percent <= 100 &&
        typeof x.label === 'string'
    );
}

export function isStock(x: unknown): x is Stock {
    return (
        isRecord(x) &&
        typeof x.updatedAt === 'string' &&
        isRecord(x.items) &&
        Object.values(x.items).every((q) => typeof q === 'number' && q >= 0)
    );
}