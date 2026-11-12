
import type { LoadState ,  CartLine } from "./types"; // all types used here
import { addToCart } from "./cart/addToCart"; // pure function: add to cart
import { removeFromCart } from "./cart/removeFromCart"; // pure function: remove from cart
import { cartCount } from "./cart/totals"; // pure functions: total and count
import { useState, useEffect } from "react";
import Status from "./components/Status"; 
import { loadShopData } from "./api/loadShop.ts";
import Storefront from "./components/StoreFront.tsx";
import { loadCart, saveCart } from "./storage/cartStorage.ts";
import { unitPrice } from "./cart/unitPrice.ts";
import { formatNumber } from "./ui/format.ts";

const SHOP_NAME = "سارا مارکت";
export default function App() {
  const [state, setState] = useState<LoadState>({ status: "loading" }); // starts as loading, so the effect never has to set "loading" itself
   const [categoryId, setCategoryId] = useState<number | null>(null); // selected category, null = no filter
   const [cart, setCart] = useState<CartLine[]>(()=>loadCart()); // cart lines, starts empty

useEffect(() => { // runs once after the first render
  let ignore = false; // flag: becomes true when this run is cancelled
  loadShopData().then((result) => { // result is already a LoadState: success, empty or error
    if (ignore) return; // cancelled (StrictMode or unmount), throw this answer away
    setState(result); // store the answer; React re-renders
  });
  return () => { // cleanup: runs before the next run and on unmount
    ignore = true; // from now on the old run's answer is ignored
  };
}, []); // empty deps: only once
useEffect(() => {
    saveCart(cart);
  }, [cart]);

  useEffect(() => {
    const count = cartCount(cart);
    document.title = count > 0 ? `${SHOP_NAME} (${formatNumber(count)})` : SHOP_NAME;
  }, [cart]);
  if (state.status !== "success") return <Status state={state} />;

  const { products, offers } = state;

  function handleAdd(id: number) {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    setCart((prev) => addToCart(prev, product, unitPrice(offers, product)));
  }

  function handleRemove(id: number) {
    setCart((prev) => removeFromCart(prev, id));
  }

  function handlePick(id: number) {
    setCategoryId((prev) => (prev === id ? null : id));
  }
  return (
    <Storefront
      data={state}
      categoryId={categoryId}
      cart={cart}
      onPick={handlePick}
      onAdd={handleAdd}
      onRemove={handleRemove}
    />
  );
}