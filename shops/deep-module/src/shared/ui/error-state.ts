import type { ApiErrorType } from "../types";
import { h } from "./dom";

export interface ErrorOptions {
  title?: string;
  text?: string;
  errorType?: ApiErrorType;
  onRetry?: (() => Promise<void>) | null;
}

const ICONS: Record<ApiErrorType, string> = {
  offline: "📡",
  timeout: "⏱️",
  network: "🌐",
  http: "🚫",
  parse: "🧩",
  abort: "⏹️",
  unknown: "⚠️",
};

export function renderError(
  container: HTMLElement | null,
  options: ErrorOptions = {},
): void {
  if (!container) return;
  const {
    title = "خطا در دریافت اطلاعات",
    text = "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.",
    errorType = "unknown",
    onRetry = null,
  } = options;

  const li = h("li", "state-error");
  li.setAttribute("role", "alert");
  li.dataset.errorType = errorType;

  const icon = h("div", "state-error__icon", ICONS[errorType] ?? "⚠️");
  icon.setAttribute("aria-hidden", "true");

  li.append(
    icon,
    h("h3", "state-error__title", title),
    h("p", "state-error__text", text),
  );

  if (onRetry) li.appendChild(makeRetryButton(onRetry));

  container.replaceChildren(li);
}

function makeRetryButton(onRetry: () => Promise<void>): HTMLElement {
  const actions = h("div", "state-error__actions");
  const btn = h("button", "btn-retry");
  btn.type = "button";
  const icon = h("span", "btn-retry__icon", "🔄");
  icon.setAttribute("aria-hidden", "true");
  const label = h("span", "btn-retry__label", "تلاش مجدد");
  btn.append(icon, label);
  actions.appendChild(btn);

  btn.addEventListener("click", async () => {
    btn.classList.add("btn-retry--loading");
    btn.disabled = true;
    label.textContent = "در حال تلاش...";
    icon.textContent = "⏳";
    try {
      await onRetry();
    } finally {
      if (btn.isConnected) {
        btn.classList.remove("btn-retry--loading");
        btn.disabled = false;
        label.textContent = "تلاش مجدد";
        icon.textContent = "🔄";
      }
    }
  });

  return actions;
}