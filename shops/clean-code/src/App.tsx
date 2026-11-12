import { useEffect, useState } from "react";
import { loadShop } from "./api/load-shop.ts";
import ShopView from "./components/ShopView.tsx";
import Status from "./components/Status.tsx";
import { removeFromCart } from "./features/cart/count.ts";
import type { LoadState } from "./types/load.ts";
import type { CartLine } from "./types/product.ts";

const API = import.meta.env.VITE_API_URL ?? "";

export default function App() {
  const [load, setLoad] = useState<LoadState>({ status: "loading" });
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);

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

  if (load.status !== "success") {
    return <Status state={load} />;
  }

  return (
    <ShopView
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
