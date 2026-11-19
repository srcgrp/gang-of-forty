import type { LoadState, ProductLoadState, ProductView } from "../types";

export const stateForProducts = (
  state: LoadState<unknown>,
  products: ProductView[],
): ProductLoadState => {
  if (state.status === "loading" || state.status === "error") return state;
  return products.length > 0
    ? { status: "success", data: products }
    : { status: "empty", data: products };
};
