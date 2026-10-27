import { isCategory, isOffer, isProduct, isShop, isStockData } from "./guard.ts";
import type { LoadState } from "../types.ts";

const API_BASE: string = "../../api/";

export async function getJSON(path: string): Promise<unknown> {
    let res: Response;
    try {
        res = await fetch(API_BASE + path);
    } catch {
        throw new Error("اتصال برقرار نشد: " + path);
    }
    if (!res.ok) {
        throw new Error("خطای سرور (" + res.status + ") برای " + path);
    }
    let data: unknown;
    try {
        data = await res.json();
    } catch {
        throw new Error(path + " فایل JSON معتبری نیست");
    }
    return data;
}

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