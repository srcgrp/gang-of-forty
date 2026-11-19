import { useState } from "react";
import { filterProductsByQuery } from "../catalog/filter-products";
import { stateForProducts } from "../catalog/product-state";
import { useCatalog } from "../hooks/useCatalog";
import CategoryList from "./CategoryList";
import Footer from "./Footer";
import Header from "./Header";
import ProductCollections from "./ProductCollections";

export default function Storefront() {
  const state = useCatalog();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const catalog = state.status === "success" || state.status === "empty" ? state.data : null;
  const categories = catalog?.categories ?? [];
  const products = catalog?.products.map(({ product }) => product) ?? [];
  const productState = stateForProducts(state, catalog?.products ?? []);
  const searchState = filterProductsByQuery(productState, query, categories);

  return (
    <>
      <Header
        products={products}
        categories={categories}
        activeCategoryId={categoryId}
        onCategoryPick={setCategoryId}
        shop={catalog?.shop ?? null}
        home={catalog?.home ?? null}
        query={query}
        onQueryChange={setQuery}
        searchState={searchState}
        onRetry={state.retry}
      />
      <main>
        <CategoryList categories={categories} />
        <ProductCollections
          catalog={catalog}
          state={productState}
          categoryId={categoryId}
          onRetry={state.retry}
        />
      </main>
      <Footer shop={catalog?.shop ?? null} categories={categories} />
    </>
  );
}
