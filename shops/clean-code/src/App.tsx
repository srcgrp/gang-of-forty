import { useEffect, useState } from "react";
import { loadShop } from "./api/load-shop.ts";
import ShopView from "./components/ShopView.tsx";
import Status from "./components/Status.tsx";
import { cartCount, removeFromCart } from "./features/cart/count.ts";
import { loadCart, saveCart } from "./storage/cart-storage.ts";
import type { LoadState } from "./types/load.ts";
import type { CartLine } from "./types/product.ts";

const API = import.meta.env.VITE_API_URL ?? "";
export default function App() {
  const [load, setLoad] = useState<LoadState>({ status: "loading" });
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartLine[]>(function () {
    return loadCart();
  });
  const [query, setQuery] = useState("");
  useEffect(function () {
    let ignore = false;
    loadShop(API)
      .then(function (shop) {
        if (ignore) return;
        if (shop.products.length === 0) {
          setLoad({ status: "empty" });
          return;
        }
        setLoad({ status: "success", ...shop });
      })
      .catch(function () {
        if (ignore) return;
        setLoad({
          status: "error",
          message: "بارگذاری نشد. لطفا صفحه را رفرش کنید.",
        });
      });
    return function () {
      ignore = true;
    };
  }, []);

  useEffect(
    function () {
      saveCart(cart);
      document.title =
        "تمیز مارکت · " + cartCount(cart).toLocaleString("fa-IR") + " 🛒";
    },
    [cart],
  );
  if (load.status !== "success") {
    return <Status state={load} />;
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
