import type * as Types from "./types";
import {
  isCategory,
  isHome,
  isOffer,
  isProduct,
  isShop,
  isStock,
} from "./guards";

const API_PATHS = {
  products: "/api/products.json",
  stock: "/api/stock.json",
  offers: "/api/offers.json",
  categories: "/api/categories.json",
  shop: "/api/shop.json",
  home: "/api/home.json",
} as const;

const USER_MESSAGES = {
  offline:
    "اتصال به اینترنت برقرار نیست یا سرور پاسخ نمی‌دهد. اتصال خود را بررسی کنید و دوباره تلاش کنید.",
  unavailable:
    "اطلاعات فروشگاه در حال حاضر در دسترس نیست. لطفاً کمی بعد دوباره تلاش کنید.",
  badData:
    "اطلاعات فروشگاه به‌درستی دریافت نشد. لطفاً کمی بعد دوباره تلاش کنید.",
  unknown: "مشکلی پیش آمد. لطفاً صفحه را دوباره بارگذاری کنید.",
} as const;

export class ApiError extends Error {
  readonly detail: string;

  constructor(userMessage: string, detail: string) {
    super(userMessage);
    this.detail = detail;
  }
}

export async function getJSON(path: string): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(path);
  } catch {
    throw new ApiError(
      USER_MESSAGES.offline,
      `درخواست «${path}» به سرور نرسید (خطای شبکه).`,
    );
  }

  if (!response.ok) {
    throw new ApiError(
      USER_MESSAGES.unavailable,
      `فایل «${path}» دریافت نشد (وضعیت ${response.status}).`,
    );
  }

  try {
    return await response.json();
  } catch {
    throw new ApiError(
      USER_MESSAGES.badData,
      `فایل «${path}» JSON معتبر نیست.`,
    );
  }
}

async function getValidObject<T>(
  path: string,
  guard: (x: unknown) => x is T,
): Promise<T> {
  const data: unknown = await getJSON(path);
  if (!guard(data)) {
    throw new ApiError(
      USER_MESSAGES.badData,
      `ساختار داده‌ی «${path}» معتبر نیست.`,
    );
  }
  return data;
}

async function getValidList<T>(
  path: string,
  guard: (x: unknown) => x is T,
): Promise<T[]> {
  const data: unknown = await getJSON(path);
  if (!Array.isArray(data)) {
    throw new ApiError(
      USER_MESSAGES.badData,
      `ساختار داده‌ی «${path}» معتبر نیست؛ یک آرایه انتظار می‌رفت.`,
    );
  }

  const items: unknown[] = data;
  const valid: T[] = items.filter(guard);
  const dropped: number = items.length - valid.length;
  if (dropped > 0) {
    console.warn(
      `«${path}»: ${dropped} مورد نامعتبر از ${items.length} مورد حذف شد.`,
    );
  }
  return valid;
}

export async function loadCatalog(): Promise<Types.LoadState> {
  try {
    const [products, stock, offers, categories, shop, home] = await Promise.all(
      [
        getValidList(API_PATHS.products, isProduct),
        getValidObject(API_PATHS.stock, isStock),
        getValidList(API_PATHS.offers, isOffer),
        getValidList(API_PATHS.categories, isCategory),
        getValidObject(API_PATHS.shop, isShop),
        getValidObject(API_PATHS.home, isHome),
      ],
    );

    if (products.length === 0) return { status: "empty" };
    return {
      status: "success",
      products,
      stock,
      offers,
      categories,
      shop,
      home,
    };
  } catch (error: unknown) {
    console.error(
      "خطا در بارگذاری APIهای سوپرینو:",
      error instanceof ApiError ? error.detail : error,
    );
    const message: string =
      error instanceof ApiError ? error.message : USER_MESSAGES.unknown;
    return { status: "error", message };
  }
}
