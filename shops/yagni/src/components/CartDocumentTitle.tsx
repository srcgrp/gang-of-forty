import { useEffect } from "react";
import { countCartItems } from "../cart/cart-logic";
import { useCartStore } from "../hooks/useCartStore";

export default function CartDocumentTitle({ shopName }: { shopName: string }) {
  const count = useCartStore((store) => countCartItems(store.lines));
  useEffect(() => {
    document.title = `${shopName} · 🛒 ${count.toLocaleString("fa-IR")}`;
  }, [shopName, count]);
  return null;
}
