import type { Category, MenuEntry, Offer, Product, Shop, StockData } from "../types.ts";

function isRecord(x: unknown): x is Record<string, unknown> {
    return typeof x === "object" && x !== null && !Array.isArray(x);
}

function isStringArray(x: unknown): x is string[] {
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

export function isStockData(x: unknown): x is StockData {
    return (
        isRecord(x) &&
        isRecord(x.items) &&
        Object.values(x.items).every((count: unknown): boolean => typeof count === "number")
    );
}

function isMenuEntry(x: unknown): x is MenuEntry {
    return isRecord(x) && typeof x.label === "string" && typeof x.href === "string";
}

export function isShop(x: unknown): x is Shop {
    return (
        isRecord(x) &&
        typeof x.notice === "string" &&
        typeof x.slogan === "string" &&
        typeof x.phone === "string" &&
        typeof x.address === "string" &&
        typeof x.about === "string" &&
        Array.isArray(x.menu) &&
        x.menu.every(isMenuEntry)
    );
}