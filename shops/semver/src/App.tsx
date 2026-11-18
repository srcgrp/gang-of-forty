import { useEffect, useState } from "react";
import * as api from "./api/shop-api";
import { filterProductsByQuery } from "./catalog/filter-products";
import { toProductViews } from "./api/product-views";
import Storefront from "./components/Storefront";
import { useThemeStore } from "./hooks/useThemeStore";
import type { Category, Home, LoadState, Shop } from "./types";
type StoreData = { categories: Category[]; home: Home; shop: Shop };
export default function App() {
  const theme = useThemeStore((state) => state.theme);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [store, setStore] = useState<StoreData | null>(null);
  useEffect(() => {
    let ignore = false;
    Promise.all([
      api.fetchProducts(), api.fetchOffers(), api.fetchStock(),
      api.fetchCategories(), api.fetchShop(), api.fetchHome(),
    ])
      .then(([products, offers, stock, categories, shop, home]) => {
        if (ignore) return;
        setStore({ categories, home, shop });
        const items = toProductViews(products, offers, stock);
        if (ignore) return;
        setLoadState(items.length ? { status: "success", products: items } : { status: "empty" });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        setLoadState({ status: "error", message: error instanceof Error ? error.message : "خطای نامشخص" });
      });
    return () => { ignore = true; };
  }, [attempt]);
  const products = loadState.status === "success" ? loadState.products.map((item) => item.product) : [];
  const categories = store?.categories ?? [];

  const handleCategoryPick = (id: number | null) => setCategoryId(id);
  const handleRetry = () => {
    setStore(null);
    setLoadState({ status: "loading" });
    setAttempt((current) => current + 1);
  };
  const searchState = filterProductsByQuery(loadState, query, categories);
  return (
    <div className="app" data-theme={theme}>
      <Storefront
        categories={categories} categoryId={categoryId} home={store?.home ?? null}
        loadState={loadState} searchState={searchState} onRetry={handleRetry} products={products}
        query={query} onQueryChange={setQuery} shop={store?.shop ?? null}
        onCategoryPick={handleCategoryPick}
      />
    </div>
  );
}
