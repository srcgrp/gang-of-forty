import type { CardProduct, CartLine, LoadState } from "./types.ts";
import { useState, useEffect } from "react";
import { addToCart, removeFromCart } from "./cart/cart-lines.ts";
import { loadData } from "./api/load-data.ts";
import { getDataLoadState } from "./catalog/data-load-state.ts";
import Status from "./components/Status.tsx";
import ShopPage from "./components/ShopPage.tsx";

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [cart, setCart] = useState<CartLine[]>([]);

  useEffect(() => {
    let ignore = false;

    loadData()
      .then((data) => {
        if (ignore) return;
        setState(getDataLoadState(data));
      })
      .catch(() => {
        if (ignore) return;
        setState({
          status: "error",
          message: "خطا: لطفا دوباره تلاش کنید",
        });
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (state.status !== "success") {
    return <Status state={state} />;
  }

  function handleAdd(product: CardProduct) {
    setCart((current) => addToCart(current, product));
  }

  function handleRemove(id: number) {
    setCart((current) => removeFromCart(current, id));
  }

  return (
    <ShopPage
      data={state.data}
      selectedId={selectedId}
      onPick={setSelectedId}
      cart={cart}
      onAdd={handleAdd}
      onRemove={handleRemove}
    />
  );
}
