import { useContext } from "react";
import { CartDispatchContext, CartLinesContext } from "./cartContext";

export function useCartLines() {
  const lines = useContext(CartLinesContext);
  if (lines === null) {
    throw new Error("useCartLines باید داخل CartProvider باشد");
  }
  return lines;
}

export function useCartDispatch() {
  const dispatch = useContext(CartDispatchContext);
  if (!dispatch) throw new Error("useCartDispatch باید داخل CartProvider باشد");
  return dispatch;
}
