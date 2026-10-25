import type {
  ApiErrorType, Category, Home, LoadState, Offer, Product, Shop, StockData,
} from "../types";
import { api, ApiError } from "./client";
import {
  arrayOf, isCategory, isHome, isOffer, isProduct, isShop, isStock,
} from "./guards";

export interface AppData {
  products: Product[];
  categories: Category[];
  shop: Shop;
  home: Home;
  offers: Offer[];
  stock: StockData;
}

export function assertNever(value: never): never {
  throw new Error(`Unhandled state: ${String(value)}`);
}

export function userMessage(kind: ApiErrorType): string {
  switch (kind) {
    case "offline": return "اتصال اینترنت خود را بررسی کنید";
    case "timeout": return "پاسخی از سرور دریافت نشد";
    case "network": return "ارتباط با سرور برقرار نشد";
    case "http": return "سرور با مشکل مواجه است";
    case "parse": return "پاسخ سرور نامعتبر بود";
    case "abort": return "درخواست لغو شد";
    case "unknown": return "خطای نامشخصی رخ داد";
    default: return assertNever(kind);
  }
}

export async function loadAll(): Promise<LoadState<AppData>> {
  try {
    const [p, c, s, h, o, st] = await Promise.all([
      api.products(), api.categories(), api.shop(),
      api.home(), api.offers(), api.stock(),
    ]);
    return {
      status: "success",
      data: {
        products: arrayOf(p, isProduct),
        categories: arrayOf(c, isCategory),
        shop: isShop(s) ? s : {},
        home: isHome(h) ? h : {},
        offers: arrayOf(o, isOffer),
        stock: isStock(st) ? st : { items: {} },
      },
    };
  } catch (err: unknown) {
    const kind: ApiErrorType = err instanceof ApiError ? err.type : "unknown";
    return { status: "error", message: userMessage(kind), kind };
  }
}