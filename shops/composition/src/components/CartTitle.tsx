import { useEffect } from "react";
import { useCartStore } from "../hooks/useCartStore";
import { cartCount } from "../features/cart/logic/items";

export default function CartTitle() {
  const count = useCartStore((state) => cartCount(state.lines));
  useEffect(() => {
    document.title = "بت‌شاپ · " + count.toLocaleString("fa-IR") + " 🛒";
  }, [count]);
  return null;
}
