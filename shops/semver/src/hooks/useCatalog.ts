import { createContext, useContext, useEffect, useState } from "react";
import { toProductViews } from "../api/product-views";
import * as api from "../api/shop-api";
import type { Catalog, LoadState } from "../types";

export type CatalogState = LoadState<Catalog> & { retry: () => void };
export const CatalogContext = createContext<CatalogState | null>(null);

export function useCatalog(): CatalogState {
  const state = useContext(CatalogContext);
  if (state === null) throw new Error("useCatalog requires a catalog provider");
  return state;
}

export function useLoadCatalog(): CatalogState {
  const [state, setState] = useState<LoadState<Catalog>>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;
    Promise.all([
      api.fetchProducts(), api.fetchOffers(), api.fetchStock(),
      api.fetchCategories(), api.fetchShop(), api.fetchHome(),
    ])
      .then(([products, offers, stock, categories, shop, home]) => {
        if (ignore) return;
        const data: Catalog = { products: toProductViews(products, offers, stock), categories, shop, home };
        setState(data.products.length ? { status: "success", data } : { status: "empty", data });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        setState({ status: "error", message: error instanceof Error ? error.message : "خطای نامشخص" });
      });
    return () => { ignore = true; };
  }, [attempt]);

  const retry = () => {
    setState({ status: "loading" });
    setAttempt((current) => current + 1);
  };

  return { ...state, retry };
}
