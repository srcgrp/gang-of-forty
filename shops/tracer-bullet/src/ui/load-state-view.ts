import type { LoadState } from "../types";
import { showMessage, showBlockMessage } from "./messages";

export function renderLoadState(
    state: LoadState,
    categoryList: HTMLElement,
    carouselsContainer: HTMLElement
): void {
    switch (state.status) {
        case "loading":
            showMessage(categoryList, "در حال بارگذاری...");
            showBlockMessage(carouselsContainer, "در حال بارگذاری...");
            return;

        case "success":
            categoryList.replaceChildren();
            carouselsContainer.replaceChildren();
            return;

        case "empty":
            showMessage(categoryList, "محصولی برای نمایش وجود ندارد");
            showBlockMessage(carouselsContainer, "محصولی برای نمایش وجود ندارد");
            return;

        case "error":
            showMessage(categoryList, "بارگذاری فروشگاه ناموفق بود");
            showBlockMessage(carouselsContainer, state.message);
            return;

        default: {
            const neverState: never = state;
            return neverState;
        }
    }
}