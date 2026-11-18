import { createContext } from "react";
import type { CartLine } from "../types/product";
import type { CartAction } from "./cartReducer";

export type CartContextValue = {
  lines: CartLine[];
  dispatch: (action: CartAction) => void;
};

export const CartContext = createContext<CartContextValue | null>(null);
