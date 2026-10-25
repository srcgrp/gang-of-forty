import type { LoadState } from "../types/load.ts";

export function renderStatus(state: LoadState): void {
  const el = document.querySelector<HTMLParagraphElement>("#status");
  if (!el) throw new Error("index.html is missing an element");
  switch (state.status) {
    case "loading":
      el.hidden = false;
      el.className = "status";
      el.textContent = "در حال بارگذاری...";
      break;
    case "success":
      el.hidden = true;
      el.className = "status";
      el.textContent = "";
      break;
    case "empty":
      el.hidden = false;
      el.className = "status";
      el.textContent = "چیزی پیدا نشد.";
      break;
    case "error":
      el.hidden = false;
      el.className = "status error";
      el.textContent = state.message;
      break;
    default: {
      const forgotten: never = state;
      throw new Error("forgotten state: " + forgotten);
    }
  }
}

export function renderError(): void {
  renderStatus({
    status: "error",
    message: "بارگذاری نشد. لطفا صفحه را رفرش کنید.",
  });
}
