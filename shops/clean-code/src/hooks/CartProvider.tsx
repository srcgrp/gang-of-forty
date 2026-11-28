import type { ReactNode } from "react";
import { useEffect, useReducer } from "react";
import { loadCart, saveCart } from "../storage/cart-storage";
import { CartDispatchContext, CartLinesContext } from "./cartContext";
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
    <CartDispatchContext.Provider value={dispatch}>
      <CartLinesContext.Provider value={lines}>
        {children}
      </CartLinesContext.Provider>
    </CartDispatchContext.Provider>
  );
}
