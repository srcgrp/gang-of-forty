import type { ReactNode } from "react";
import { createContext, useEffect, useReducer } from "react";
import { loadCart, saveCart } from "../storage/cart-storage";
import type { CartLine } from "../types/product";
import type { CartAction } from "./cartReducer";
import { cartReducer } from "./cartReducer";

type CartContextValue = {
  lines: CartLine[];
  dispatch: (action: CartAction) => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

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
