import type { LoadState } from "./types";
import { useEffect, useState } from "react";
import { loadShop } from "./api/load-shop";
import { cartCount, cartLines } from "./features/cart/calculate";
import { useCartStore } from "./hooks/useCartStore";
import { useThemeStore } from "./hooks/useThemeStore";
import ShopPage from "./components/ShopPage";
import Status from "./components/Status";

export default function App() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [showCountdown, setShowCountdown] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const theme = useThemeStore((s) => s.theme);
  const items = useCartStore((s) => s.items);


  useEffect(() => {
    if (state.status !== "success") return;
    document.title = `${state.data.shop.name} · 🛒 ${cartCount(cartLines(items, state.data.products)).toLocaleString("fa-IR")}`;
  }, [items, state]);

 useEffect(() => {
    let ignore = false;
    loadShop()
      .then((data) => { if (!ignore) setState({ status: data.products.length > 0 ? "success" : "empty", data }); })
      .catch((error: unknown) => { if (!ignore) setState({ status: "error", message: error instanceof Error ? error.message : "خطای ناشناخته" }); });
    return () => { ignore = true; };
  }, [attempt]);
  
  if (state.status !== "success") {
    return (
      <div className="app" data-theme={theme}>
        <Status state={state} onRetry={() => { setState({ status: "loading" }); setAttempt((count) => count + 1); }} />
      </div>
    );
  }

  const { products, categories, home, shop } = state.data;

  return (
    <div className="app" data-theme={theme}>
      <ShopPage
        products={products}
        categories={categories}
        home={home}
        shop={shop}
        categoryId={categoryId}
        onPick={setCategoryId}
        query={query}
        onQuery={setQuery}
        showAll={showAll}
        onToggleAll={() => setShowAll((open) => !open)}
        isCartOpen={isCartOpen}
        onOpenCart={() => setIsCartOpen(true)}
        onCloseCart={() => setIsCartOpen(false)}
        showCountdown={showCountdown}
        onCloseCountdown={() => setShowCountdown(false)}
        onShowCountdown={() => setShowCountdown(true)}
      />
    </div>
  );
}
