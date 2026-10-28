import type { LoadState, Product } from "../types";
import { renderError, renderEmpty } from "./error";
import { renderProductSkeletons } from "./skeletons";
function assertNever(value: never): never {
  throw new Error(`Unhandled load state: ${JSON.stringify(value)}`);
}
export function renderLoadState(
  state: LoadState,
  container: HTMLElement,
  retry: () => void,
  renderSuccess: (products: Product[]) => void,
): void {
  switch (state.status) {
    case "loading":
      renderProductSkeletons(container);
      return;
    case "success":
      renderSuccess(state.products);
      return;
    case "empty":
      renderEmpty(container);
      return;
    case "error":
      renderError(container, state.message, retry);
      return;
    default:
      return assertNever(state);
  }
}

// Lesson 5 public name.
export const renderStatus = renderLoadState;
