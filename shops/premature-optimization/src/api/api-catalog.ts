import type { LoadState } from "../scripts/types";

import {
  isCategory,
  isHome,
  isOffer,
  isProduct,
  isShop,
  isStock,
} from "../guards/index-guards";

import { API_PATHS, USER_MESSAGES } from "./api-config";
import { ApiError } from "./api-client";
import { getValidList, getValidObject } from "./api-validation";

export async function loadCatalog(): Promise<LoadState> {
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

    if (products.length === 0) {
      return { status: "empty" };
    }

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

    return {
      status: "error",
      message:
        error instanceof ApiError ? error.message : USER_MESSAGES.unknown,
    };
  }
}
