import { useEffect, useState } from "react";
import type { Cart, LoadState } from "./scripts/types";
import { USER_MESSAGES } from "./api/api-config.ts";
import { loadCatalog } from "./api/index-api.ts";
import { addItem } from "./scripts/logic/cart/add-item.ts";
import { cartCount } from "./scripts/logic/cart/cart-lines.ts";
import { removeItem } from "./scripts/logic/cart/remove-item.ts";
import { readCart, saveCart } from "./scripts/storage/cart-storage.ts";
import { readQuery, writeQuery } from "./scripts/storage/query-url.ts";
import {
  addedFeedback,
  removedFeedback,
  saveFailedFeedback,
} from "./lib/animations/feedback.ts";
import Page from "./components/Page.tsx";

export default function App() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [cart, setCart] = useState<Cart>(readCart);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState(readQuery);
  const [attempt, setAttempt] = useState(0);
  const shopName = state.status === "success" ? "سوپرینو" : "";

  useEffect(() => {
    let ignore = false;
    loadCatalog()
      .then((next) => {
        if (ignore) return;
        setState(next);
      })
      .catch(() => {
        if (ignore) return;
        setState({ status: "error", message: USER_MESSAGES.unknown });
      });
    return () => {
      ignore = true;
    };
  }, [attempt]);

  useEffect(() => {
    if (!saveCart(cart)) saveFailedFeedback();
  }, [cart]);
  useEffect(() => writeQuery(query), [query]);
  useEffect(() => {
    if (shopName)
      document.title = `${shopName} (${cartCount(cart).toLocaleString("fa-IR")}) 🛒`;
  }, [cart, shopName]);

  const handleAdd = (id: number, button: HTMLButtonElement) => {
    setCart((prev) => addItem(prev, String(id)));
    addedFeedback(button);
  };
  const handleRemove = (id: number) => {
    setCart((prev) => removeItem(prev, String(id)));
    removedFeedback();
  };
  const handlePick = (id: number) =>
    setCategoryId((prev) => (prev === id ? null : id));
  const handleRetry = () => {
    setState({ status: "loading" });
    setAttempt((n) => n + 1);
  };

  return (
    <Page
      state={state}
      cart={cart}
      categoryId={categoryId}
      query={query}
      onAdd={handleAdd}
      onRemove={handleRemove}
      onPick={handlePick}
      onQuery={setQuery}
      onRetry={handleRetry}
    />
  );
}
