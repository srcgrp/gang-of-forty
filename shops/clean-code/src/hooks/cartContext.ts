import { createContext } from "react";
import type { CartLine } from "../types/product";
import type { CartAction } from "./cartReducer";

export const CartLinesContext = createContext<CartLine[] | null>(null);
export const CartDispatchContext = createContext<
  ((action: CartAction) => void) | null
>(null);
