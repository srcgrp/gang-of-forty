import { useEffect, useState } from "react";
import { countCartItems } from "../cart/cart-logic";
import Storefront from "../components/Storefront";
import { useCartStore } from "../hooks/useCartStore";
import { useCatalog } from "../hooks/useCatalog";

export default function HomePage() {
  const [attempt, setAttempt] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);

  const state = useCatalog(attempt);
  const cartCount = useCartStore((store) => countCartItems(store.lines));
  const catalog =
    state.status === "success" || state.status === "empty" ? state.data : null;

  useEffect(() => {
    document.title = `${catalog?.shop.name ?? "مینا"} · 🛒 ${cartCount.toLocaleString("fa-IR")}`;
  }, [catalog?.shop.name, cartCount]);

  return (
    <Storefront
      categories={catalog?.categories ?? []}
      home={catalog?.home ?? null}
      shop={catalog?.shop ?? null}
      loadState={state}
      searchQuery={searchQuery}
      selectedCategoryId={categoryId}
      isCartOpen={isCartOpen}
      isCountdownVisible={isCountdownVisible}
      onSearch={setSearchQuery}
      onPickCategory={setCategoryId}
      onRetry={() => setAttempt((value) => value + 1)}
      onOpenCart={() => setIsCartOpen(true)}
      onCloseCart={() => setIsCartOpen(false)}
      onToggleCountdown={() => setIsCountdownVisible((visible) => !visible)}
    />
  );
}
