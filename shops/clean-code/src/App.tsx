import { useEffect, useState } from "react";
import ShopView from "./components/ShopView.tsx";
import Status from "./components/Status.tsx";
import { cartCount } from "./features/cart/count.ts";
import { useCart } from "./hooks/useCart.ts";
import { useLoadShop } from "./hooks/useLoadShop.ts";
import { useThemeStore } from "./hooks/useThemeStore";

const API = import.meta.env.VITE_API_URL ?? "";

export default function App() {
  const { load, retry } = useLoadShop(API);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const theme = useThemeStore((s) => s.theme);
  const { lines } = useCart();

  useEffect(
    function () {
      document.title =
        "تمیز مارکت · " + cartCount(lines).toLocaleString("fa-IR") + " 🛒";
    },
    [lines],
  );

  if (load.status !== "success") {
    return <Status state={load} onRetry={retry} />;
  }

  return (
    <div className="app" data-theme={theme}>
      <ShopView
        query={query}
        onQuery={setQuery}
        load={load}
        categoryId={categoryId}
        onPick={setCategoryId}
      />
    </div>
  );
}
