import type { ReactNode } from "react";
import { useEffect, useReducer } from "react";
import { loadCart, saveCart } from "../storage/cart-storage";
import { CartContext } from "./cartContext";
import { cartReducer } from "./cartReducer";

type CartProviderProps = {
  children: ReactNode;
};

export default function CartProvider({ children }: CartProviderProps) {
  const [lines, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(
    function () {
      saveCart(lines);
    },
    [lines],
  );

  return (
    <CartContext.Provider value={{ lines, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
