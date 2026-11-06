import type { CatalogItem, LoadState, StateView } from "../types";
import { el } from "./dom";
import { showMessage } from "./message";

function assertNever(value: never): never {
  throw new Error(`Unhandled state: ${JSON.stringify(value)}`);
}

export function renderState(
  target: HTMLElement,
  state: LoadState<CatalogItem>,
  view: StateView
): void {
  target.setAttribute("aria-busy", String(state.status === "loading"));

  switch (state.status) {
    case "loading":
      if (view.skeletons > 0) {
        target.replaceChildren(
          ...Array.from({ length: view.skeletons }, () => el("div", "offer-skeleton"))
        );
      }
      break;
    case "success":
      target.replaceChildren(...view.build(state.products));
      break;
    case "empty":
      showMessage(target, view.emptyText);
      break;
    case "error":
      showMessage(target, `${view.errorTitle} ${state.message}`, view.retry);
      break;
    default:
      assertNever(state);
  }
}
