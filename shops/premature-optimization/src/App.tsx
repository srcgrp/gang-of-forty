import { useEffect, useState } from "react";
import type { Cart, LoadState } from "./scripts/types";
import { USER_MESSAGES } from "./api/api-config.ts";
import { loadCatalog } from "./api/index-api.ts";
import { addItem } from "./scripts/logic/cart/add-item.ts";
import { removeItem } from "./scripts/logic/cart/remove-item.ts";
import Status from "./components/Status.tsx";
import Storefront from "./components/Storefront.tsx";

export default function App() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [cart, setCart] = useState<Cart>({});
  const [categoryId, setCategoryId] = useState<number | null>(null);

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
  }, []);

  function handleAdd(id: number) {
    setCart((prev) => addItem(prev, String(id)));
  }
  function handleRemove(id: number) {
    setCart((prev) => removeItem(prev, String(id)));
  }
  function handlePick(id: number) {
    setCategoryId((prev) => (prev === id ? null : id));
  }

  switch (state.status) {
    case "loading":
      return <Status message="در حال بارگذاری..." />;
    case "empty":
      return <Status message="در حال حاضر محصولی برای نمایش وجود ندارد." />;
    case "error":
      return <Status message={state.message} isError />;
    case "success":
      return (
        <Storefront
          data={state}
          cart={cart}
          categoryId={categoryId}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onPick={handlePick}
        />
      );
  }
}
