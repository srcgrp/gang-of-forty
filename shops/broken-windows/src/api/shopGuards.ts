import type { MenuEntry, Shop, StockData } from "../types.ts";
import { isRecord } from "./guards.ts";

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