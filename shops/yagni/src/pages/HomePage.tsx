import { useState } from "react";
import { useProductSearch } from "../hooks/SearchContext";
import CartDocumentTitle from "../components/CartDocumentTitle";
import Storefront from "../components/Storefront";
import { useCatalog } from "../hooks/useCatalog";

export default function HomePage() {
  const [attempt, setAttempt] = useState(0);
  const { query: searchQuery } = useProductSearch();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);

  const state = useCatalog(attempt);
  const catalog =
    state.status === "success" || state.status === "empty" ? state.data : null;


  return (
    <>
      <CartDocumentTitle shopName={catalog?.shop.name ?? "مینا"} />
      <Storefront
        categories={catalog?.categories ?? []}
        home={catalog?.home ?? null}
        shop={catalog?.shop ?? null}
        loadState={state}
        searchQuery={searchQuery}
        selectedCategoryId={categoryId}
        isCountdownVisible={isCountdownVisible}
        onPickCategory={setCategoryId}
        onRetry={() => setAttempt((value) => value + 1)}
        onToggleCountdown={() => setIsCountdownVisible((visible) => !visible)}
      />
    </>
  );
}
