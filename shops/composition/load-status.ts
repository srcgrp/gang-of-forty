import type { LoadState } from "./types";

export function renderLoadStatus(state: LoadState): void {
  const status = document.querySelector<HTMLElement>("#page-status");
  if (!status) throw new Error("پیام وضعیت صفحه پیدا نشد.");
  switch (state.status) {
    case "loading":
      status.textContent = "در حال دریافت اطلاعات فروشگاه...";
      return;
    case "success":
      status.textContent = "";
      return;
    case "empty":
      status.textContent = "هنوز محصولی برای نمایش وجود ندارد.";
      return;
    case "error":
      status.textContent = state.message;
      return;
    default: {
      const unexpectedState: never = state;
      throw new Error("وضعیت ناشناخته: " + String(unexpectedState));
    }
  }
}
