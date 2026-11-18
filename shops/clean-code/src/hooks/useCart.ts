import { useContext } from "react";
import { CartContext } from "./CartProvider";

export function useCart() {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error("useCart باید داخل CartProvider باشد");
  }
  return value;
}
