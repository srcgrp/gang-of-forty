import Header from "./Header";
import StoreBody from "./StoreBody";

import { useEffect } from "react";
import { setupOffersConfetti } from "../shared/ui/effects";

import { getStoreCartSummary } from "../store-cart";
import { createProductSearch } from "../features/products/logic/search";

import type { StorePageProps } from "./StorePageProps";

export default function StorePage({
  data,
  loadState,
  onRetry,
  cart,
  categoryId,
  query,
  onQuery,
  onPickCategory,
  onAdd,
  onCartAction,
  onClearCart,
}: StorePageProps) {
  useEffect(() => {
    return setupOffersConfetti();
  }, []);
  const { rows, count, total } = data
    ? getStoreCartSummary(cart, data.products, data.offers, data.stock)
    : { rows: [], count: 0, total: 0 };

  const categorySlug =
    data?.categories.find((item) => item.id === categoryId)?.slug ?? null;

  const matches =
    data && query.trim()
      ? (createProductSearch(
          data.products,
          data.categories,
          () => categorySlug,
        )(query.trim()) ?? [])
      : [];
  return (
    <>
      <Header
        shop={data?.shop ?? null}
        onPickCategory={onPickCategory}
        cartCount={count}
        cartRows={rows}
        cartTotal={total}
        query={query}
        matches={matches}
        onQuery={onQuery}
        onCartAction={onCartAction}
        onClearCart={onClearCart}
      />
      <StoreBody
        data={data}
        loadState={loadState}
        onRetry={onRetry}
        categoryId={categoryId}
        query={query}
        onPickCategory={onPickCategory}
        onAdd={onAdd}
      />
    </>
  );
}
