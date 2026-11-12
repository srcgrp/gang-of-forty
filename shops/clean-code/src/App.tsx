import { useEffect, useState } from "react";
import ShopView from "./components/ShopView.tsx";
import Status from "./components/Status.tsx";
import { cartCount, removeFromCart } from "./features/cart/count.ts";
import { useLoadShop } from "./hooks/useLoadShop.ts";
import { loadCart, saveCart } from "./storage/cart-storage.ts";
import type { CartLine } from "./types/product.ts";

const API = import.meta.env.VITE_API_URL ?? "";

export default function App() {
  const { load, retry } = useLoadShop(API);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartLine[]>(loadCart);
  const [query, setQuery] = useState("");

  useEffect(
    function () {
      saveCart(cart);
      document.title =
        "تمیز مارکت · " + cartCount(cart).toLocaleString("fa-IR") + " 🛒";
    },
    [cart],
  );

  if (load.status !== "success") {
    return <Status state={load} onRetry={retry} />;
  }

  return (
    <ShopView
      query={query}
      onQuery={setQuery}
      load={load}
      categoryId={categoryId}
      cart={cart}
      onPick={setCategoryId}
      onClear={function () {
        setCart(removeFromCart());
      }}
      setCart={setCart}
    />
  );
}
