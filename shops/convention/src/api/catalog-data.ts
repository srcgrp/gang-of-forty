import type { Category, Offer, Stock } from "../types";
import { getJSON } from "./get-json";

export async function getCategories(): Promise<Category[]> {
    const data = await getJSON("categories.json");

    if (!Array.isArray(data) || !data.every(isCategory)) {
        throw new Error("Invalid categories data");
    }

    return data;
}

export async function getOffers(): Promise<Offer[]> {
    const data = await getJSON("offers.json");

    if (!Array.isArray(data) || !data.every(isOffer)) {
        throw new Error("Invalid offers data");
    }

    return data;
}

export async function getStock(): Promise<Stock> {
    const data = await getJSON("stock.json");

    if (!isStock(data)) {
        throw new Error("Invalid stock data");
    }

    return data;
}

function isCategory(value: unknown): value is Category {
    if (typeof value !== "object" || value === null) return false;

    const item = value as Record<string, unknown>;

    return (
        typeof item.id === "number" &&
        typeof item.slug === "string" &&
        typeof item.name === "string" &&
        typeof item.emoji === "string" &&
        typeof item.color === "string"
    );
}

function isOffer(value: unknown): value is Offer {
    if (typeof value !== "object" || value === null) return false;

    const item = value as Record<string, unknown>;

    return (
        typeof item.productId === "number" &&
        typeof item.percent === "number" &&
        typeof item.label === "string"
    );
}

function isStock(value: unknown): value is Stock {
    if (typeof value !== "object" || value === null) return false;

    const item = value as Record<string, unknown>;

    if (
        typeof item.updatedAt !== "string" ||
        typeof item.items !== "object" ||
        item.items === null ||
        Array.isArray(item.items)
    ) {
        return false;
    }

    return Object.values(item.items).every(
        (quantity) => typeof quantity === "number"
    );
}