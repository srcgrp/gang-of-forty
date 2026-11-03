import { h } from "./dom";

let offlineBannerEl: HTMLDivElement | null = null;

export function showOfflineBanner(): void {
  if (offlineBannerEl) return;
  const banner = h("div", "offline-banner");
  banner.setAttribute("role", "alert");
  const icon = h("span", "offline-banner__icon", "📡");
  icon.setAttribute("aria-hidden", "true");
  const text = h(
    "span",
    "offline-banner__text",
    "اتصال اینترنت شما قطع شد — از داده‌های ذخیره‌شده استفاده می‌شود",
  );
  banner.append(icon, text);
  document.body.prepend(banner);
  offlineBannerEl = banner;
  void banner.offsetWidth;
  banner.classList.add("offline-banner--visible");
}

export function hideOfflineBanner(): void {
  if (!offlineBannerEl) return;
  offlineBannerEl.classList.remove("offline-banner--visible");
  const el = offlineBannerEl;
  offlineBannerEl = null;
  setTimeout(() => el.remove(), 300);
}

interface RetryToastOptions {
  attempt: number;
  total: number;
  waitMs: number;
}

interface RetryToastEl extends HTMLDivElement {
  _timer?: ReturnType<typeof setTimeout>;
}

export function showRetryToast({
  attempt,
  total,
  waitMs,
}: RetryToastOptions): void {
  let toast = document.querySelector<RetryToastEl>(".retry-toast");
  if (!toast) {
    toast = document.createElement("div") as RetryToastEl;
    toast.className = "retry-toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  const spinner = h("span", "retry-toast__spinner");
  spinner.setAttribute("aria-hidden", "true");
  const text = h(
    "span",
    undefined,
    `تلاش مجدد (${attempt}/${total}) — ${Math.ceil(waitMs / 1000)} ثانیه...`,
  );
  toast.replaceChildren(spinner, text);
  requestAnimationFrame(() => toast.classList.add("retry-toast--visible"));
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("retry-toast--visible");
    setTimeout(() => toast.remove(), 300);
  }, waitMs + 500);
}