import { Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { filterProductsByQuery } from "../catalog/filter-products";
import { stateForProducts } from "../catalog/product-state";
import { HomeCategoryContext } from "../hooks/home-category";
import { CatalogContext, useCatalog, useLoadCatalog } from "../hooks/useCatalog";
import { useThemeStore } from "../hooks/useThemeStore";
import Footer from "./Footer";
import Header from "./Header";
import HeroBanner from "./HeroBanner";

function StorefrontLayout() {
  const state = useCatalog();
  const theme = useThemeStore((state) => state.theme);
  const isHome = useLocation({ select: (location) => location.pathname === "/" });
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const catalog = state.status === "success" || state.status === "empty" ? state.data : null;
  const categories = catalog?.categories ?? [];
  const products = catalog?.products.map(({ product }) => product) ?? [];
  const productState = stateForProducts(state, catalog?.products ?? []);
  const searchState = filterProductsByQuery(productState, query, categories);

  return (
    <div className="app" id="storefront-top" data-theme={theme}>
      <Header
        products={products}
        categories={categories}
        activeCategoryId={categoryId}
        onCategoryPick={setCategoryId}
        shop={catalog?.shop ?? null}
        query={query}
        onQueryChange={setQuery}
        searchState={searchState}
        onRetry={state.retry}
      />
      {isHome && <HeroBanner hero={catalog?.home.hero} />}
      <main>
        <HomeCategoryContext value={categoryId}>
          <Outlet />
        </HomeCategoryContext>
      </main>
      <Footer shop={catalog?.shop ?? null} categories={categories} />
    </div>
  );
}

export default function Layout() {
  const state = useLoadCatalog();

  return (
    <CatalogContext value={state}>
      <StorefrontLayout />
    </CatalogContext>
  );
}
