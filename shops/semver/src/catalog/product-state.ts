import type { LoadState, ProductView } from "../types";

export const stateForProducts = (
  state: LoadState,
  products: ProductView[],
): LoadState => {
  if (state.status !== "success") return state;
  return products.length > 0
    ? { status: "success", products }
    : { status: "empty" };
};
