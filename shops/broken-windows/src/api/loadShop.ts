import type { LoadState } from "../types.ts";
import { getJSON } from "./client.ts";
import { isCategory, isOffer, isProduct } from "./guards.ts";
import { isShop, isStockData } from "./shopGuards.ts";

function keepValid<T>(data: unknown, guard: (x: unknown) => x is T, label: string): T[] {
    if (!Array.isArray(data)) {
        throw new Error(label + " باید یک آرایه باشد");
    }
    const list: unknown[] = data;
    const valid: T[] = list.filter(guard);
    const dropped: number = list.length - valid.length;
    if (dropped > 0) {
        console.warn(label + ": " + dropped + " مورد نامعتبر حذف شد");
    }
    return valid;
}

function expectValid<T>(data: unknown, guard: (x: unknown) => x is T, label: string): T {
    if (!guard(data)) {
        throw new Error(label + " شکل درستی ندارد");
    }
    return data;
}

export async function loadShopData(): Promise<LoadState> {
    try {
        const [rawProducts, rawStock, rawOffers, rawCategories, rawShop] = await Promise.all([
            getJSON("products.json"),
            getJSON("stock.json"),
            getJSON("offers.json"),
            getJSON("categories.json"),
            getJSON("shop.json"),
        ]);

        const products = keepValid(rawProducts, isProduct, "products.json");
        const offers = keepValid(rawOffers, isOffer, "offers.json");
        const categories = keepValid(rawCategories, isCategory, "categories.json");
        const stock = expectValid(rawStock, isStockData, "stock.json");
        const shop = expectValid(rawShop, isShop, "shop.json");

        if (products.length === 0) {
            return { status: "empty" };
        }
        return { status: "success", products, offers, stock, categories, shop };
    } catch (error: unknown) {
        const message: string = error instanceof Error ? error.message : String(error);
        return { status: "error", message };
    }
}