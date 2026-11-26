import Header from "./Header";
import StoreBody from "./StoreBody";

import { useEffect } from "react";
import { setupOffersConfetti } from "../shared/ui/effects";

import { createProductSearch } from "../features/products/logic/search";

import type { StorePageProps } from "./StorePageProps";

export default function StorePage({
  data,
  loadState,
  onRetry,
  categoryId,
  query,
  onQuery,
  onPickCategory,
}: StorePageProps) {
  useEffect(() => {
    return setupOffersConfetti();
  }, []);

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
        data={data}
        query={query}
        matches={matches}
        onQuery={onQuery}
      />
      <StoreBody
        data={data}
        loadState={loadState}
        onRetry={onRetry}
        categoryId={categoryId}
        query={query}
        onPickCategory={onPickCategory}
      />
    </>
  );
}
