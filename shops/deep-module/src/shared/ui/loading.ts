
import { h } from "./dom";

let loaderEl: HTMLElement | null = null;

export function showLoading(): void {
  if (loaderEl) return;

  loaderEl = h("div", "global-loader");
  loaderEl.setAttribute("role", "status");
  loaderEl.setAttribute("aria-live", "polite");

  const spinner = h("div", "global-loader__spinner");
  spinner.setAttribute("aria-hidden", "true");

  const text = h("div", "global-loader__text", "در حال دریافت اطلاعات...");
  const subtext = h("div", "global-loader__subtext", "لطفاً چند لحظه صبر کنید");
  subtext.setAttribute("aria-hidden", "true");

  loaderEl.append(spinner, text, subtext);
  document.body.appendChild(loaderEl);
}

export function hideLoading(): void {
  if (!loaderEl) return;
  loaderEl.classList.add("global-loader--hidden");
  const el = loaderEl;
  loaderEl = null;

  setTimeout(() => el.remove(), 400);
}
