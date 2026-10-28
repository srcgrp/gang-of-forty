import type { Category, Offer, Product } from "../types.ts";

export function isRecord(x: unknown): x is Record<string, unknown> {
    return typeof x === "object" && x !== null && !Array.isArray(x);
}

export function isStringArray(x: unknown): x is string[] {
    return Array.isArray(x) && x.every((item: unknown): boolean => typeof item === "string");
}

export function isProduct(x: unknown): x is Product {
    return (
        isRecord(x) &&
        typeof x.id === "number" &&
        typeof x.categoryId === "number" &&
        typeof x.name === "string" &&
        typeof x.emoji === "string" &&
        typeof x.unit === "string" &&
        typeof x.price === "number" &&
        x.price >= 0 &&
        isStringArray(x.tags)
    );
}

export function isCategory(x: unknown): x is Category {
    return (
        isRecord(x) &&
        typeof x.id === "number" &&
        typeof x.name === "string" &&
        typeof x.emoji === "string" &&
        typeof x.slug === "string" &&
        typeof x.color === "string"
    );
}

export function isOffer(x: unknown): x is Offer {
    return (
        isRecord(x) &&
        typeof x.productId === "number" &&
        typeof x.percent === "number" &&
        x.percent >= 0 &&
        x.percent <= 100 &&
        typeof x.label === "string"
    );
}