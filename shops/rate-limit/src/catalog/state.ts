import type { CatalogItem, LoadState } from "../types";

export const toLoadState = (products: CatalogItem[]): LoadState<CatalogItem> =>
  products.length === 0 ? { status: "empty" } : { status: "success", products };

export const errorState = (message: string): LoadState<CatalogItem> => ({
  status: "error",
  message,
});
