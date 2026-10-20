import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import confetti from "canvas-confetti";
import Fuse from "fuse.js";
import autoAnimate from "@formkit/auto-animate";

const notyf = new Notyf({
  position: { x: "center", y: "top" },
  duration: 2500,
  dismissible: true,
  ripple: false,
});

// ابزارها

export interface Product {
  id: number;
  name: string;
  emoji?: string;
  unit?: string;
  price: number;
  categoryId?: number;
}

export interface Category {
  id: number;
  name: string;
  emoji?: string;
  color?: string;
}

// امن کردن متن
export function escapeHTML(str: string | null | undefined): string {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// قیمت فارسی
export function formatPrice(num: number): string {
  const n = Number(num);
  if (!Number.isFinite(n) || n < 0) return "۰ تومان";
  return n.toLocaleString("fa-IR") + " تومان";
}

// تبدیل امن به عدد
export function safeInt(
  value: unknown,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
): number {
  const n = Number(value);
  if (!Number.isFinite(n) || !Number.isInteger(n)) return min;
  return Math.min(Math.max(n, min), max);
}

// چک لینک
export function safeHref(url: string | null | undefined): string {
  if (!url) return "#";
  const t = url.trim();
  if (/^#[a-zA-Z0-9_\-:.]*$/.test(t)) return t;
  if (/^tel:\+?[0-9\-() ]+$/.test(t)) return t;
  if (/^mailto:[^\s@]+@[^\s@]+$/.test(t)) return t;
  return "#";
}

// چک محصول
export function isValidProduct(p: unknown): p is Product {
  if (!p || typeof p !== "object") return false;
  const o = p as Record<string, unknown>;
  return (
    typeof o.id === "number" &&
    Number.isInteger(o.id) &&
    o.id > 0 &&
    typeof o.name === "string" &&
    o.name.length > 0 &&
    typeof o.price === "number" &&
    Number.isFinite(o.price) &&
    o.price >= 0
  );
}

// چک دسته‌بندی
export function isValidCategory(c: unknown): c is Category {
  if (!c || typeof c !== "object") return false;
  const o = c as Record<string, unknown>;
  return (
    typeof o.id === "number" &&
    Number.isInteger(o.id) &&
    o.id > 0 &&
    typeof o.name === "string" &&
    o.name.length > 0
  );
}

// ساختن المان
function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string | number | null,
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined && text !== null) el.textContent = String(text);
  return el;
}

// نوع خطا
export type ErrorType =
  | "offline"
  | "timeout"
  | "network"
  | "http"
  | "parse"
  | "abort"
  | "unknown";

interface OptionsError {
  title?: string;
  text?: string;
  retryLabel?: string;
  onRetry?: (() => Promise<void>) | null;
  errorType?: ErrorType;
}

// نمایش خطا
export function renderError(
  container: HTMLElement | null,
  options: OptionsError = {},
): void {
  if (!container) return;
  const {
    title = "خطا در دریافت اطلاعات",
    text = "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.",
    retryLabel = "تلاش مجدد",
    onRetry = null,
    errorType = "unknown",
  } = options;

  const icons: Record<ErrorType, string> = {
    offline: "📡",
    timeout: "⏱️",
    network: "🌐",
    http: "🚫",
    parse: "🧩",
    abort: "⏹️",
    unknown: "⚠️",
  };

  const li = h("li", "state-error");
  li.setAttribute("role", "alert");
  li.dataset.errorType = errorType;

  const icon = h("div", "state-error__icon", icons[errorType] ?? "⚠️");
  icon.setAttribute("aria-hidden", "true");

  li.append(
    icon,
    h("h3", "state-error__title", title),
    h("p", "state-error__text", text),
  );

  if (onRetry) {
    const actions = h("div", "state-error__actions");
    const btn = h("button", "btn-retry");
    btn.type = "button";

    const btnIcon = h("span", "btn-retry__icon", "🔄");
    btnIcon.setAttribute("aria-hidden", "true");
    const btnLabel = h("span", "btn-retry__label", retryLabel);

    btn.append(btnIcon, btnLabel);
    actions.appendChild(btn);
    li.appendChild(actions);

    btn.addEventListener("click", async () => {
      btn.classList.add("btn-retry--loading");
      btn.disabled = true;
      const lbl = btn.querySelector<HTMLElement>(".btn-retry__label");
      const ico = btn.querySelector<HTMLElement>(".btn-retry__icon");
      if (!lbl || !ico) return;
      const ol = lbl.textContent;
      const oi = ico.textContent;
      lbl.textContent = "در حال تلاش...";
      ico.textContent = "⏳";
      try {
        await onRetry();
      } finally {
        if (btn.isConnected) {
          btn.classList.remove("btn-retry--loading");
          btn.disabled = false;
          lbl.textContent = ol;
          ico.textContent = oi;
        }
      }
    });
  }

  container.replaceChildren(li);
}

interface OptionEvent {
  text?: string;
  title?: string;
  icon?: string;
}

// نمایش خالی
export function renderEmpty(
  container: HTMLElement | null,
  options: OptionEvent = {},
): void {
  if (!container) return;
  const {
    title = "چیزی برای نمایش نیست",
    text = "به‌زودی محصولات جدید اضافه می‌شود.",
    icon = "📭",
  } = options;

  const li = h("li", "state-empty");
  const iconEl = h("div", "state-empty__icon", icon);
  iconEl.setAttribute("aria-hidden", "true");

  li.append(
    iconEl,
    h("h3", "state-empty__title", title),
    h("p", "state-empty__text", text),
  );
  container.replaceChildren(li);
}

// اسکلتون محصول
export function renderSkeletonProducts(
  container: HTMLElement | null,
  count: number = 4,
): void {
  if (!container) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const li = h("li", "skeleton-card");
    li.setAttribute("aria-hidden", "true");
    li.append(
      h("div", "skeleton skeleton-card__media"),
      h("div", "skeleton skeleton-card__title"),
      h("div", "skeleton skeleton-card__meta"),
      h("div", "skeleton skeleton-card__price"),
    );
    frag.appendChild(li);
  }
  container.replaceChildren(frag);
}

// اسکلتون دسته
export function renderSkeletonCategories(
  container: HTMLElement | null,
  count: number = 7,
): void {
  if (!container) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const li = h("li", "skeleton-category");
    li.setAttribute("aria-hidden", "true");
    li.append(
      h("div", "skeleton skeleton-category__icon"),
      h("div", "skeleton skeleton-category__title"),
    );
    frag.appendChild(li);
  }
  container.replaceChildren(frag);
}

let offlineBannerEl: HTMLDivElement | null = null;

// بنر آفلاین
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

interface RetryToastElement extends HTMLDivElement {
  _timer?: ReturnType<typeof setTimeout>;
}

// توست تلاش مجدد
export function showRetryToast({
  attempt,
  total,
  waitMs,
}: RetryToastOptions): void {
  let toast = document.querySelector<RetryToastElement>(".retry-toast");

  if (!toast) {
    toast = document.createElement("div") as RetryToastElement;
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

// سبد خرید

const CART_KEY = "supermarket_cart";
const MAX_ITEMS = 100;
const MAX_QUANTITY = 99;

export interface CartItem extends Product {
  quantity: number;
}

// پاک‌سازی آیتم
function validateCartItem(item: unknown): CartItem | null {
  if (!item || typeof item !== "object") return null;
  const raw = item as Record<string, unknown>;
  const id = safeInt(raw.id, 0);
  if (id <= 0) return null;
  const name = typeof raw.name === "string" ? raw.name.slice(0, 100) : "";
  if (!name) return null;
  const price = safeInt(raw.price, 0);
  if (price < 0) return null;
  const quantity = safeInt(raw.quantity, 1, MAX_QUANTITY);
  return {
    id,
    name,
    emoji: typeof raw.emoji === "string" ? raw.emoji.slice(0, 8) : "📦",
    unit: typeof raw.unit === "string" ? raw.unit.slice(0, 50) : "",
    price,
    quantity,
  };
}

// گرفتن سبد
export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .slice(0, MAX_ITEMS)
      .map(validateCartItem)
      .filter((item): item is CartItem => item !== null);
  } catch {
    console.warn("سبد خرید آلوده بود، پاک شد");
    localStorage.removeItem(CART_KEY);
    return [];
  }
}

// ذخیره سبد
function saveCart(cart: CartItem[]): void {
  const safeCart = cart
    .slice(0, MAX_ITEMS)
    .map(validateCartItem)
    .filter((item): item is CartItem => item !== null);
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(safeCart));
  } catch (err: unknown) {
    console.error("خطا در ذخیره سبد:", err);
  }
  updateCartUI();
  window.dispatchEvent(
    new CustomEvent<CartItem[]>("cart:updated", { detail: safeCart }),
  );
}

// اضافه به سبد
export function addToCart(product: Product): CartItem[] {
  if (!isValidProduct(product)) return getCart();
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    if (existing.quantity >= MAX_QUANTITY) return cart;
    existing.quantity += 1;
  } else {
    if (cart.length >= MAX_ITEMS) return cart;
    cart.push({
      id: product.id,
      name: String(product.name).slice(0, 100),
      emoji: String(product.emoji || "📦").slice(0, 8),
      price: safeInt(product.price, 0),
      unit: String(product.unit || "").slice(0, 50),
      quantity: 1,
    });
  }
  saveCart(cart);
  return cart;
}

// حذف
export function removeFromCart(id: number): void {
  const safeId = safeInt(id, 0);
  if (safeId <= 0) return;
  saveCart(getCart().filter((item) => item.id !== safeId));
}

// کم کردن تعداد
export function decreaseQuantity(id: number): void {
  const safeId = safeInt(id, 0);
  if (safeId <= 0) return;
  const cart = getCart();
  const item = cart.find((i) => i.id === safeId);
  if (!item) return;
  if (item.quantity > 1) {
    item.quantity -= 1;
    saveCart(cart);
  } else {
    removeFromCart(safeId);
  }
}

// جمع کل
export function getCartTotal(): number {
  return getCart().reduce(
    (s, i) => s + safeInt(i.price, 0) * safeInt(i.quantity, 0),
    0,
  );
}

// تعداد کل
export function getCartCount(): number {
  return getCart().reduce((s, i) => s + safeInt(i.quantity, 0), 0);
}

export function clearCart(): void {
  saveCart([]);
}

// آپدیت UI سبد
function updateCartUI(): void {
  const count = getCartCount();
  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = count.toLocaleString("fa-IR");
    badge.style.display = count > 0 ? "grid" : "none";
  }
  renderCartModal();
}

// مودال سبد
function renderCartModal(): void {
  const body = document.getElementById("cart-body");
  const footer = document.getElementById("cart-footer");
  if (!body || !footer) return;

  const cart = getCart();
  body.replaceChildren();
  footer.replaceChildren();

  if (cart.length === 0) {
    const empty = h("div", "cart-empty");
    const icon = h("span", "cart-empty__icon", "🛒");
    icon.setAttribute("aria-hidden", "true");
    empty.append(
      icon,
      h("p", "cart-empty__text", "سبد خرید شما خالی است"),
      h("p", "cart-empty__hint", "محصولی به سبد اضافه کنید"),
    );
    body.appendChild(empty);
    return;
  }

  cart.forEach((item) => {
    const el = h("div", "cart-item");
    el.dataset.id = String(item.id);

    const media = h("div", "cart-item__media", item.emoji ?? "");
    const info = h("div", "cart-item__info");
    info.append(
      h("h4", "cart-item__name", item.name),
      h("p", "cart-item__unit", item.unit ?? ""),
    );

    const controls = h("div", "cart-item__controls");

    const minusBtn = h("button", "cart-item__btn", "−");
    minusBtn.type = "button";
    minusBtn.dataset.action = "decrease";
    minusBtn.dataset.id = String(item.id);
    minusBtn.setAttribute("aria-label", "کم کردن");

    const qty = h(
      "span",
      "cart-item__qty",
      item.quantity.toLocaleString("fa-IR"),
    );

    const plusBtn = h("button", "cart-item__btn", "+");
    plusBtn.type = "button";
    plusBtn.dataset.action = "increase";
    plusBtn.dataset.id = String(item.id);
    plusBtn.setAttribute("aria-label", "زیاد کردن");

    controls.append(minusBtn, qty, plusBtn);

    const price = h(
      "div",
      "cart-item__price",
      formatPrice(item.price * item.quantity),
    );

    const removeBtn = h("button", "cart-item__remove", "✕");
    removeBtn.type = "button";
    removeBtn.dataset.action = "remove";
    removeBtn.dataset.id = String(item.id);
    removeBtn.setAttribute("aria-label", "حذف");

    el.append(media, info, controls, price, removeBtn);
    body.appendChild(el);
  });

  const totalBox = h("div", "cart-total");
  totalBox.append(
    h("span", "cart-total__label", "جمع کل:"),
    h("span", "cart-total__value", formatPrice(getCartTotal())),
  );

  const checkoutBtn = h("button", "btn btn--primary", "تسویه حساب");
  checkoutBtn.type = "button";

  checkoutBtn.addEventListener("click", () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#2e7d32", "#a5d6a7", "#ffd470", "#f9a825"],
    });
    notyf.success("سفارش شما با موفقیت ثبت شد! 🎉");
    clearCart();
    closeModal("cart-modal");
  });

  footer.append(totalBox, checkoutBtn);
}

// باز کردن مودال
export function openModal(id: string): void {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("modal--open");
  document.body.style.overflow = "hidden";
}

// بستن مودال
export function closeModal(id: string): void {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove("modal--open");
  if (!document.querySelector(".modal--open")) {
    document.body.style.overflow = "";
  }
}

// کلیک سراسری
document.addEventListener("click", (e: MouseEvent) => {
  if (!(e.target instanceof Element)) return;

  const cartBtn = e.target.closest<HTMLElement>("#cart-btn");
  if (cartBtn) {
    e.preventDefault();
    e.stopPropagation();
    openModal("cart-modal");
    return;
  }

  const closeEl = e.target.closest<HTMLElement>("[data-close]");
  if (closeEl) {
    e.preventDefault();
    e.stopPropagation();
    const closeId = closeEl.dataset.close;
    if (closeId) closeModal(closeId);
    return;
  }

  if (e.target.classList.contains("modal__overlay")) {
    const modal = e.target.closest<HTMLElement>(".modal");
    if (modal) closeModal(modal.id);
    return;
  }

  const actionBtn = e.target.closest<HTMLElement>("[data-action]");
  if (actionBtn) {
    const action = actionBtn.dataset.action;
    const id = safeInt(actionBtn.dataset.id, 0);
    if (id <= 0) return;
    if (action === "increase") {
      const item = getCart().find((i) => i.id === id);
      if (item) addToCart(item);
    } else if (action === "decrease") decreaseQuantity(id);
    else if (action === "remove") removeFromCart(id);
  }
});

// بستن با ESC
document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll<HTMLElement>(".modal--open").forEach((m) => {
    closeModal(m.id);
  });
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateCartUI);
} else {
  updateCartUI();
}

export function initCart(): void {}
export function initModals(): void {}

// جزئیات محصول

interface DetailProduct {
  id: number;
  name: string;
  emoji?: string;
  unit?: string;
  price: number;
}

// نمایش جزئیات
export function openProductDetail(product: DetailProduct): void {
  const modal = document.getElementById("product-modal");
  if (!modal) return;
  const body = modal.querySelector<HTMLDivElement>(".modal__body");
  if (!body) return;

  const container = h("div", "product-detail");
  const media = h("div", "product-detail__media");
  media.appendChild(h("span", "product-detail__emoji", product.emoji || "📦"));

  const info = h("div", "product-detail__info");

  const priceDiv = h("div", "product-detail__price");
  priceDiv.appendChild(
    h("span", "product-detail__price-value", formatPrice(product.price)),
  );

  const addBtn = h("button", "btn btn--primary product-detail__add");
  addBtn.type = "button";
  addBtn.dataset.id = String(product.id);
  const btnIcon = h("span", undefined, "🛒");
  btnIcon.setAttribute("aria-hidden", "true");
  addBtn.append(btnIcon, " افزودن به سبد خرید");

  info.append(
    h("h2", "product-detail__title", product.name),
    h("p", "product-detail__unit", product.unit || ""),
    h(
      "p",
      "product-detail__desc",
      "محصول تازه و با کیفیت از فروشگاه سبزکاله. ارسال سریع به سراسر شهر.",
    ),
    priceDiv,
    addBtn,
  );

  container.append(media, info);
  body.replaceChildren(container);

  addBtn.addEventListener("click", () => {
    addToCart(product);
    notyf.success(`${product.name} به سبد اضافه شد`);
    addBtn.textContent = "✓ اضافه شد";
    addBtn.classList.add("btn--success");
    setTimeout(() => {
      if (addBtn.isConnected) {
        const icon = h("span", undefined, "🛒");
        icon.setAttribute("aria-hidden", "true");
        addBtn.replaceChildren(icon, " افزودن به سبد خرید");
        addBtn.classList.remove("btn--success");
      }
    }, 1500);
  });

  openModal("product-modal");
}

// حالت تاریک

const THEME_BTN_SELECTOR = "#theme-btn";
const ICON_SELECTOR = ".theme-btn__icon";

const SVG_SUN = `<svg class="svg_theme" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`;

const SVG_MOON = `<svg class="svg_theme" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;

function createSvgElement(svgString: string): Element {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString.trim(), "image/svg+xml");
  return doc.documentElement;
}

function getTheme(): string {
  try {
    return localStorage.getItem("theme") || "auto";
  } catch {
    return "auto";
  }
}

function setTheme(theme: string): void {
  const html = document.documentElement;
  const icon = document.querySelector(ICON_SELECTOR);
  html.classList.remove("dark-theme", "light-theme");

  let svgString: string | null = null;
  if (theme === "dark") {
    html.classList.add("dark-theme");
    svgString = SVG_SUN;
  } else if (theme === "light") {
    html.classList.add("light-theme");
    svgString = SVG_MOON;
  } else {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      html.classList.add("dark-theme");
      svgString = SVG_SUN;
    } else {
      svgString = SVG_MOON;
    }
  }

  if (icon && svgString) {
    icon.replaceChildren(createSvgElement(svgString));
  }

  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

setTheme(getTheme());

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (getTheme() === "auto") setTheme("auto");
  });

document.addEventListener("click", (e: MouseEvent) => {
  if (!(e.target instanceof Element)) return;
  const btn = e.target.closest(THEME_BTN_SELECTOR);
  if (!btn) return;
  const isDark = document.documentElement.classList.contains("dark-theme");
  setTheme(isDark ? "light" : "dark");
});

// API

const API_BASE = "../../api";
const DEFAULT_TIMEOUT = 8000;
const MAX_RETRIES = 3;
const CACHE_PREFIX = "shop_cache_";
const CACHE_TTL = 1000 * 60 * 30;

export type ApiErrorType =
  | "offline"
  | "timeout"
  | "network"
  | "http"
  | "parse"
  | "abort"
  | "unknown";

interface ApiErrorOptions {
  type?: ApiErrorType;
  status?: number | null;
  url?: string | null;
}

export class ApiError extends Error {
  type: ApiErrorType;
  status: number | null;
  url: string | null;

  constructor(
    message: string,
    { type = "unknown", status = null, url = null }: ApiErrorOptions = {},
  ) {
    super(message);
    this.name = "ApiError";
    this.type = type;
    this.status = status;
    this.url = url;
  }

  get userMessage(): string {
    switch (this.type) {
      case "offline":
        return "اتصال اینترنت را بررسی کنید";
      case "timeout":
        return "پاسخی از سرور دریافت نشد";
      case "network":
        return "ارتباط با سرور برقرار نشد";
      case "http":
        if (this.status === 404) return "اطلاعات مورد نظر یافت نشد";
        if (this.status !== null && this.status >= 500)
          return "سرور با مشکل مواجه است";
        return `خطای سرور (${this.status})`;
      case "parse":
        return "پاسخ سرور نامعتبر بود";
      default:
        return "خطای نامشخصی رخ داد";
    }
  }
}

interface FetchOptions {
  timeout?: number;
  signal?: AbortSignal;
}

async function fetchWithTimeout(
  url: string,
  { timeout = DEFAULT_TIMEOUT, signal }: FetchOptions = {},
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort("timeout"), timeout);

  const onAbort = () => controller.abort("external");
  if (signal) {
    if (signal.aborted) controller.abort("external");
    else signal.addEventListener("abort", onAbort, { once: true });
  }

  try {
    return await fetch(url, { signal: controller.signal });
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      if (controller.signal.reason === "timeout")
        throw new ApiError("درخواست منقضی شد", { type: "timeout", url });
      throw new ApiError("درخواست لغو شد", { type: "abort", url });
    }
    if (!navigator.onLine)
      throw new ApiError("دستگاه آفلاین است", { type: "offline", url });
    throw new ApiError("خطای شبکه", { type: "network", url });
  } finally {
    clearTimeout(timer);
    if (signal) signal.removeEventListener("abort", onAbort);
  }
}

const delay = (ms: number): Promise<void> =>
  new Promise<void>((r) => setTimeout(() => r(), ms));

function cacheKey(url: string): string {
  return CACHE_PREFIX + url.replace(/[^\w]/g, "_");
}

interface CacheEntry<T> {
  data: T;
  time: number;
}

function readCache<T = unknown>(url: string): T | null {
  try {
    const raw = localStorage.getItem(cacheKey(url));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() - parsed.time > CACHE_TTL) {
      localStorage.removeItem(cacheKey(url));
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache<T>(url: string, data: T): void {
  try {
    localStorage.setItem(
      cacheKey(url),
      JSON.stringify({ data, time: Date.now() }),
    );
  } catch {}
}

export function clearCache(): void {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(CACHE_PREFIX))
    .forEach((k) => localStorage.removeItem(k));
}

interface RetryInfo {
  attempt: number;
  waitMs: number;
  error: ApiError;
}

interface GetJSONOptions {
  timeout?: number;
  retries?: number;
  signal?: AbortSignal;
  useCache?: boolean;
  onRetry?: ((info: RetryInfo) => void) | null;
}

export async function getJSON<T = unknown>(
  path: string,
  options: GetJSONOptions = {},
): Promise<T> {
  const url = `${API_BASE}/${path}`;
  const {
    timeout = DEFAULT_TIMEOUT,
    retries = MAX_RETRIES,
    signal,
    useCache = true,
    onRetry = null,
  } = options;

  if (!navigator.onLine) {
    const cached = useCache ? readCache<T>(url) : null;
    if (cached !== null) return cached;
    throw new ApiError("دستگاه آفلاین است", { type: "offline", url });
  }

  let lastError: ApiError | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetchWithTimeout(url, { timeout, signal });
      if (!res.ok)
        throw new ApiError(`HTTP ${res.status}`, {
          type: "http",
          status: res.status,
          url,
        });
      let data: T;
      try {
        data = (await res.json()) as T;
      } catch {
        throw new ApiError("پاسخ سرور نامعتبر بود", { type: "parse", url });
      }
      if (useCache) writeCache(url, data);
      return data;
    } catch (err: unknown) {
      lastError =
        err instanceof ApiError ? err : new ApiError("خطای نامشخص", { url });
      const shouldRetry =
        lastError.type === "network" ||
        lastError.type === "timeout" ||
        (lastError.type === "http" &&
          lastError.status !== null &&
          lastError.status >= 500);
      if (!shouldRetry || attempt === retries || signal?.aborted) break;
      const waitMs = Math.min(500 * Math.pow(2, attempt), 3000);
      if (onRetry) onRetry({ attempt: attempt + 1, waitMs, error: lastError });
      await delay(waitMs);
    }
  }

  if (useCache) {
    const cached = readCache<T>(url);
    if (cached !== null) return cached;
  }
  if (!lastError) throw new ApiError("خطای نامشخص", { url });
  throw lastError;
}

export const api = {
  products: <T = unknown>(o?: GetJSONOptions) => getJSON<T>("products.json", o),
  categories: <T = unknown>(o?: GetJSONOptions) =>
    getJSON<T>("categories.json", o),
  shop: <T = unknown>(o?: GetJSONOptions) => getJSON<T>("shop.json", o),
  home: <T = unknown>(o?: GetJSONOptions) => getJSON<T>("home.json", o),
  offers: <T = unknown>(o?: GetJSONOptions) => getJSON<T>("offers.json", o),
  stock: <T = unknown>(o?: GetJSONOptions) => getJSON<T>("stock.json", o),
};

interface ConnectivityHandlers {
  onOnline?: () => void;
  onOffline?: () => void;
}

export function watchConnectivity({
  onOnline,
  onOffline,
}: ConnectivityHandlers = {}): () => void {
  const online = () => onOnline?.();
  const offline = () => onOffline?.();
  window.addEventListener("online", online);
  window.addEventListener("offline", offline);
  return () => {
    window.removeEventListener("online", online);
    window.removeEventListener("offline", offline);
  };
}

// main

interface Offer {
  productId: number;
  percent: number;
}
interface StockData {
  items: Record<number, number>;
}
interface ShopMenu {
  href: string;
  label: string;
}
interface ShopHelp {
  href: string;
  label: string;
}
interface ShopSchedule {
  days: string;
  time: string;
}
interface Shop {
  name?: string;
  slogan?: string;
  notice?: string;
  about?: string;
  phone?: string;
  copyright?: string;
  menu?: ShopMenu[];
  help?: ShopHelp[];
  schedule?: ShopSchedule[];
}
interface HeroCTA {
  href: string;
  label: string;
}
interface HeroSection {
  title?: string;
  text?: string;
  cta?: HeroCTA;
}
interface HomePromo {
  href: string;
  emoji?: string;
  text?: string;
}
interface Home {
  hero?: HeroSection;
  side?: HeroSection;
  promos?: HomePromo[];
}
interface FilterState {
  categoryId: string;
  stock: string;
  discount: string;
  sort: string;
}
interface RenderData {
  products: Product[];
  categories: Category[];
  shop: Shop;
  home: Home;
  offers: Offer[];
  stock: StockData;
}

const filterState: FilterState = {
  categoryId: "all",
  stock: "all",
  discount: "all",
  sort: "default",
};

let allProductsData: Product[] = [];
let allOffersData: Offer[] = [];
let allStockItems: Record<number, number> = {};
let allCategoriesData: Category[] = [];
let lastLoadError: ApiError | null = null;
let isLoading = false;

// Fuse
let fuseInstance: Fuse<Product> | null = null;

function initFuse(): void {
  fuseInstance = new Fuse(allProductsData, {
    keys: ["name", "unit"],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
  });
}

// فلش SVG
function createArrowSvg(): SVGElement {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "14");
  svg.setAttribute("height", "14");
  const path = document.createElementNS(NS, "path");
  path.setAttribute("d", "M5 12h14M13 6l6 6-6 6");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "2.5");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  svg.appendChild(path);
  return svg;
}

// ساخت کارت محصول
function createProductCard(
  product: Product,
  offer: Offer | null = null,
  quantity: number | null = null,
): HTMLLIElement {
  const isOut = quantity === 0;

  const li = h(
    "li",
    "product-card" + (isOut ? " product-card--unavailable" : ""),
  );
  li.dataset.id = String(product.id);

  if (isOut) {
    li.appendChild(h("span", "badge badge--danger", "ناموجود"));
  } else if (offer && Number.isFinite(offer.percent)) {
    const pct = Math.min(Math.max(Number(offer.percent), 0), 99);
    li.appendChild(h("span", "badge", `${pct}٪`));
  }

  const media = h("div", "product-card__media");
  const emoji = h("span", "product-card__emoji", product.emoji || "📦");
  emoji.setAttribute("aria-hidden", "true");
  media.appendChild(emoji);

  const footer = h("div", "product-card__footer");
  const priceDiv = h("div", "product-card__price");

  if (offer && !isOut && Number.isFinite(offer.percent)) {
    const pct = Math.min(Math.max(Number(offer.percent), 0), 99);
    const finalPrice = Math.round(product.price * (1 - pct / 100));
    priceDiv.append(
      h("del", undefined, formatPrice(product.price)),
      h("ins", undefined, formatPrice(finalPrice)),
    );
  } else {
    priceDiv.appendChild(h("ins", undefined, formatPrice(product.price)));
  }

  const addBtn = h("button", "btn-add", "+");
  addBtn.type = "button";
  addBtn.dataset.id = String(product.id);
  addBtn.setAttribute(
    "aria-label",
    isOut ? "ناموجود" : `افزودن ${product.name} به سبد`,
  );
  addBtn.disabled = isOut;

  footer.append(priceDiv, addBtn);
  li.append(
    media,
    h("h3", "product-card__title", product.name),
    h("p", "product-card__meta", product.unit || ""),
    footer,
  );
  return li;
}

// وصل کردن رویدادها
function attachProductEvents(
  container: HTMLElement | null,
  products: Product[],
): void {
  if (!container) return;
  container.querySelectorAll<HTMLElement>(".product-card").forEach((card) => {
    const id = Number(card.dataset.id);
    if (!id) return;
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const addBtn = card.querySelector<HTMLButtonElement>(".btn-add");
    if (addBtn && !addBtn.disabled) {
      addBtn.addEventListener("click", (e: MouseEvent) => {
        e.stopPropagation();
        addToCart(product);
        notyf.success(`${product.name} به سبد اضافه شد`);
        addBtn.classList.add("btn-add--added");
        addBtn.textContent = "✓";
        setTimeout(() => {
          if (addBtn.isConnected) {
            addBtn.classList.remove("btn-add--added");
            addBtn.textContent = "+";
          }
        }, 800);
      });
    }
  });
}

// نمایش محصولات فیلترشده
function renderFilteredProducts(): void {
  const track = document.getElementById("all-track");
  const countEl = document.getElementById("all-count");
  if (!track || allProductsData.length === 0) return;

  let result = [...allProductsData];

  if (filterState.categoryId !== "all")
    result = result.filter(
      (p) => p.categoryId === Number(filterState.categoryId),
    );
  if (filterState.stock === "in")
    result = result.filter((p) => (allStockItems[p.id] ?? 0) > 0);
  else if (filterState.stock === "out")
    result = result.filter((p) => (allStockItems[p.id] ?? 0) === 0);
  if (filterState.discount === "yes")
    result = result.filter((p) =>
      allOffersData.some((o) => o.productId === p.id),
    );

  // جستجو با Fuse
  if (searchQuery) {
    if (fuseInstance) {
      const matchedIds = new Set(
        fuseInstance.search(searchQuery).map((r) => r.item.id),
      );
      result = result.filter((p) => matchedIds.has(p.id));
    } else {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
  }

  if (filterState.sort === "price-asc")
    result.sort((a, b) => a.price - b.price);
  else if (filterState.sort === "price-desc")
    result.sort((a, b) => b.price - a.price);
  else if (filterState.sort === "name")
    result.sort((a, b) => a.name.localeCompare(b.name, "fa"));

  track.replaceChildren();

  if (result.length === 0) {
    const empty = h("li", "products-empty");
    const emptyText = searchQuery
      ? `نتیجه‌ای برای "${searchQuery}" پیدا نشد`
      : "محصولی پیدا نشد";
    const emptyHint = searchQuery
      ? "عبارت دیگری را امتحان کنید"
      : "فیلترها را تغییر دهید";
    empty.append(
      h("span", "products-empty__icon", "🔍"),
      h("p", "products-empty__text", emptyText),
      h("p", "products-empty__hint", emptyHint),
    );
    track.appendChild(empty);
  } else {
    const frag = document.createDocumentFragment();
    result.forEach((p) => {
      const offer = allOffersData.find((o) => o.productId === p.id) ?? null;
      frag.appendChild(
        createProductCard(p, offer, allStockItems[p.id] ?? null),
      );
    });
    track.appendChild(frag);
    attachProductEvents(track, allProductsData);
  }

  if (countEl)
    countEl.textContent = `${result.length.toLocaleString("fa-IR")} کالا`;

  const activeCount = [
    filterState.categoryId !== "all",
    filterState.stock !== "all",
    filterState.discount !== "all",
    filterState.sort !== "default",
  ].filter(Boolean).length;

  const badge = document.getElementById("filter-badge");
  if (badge) {
    if (activeCount > 0) {
      badge.hidden = false;
      badge.textContent = activeCount.toLocaleString("fa-IR");
    } else badge.hidden = true;
  }
}

// مودال فیلتر
function setupFilterModal(): void {
  const filterBtn = document.getElementById("filter-btn");
  const filterModal = document.querySelector<HTMLElement>("#filter-modal");
  const categoriesBox = document.getElementById("filter-categories");
  const applyBtn = document.getElementById("filter-apply");
  const resetBtn = document.getElementById("filter-reset");

  if (!filterModal) return;

  if (categoriesBox && allCategoriesData.length) {
    categoriesBox.replaceChildren();
    const allBtn = h("button", "filter-chip filter-chip--active", "همه");
    allBtn.type = "button";
    allBtn.dataset.category = "all";
    categoriesBox.appendChild(allBtn);

    allCategoriesData.forEach((cat) => {
      const btn = h("button", "filter-chip");
      btn.type = "button";
      btn.dataset.category = String(cat.id);
      btn.append(
        h("span", "filter-chip__emoji", cat.emoji || ""),
        " " + cat.name,
      );
      categoriesBox.appendChild(btn);
    });
  }

  filterBtn?.addEventListener("click", () => {
    filterModal.classList.add("modal--open");
    document.body.style.overflow = "hidden";
  });

  filterModal.addEventListener("click", (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    const chip = e.target.closest<HTMLElement>(".filter-chip");
    if (!chip) return;
    const box = chip.parentElement;
    if (!box) return;
    box.querySelectorAll<HTMLElement>(".filter-chip").forEach((c) => {
      c.classList.remove("filter-chip--active");
    });
    chip.classList.add("filter-chip--active");

    if (chip.dataset.category !== undefined)
      filterState.categoryId = chip.dataset.category;
    else if (chip.dataset.stock !== undefined)
      filterState.stock = chip.dataset.stock;
    else if (chip.dataset.discount !== undefined)
      filterState.discount = chip.dataset.discount;
    else if (chip.dataset.sort !== undefined)
      filterState.sort = chip.dataset.sort;
  });

  applyBtn?.addEventListener("click", () => {
    renderFilteredProducts();
    filterModal.classList.remove("modal--open");
    document.body.style.overflow = "";
  });

  resetBtn?.addEventListener("click", () => {
    filterState.categoryId = "all";
    filterState.stock = "all";
    filterState.discount = "all";
    filterState.sort = "default";
    filterModal
      .querySelectorAll<HTMLElement>(".filter-chips")
      .forEach((box) => {
        const chips = box.querySelectorAll<HTMLElement>(".filter-chip");
        chips.forEach((c, i) =>
          c.classList.toggle("filter-chip--active", i === 0),
        );
      });
  });

  filterModal.querySelectorAll<HTMLElement>("[data-close]").forEach((el) => {
    el.addEventListener("click", () => {
      filterModal.classList.remove("modal--open");
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && filterModal.classList.contains("modal--open")) {
      filterModal.classList.remove("modal--open");
      document.body.style.overflow = "";
    }
  });
}

// رندر همه
function renderAll({
  products,
  categories,
  shop,
  home,
  offers,
  stock,
}: RenderData): void {
  const stockItems =
    stock?.items && typeof stock.items === "object" ? stock.items : {};

  allProductsData = products;
  allOffersData = offers;
  allStockItems = stockItems;
  allCategoriesData = categories;

  // Fuse رو بساز
  initFuse();

  // تاپ‌بار
  const topbarText = document.getElementById("topbar-text");
  if (topbarText && shop?.notice)
    topbarText.textContent = String(shop.notice).slice(0, 200);

  // برند
  const brandName = document.getElementById("brand-name");
  if (brandName && shop?.name)
    brandName.textContent = String(shop.name).slice(0, 50);
  const brandSlogan = document.getElementById("brand-slogan");
  if (brandSlogan && shop?.slogan)
    brandSlogan.textContent = String(shop.slogan).slice(0, 100);

  // منو
  const navLinks = document.getElementById("nav-links");
  if (navLinks && Array.isArray(shop?.menu)) {
    navLinks.replaceChildren();
    shop.menu.slice(0, 10).forEach((item) => {
      if (!item || typeof item !== "object") return;
      const li = h("li");
      const a = h("a", undefined, String(item.label || "").slice(0, 50));
      a.href = safeHref(item.href);
      li.appendChild(a);
      navLinks.appendChild(li);
    });
  }

  // مگا منو
  const megaList = document.getElementById("mega-list");
  if (megaList && categories.length) {
    megaList.replaceChildren();
    const frag = document.createDocumentFragment();
    categories.forEach((cat) => {
      const li = h("li");
      const a = h("a");
      a.href = `#cat-${cat.id}`;
      a.setAttribute("role", "menuitem");
      const emoji = h("span", undefined, cat.emoji || "");
      emoji.setAttribute("aria-hidden", "true");
      a.append(emoji, " " + cat.name);
      li.appendChild(a);
      frag.appendChild(li);
    });
    megaList.appendChild(frag);
  }

  // هیرو
  if (home?.hero && typeof home.hero === "object") {
    const heroTitle = document.getElementById("hero-title");
    if (heroTitle && typeof home.hero.title === "string") {
      heroTitle.replaceChildren();
      const lines = home.hero.title.slice(0, 200).split("،");
      lines.forEach((line, i) => {
        if (i > 0) heroTitle.appendChild(document.createElement("br"));
        heroTitle.appendChild(document.createTextNode(line.trim()));
      });
    }

    const heroText = document.querySelector<HTMLElement>(
      ".hero-card--primary .hero-card__text",
    );
    if (heroText && typeof home.hero.text === "string")
      heroText.textContent = home.hero.text.slice(0, 300);

    const heroBtn = document.querySelector<HTMLAnchorElement>(
      ".hero-card--primary .hero-card__btn",
    );
    if (heroBtn && home.hero.cta) {
      heroBtn.href = safeHref(home.hero.cta.href);
      const span = heroBtn.querySelector<HTMLElement>("span:first-child");
      if (span && home.hero.cta.label)
        span.textContent = String(home.hero.cta.label).slice(0, 50);
    }
  }

  // هیرو دوم
  if (home?.side && typeof home.side === "object") {
    const sideTitle = document.querySelector<HTMLElement>(
      ".hero-card--secondary .hero-card__title",
    );
    if (sideTitle && home.side.title)
      sideTitle.textContent = String(home.side.title).slice(0, 100);

    const sideText = document.querySelector<HTMLElement>(
      ".hero-card--secondary .hero-card__text",
    );
    if (sideText && home.side.text)
      sideText.textContent = String(home.side.text).slice(0, 200);

    const sideBtn = document.querySelector<HTMLAnchorElement>(
      ".hero-card--secondary .hero-card__btn",
    );
    if (sideBtn && home.side.cta) {
      sideBtn.href = safeHref(home.side.cta.href);
      const span = sideBtn.querySelector<HTMLElement>("span:first-child");
      if (span && home.side.cta.label)
        span.textContent = String(home.side.cta.label).slice(0, 50);
    }
  }

  // دسته‌بندی‌ها
  const categoriesGrid = document.getElementById("categories-grid");
  if (categoriesGrid) {
    if (categories.length === 0) {
      renderEmpty(categoriesGrid, {
        icon: "📂",
        title: "دسته‌بندی‌ای موجود نیست",
        text: "به‌زودی دسته‌بندی‌های جدید اضافه می‌شود.",
      });
    } else {
      categoriesGrid.replaceChildren();
      const frag = document.createDocumentFragment();
      categories.forEach((cat, index) => {
        const li = h("li");
        li.style.setProperty("--i", String(index));
        const a = h("a", "category-card");
        a.href = `#cat-${cat.id}`;
        const color = /^#[0-9a-fA-F]{3,8}$/.test(cat.color || "")
          ? cat.color
          : "#f0f9f1";
        const glow = h("span", "category-card__glow");
        glow.style.setProperty("--c", color!);
        const icon = h("span", "category-card__icon", cat.emoji || "");
        icon.style.background = color!;
        const arrow = h("span", "category-card__arrow");
        arrow.setAttribute("aria-hidden", "true");
        arrow.appendChild(createArrowSvg());
        a.append(
          glow,
          icon,
          h("span", "category-card__title", cat.name),
          arrow,
        );
        li.appendChild(a);
        frag.appendChild(li);
      });
      categoriesGrid.appendChild(frag);
    }
  }

  // پیشنهاد ویژه
  const specialTrack = document.getElementById("special-track");
  if (specialTrack) {
    if (offers.length === 0) {
      renderEmpty(specialTrack, {
        icon: "🔥",
        title: "پیشنهاد ویژه‌ای موجود نیست",
        text: "به‌زودی پیشنهادهای جدید اضافه می‌شود.",
      });
    } else {
      specialTrack.replaceChildren();
      const frag = document.createDocumentFragment();
      offers.forEach((offer) => {
        const product = products.find((p) => p.id === offer.productId);
        if (!product) return;
        frag.appendChild(
          createProductCard(product, offer, stockItems[product.id] ?? null),
        );
      });
      specialTrack.appendChild(frag);
      attachProductEvents(specialTrack, products);
    }
  }

  // بنرها
  const bannersWrapper = document.getElementById("banners-wrapper");
  if (bannersWrapper) {
    bannersWrapper.replaceChildren();
    if (Array.isArray(home?.promos) && home.promos.length > 0) {
      const frag = document.createDocumentFragment();
      home.promos.slice(0, 10).forEach((promo) => {
        if (!promo || typeof promo !== "object") return;
        const a = h("a", "banner");
        a.href = safeHref(promo.href);
        const icon = h("span", "banner__icon", promo.emoji || "");
        icon.setAttribute("aria-hidden", "true");
        const content = h("div", "banner__content");
        content.appendChild(h("strong", undefined, promo.text || ""));
        const arrow = h("span", "banner__arrow", "←");
        arrow.setAttribute("aria-hidden", "true");
        a.append(icon, content, arrow);
        frag.appendChild(a);
      });
      bannersWrapper.appendChild(frag);
    }
  }

  // کاروسل دسته‌ها
  const categorySections = document.getElementById("category-sections");
  if (categorySections) {
    categorySections.replaceChildren();
    if (categories.length > 0 && products.length > 0) {
      const frag = document.createDocumentFragment();
      categories.forEach((cat) => {
        const catProducts = products.filter((p) => p.categoryId === cat.id);
        if (catProducts.length === 0) return;

        const section = h("section", "carousel-section");
        section.id = `cat-${cat.id}`;
        const head = h("div", "carousel-section__head");
        const h2 = h("h2", "section-head__title");
        const emoji = h("span", undefined, cat.emoji || "");
        emoji.setAttribute("aria-hidden", "true");
        h2.append(emoji, " " + cat.name);
        head.append(
          h2,
          h(
            "span",
            "section-head__count",
            `${catProducts.length.toLocaleString("fa-IR")} کالا`,
          ),
        );

        const carousel = h("div", "carousel");
        carousel.setAttribute("role", "region");
        carousel.setAttribute("aria-label", `کاروسل ${cat.name}`);
        carousel.tabIndex = 0;
        const track = h("ul", "carousel__track");

        catProducts.forEach((p) => {
          track.appendChild(
            createProductCard(p, null, stockItems[p.id] ?? null),
          );
        });

        carousel.appendChild(track);
        section.append(head, carousel);
        frag.appendChild(section);
        attachProductEvents(track, products);
      });
      categorySections.appendChild(frag);
    }
  }

  setupFilterModal();
  renderFilteredProducts();

  // فوتر
  if (shop && typeof shop === "object") {
    const footerName = document.getElementById("footer-name");
    if (footerName && shop.name)
      footerName.textContent = String(shop.name).slice(0, 50);

    const footerAbout = document.getElementById("footer-about");
    if (footerAbout && shop.about)
      footerAbout.textContent = String(shop.about).slice(0, 300);

    const footerPhone =
      document.querySelector<HTMLAnchorElement>("#footer-phone");
    if (footerPhone && shop.phone) {
      const phone = String(shop.phone)
        .replace(/[^\d+\-\s()]/g, "")
        .slice(0, 20);
      footerPhone.textContent = phone;
      footerPhone.href = `tel:${phone.replace(/[^\d+]/g, "")}`;
    }

    const footerLinks = document.getElementById("footer-links");
    if (footerLinks && categories.length) {
      footerLinks.replaceChildren();
      categories.slice(0, 5).forEach((cat) => {
        const li = h("li");
        const a = h("a", undefined, cat.name);
        a.href = `#cat-${cat.id}`;
        li.appendChild(a);
        footerLinks.appendChild(li);
      });
    }

    const footerHelp = document.getElementById("footer-help");
    if (footerHelp && Array.isArray(shop.help)) {
      footerHelp.replaceChildren();
      shop.help.slice(0, 10).forEach((item) => {
        if (!item || typeof item !== "object") return;
        const li = h("li");
        const a = h("a", undefined, item.label || "");
        a.href = safeHref(item.href);
        li.appendChild(a);
        footerHelp.appendChild(li);
      });
    }

    const footerSchedule = document.getElementById("footer-schedule");
    if (footerSchedule && Array.isArray(shop.schedule)) {
      footerSchedule.replaceChildren();
      shop.schedule.slice(0, 7).forEach((item) => {
        if (!item || typeof item !== "object") return;
        const p = h("p", "footer__text");
        p.append(
          item.days || "",
          document.createElement("br"),
          item.time || "",
        );
        footerSchedule.appendChild(p);
      });
    }

    const footerCopy = document.getElementById("footer-copy");
    if (footerCopy && shop.copyright)
      footerCopy.textContent = String(shop.copyright).slice(0, 200);
  }
}

// نمایش خطا
function showErrorState(error: ApiError | null): void {
  const type: ErrorType = (error?.type as ErrorType) || "unknown";
  const msg = error?.userMessage || "ارتباط با سرور برقرار نشد.";
  const retry = (): Promise<void> => loadAndRender();

  const topbar = document.getElementById("topbar-text");
  if (topbar) {
    const map: Record<ErrorType, string> = {
      offline: "📡 اتصال اینترنت قطع است — برخی اطلاعات در دسترس نیست",
      timeout: "⏱️ سرور پاسخ نداد — دوباره تلاش کنید",
      network: "🌐 خطا در ارتباط با سرور",
      http: `🚫 خطای سرور ${error?.status ?? ""}`.trim(),
      parse: "🧩 پاسخ سرور نامعتبر بود",
      abort: "⏹️ درخواست لغو شد",
      unknown: "⚠️ اختلال موقت در سرویس",
    };
    topbar.textContent = map[type] || map.unknown;
  }

  renderError(document.getElementById("categories-grid"), {
    title: "دسته‌بندی‌ها در دسترس نیست",
    text: msg,
    onRetry: retry,
    errorType: type,
  });
  renderError(document.getElementById("special-track"), {
    title: "پیشنهاد ویژه در دسترس نیست",
    text: msg,
    onRetry: retry,
    errorType: type,
  });

  const banners = document.getElementById("banners-wrapper");
  if (banners) {
    renderError(banners, {
      title: "بنرها در دسترس نیست",
      text: "اطلاعات تبلیغاتی بارگذاری نشد.",
      onRetry: retry,
      errorType: type,
    });
  }

  renderError(document.getElementById("all-track"), {
    title: "خطا در دریافت محصولات",
    text: msg,
    onRetry: retry,
    errorType: type,
  });

  const catSections = document.getElementById("category-sections");
  if (catSections) catSections.replaceChildren();

  const footerHelp = document.getElementById("footer-help");
  if (footerHelp) {
    const li = h("li", undefined, "اطلاعات در دسترس نیست");
    li.style.color = "#94a3b8";
    li.style.fontSize = ".82rem";
    footerHelp.replaceChildren(li);
  }
}

// حالت خالی
function showEmptyState(): void {
  renderEmpty(document.getElementById("categories-grid"), {
    icon: "📂",
    title: "هنوز دسته‌بندی‌ای اضافه نشده",
    text: "به‌زودی دسته‌بندی‌های جدید اضافه می‌شود.",
  });
  renderEmpty(document.getElementById("special-track"), {
    icon: "🔥",
    title: "پیشنهاد ویژه‌ای موجود نیست",
    text: "به‌زودی پیشنهادهای ویژه اضافه می‌شود.",
  });
  renderEmpty(document.getElementById("all-track"), {
    icon: "📦",
    title: "محصولی برای نمایش نیست",
    text: "به‌زودی محصولات جدید اضافه می‌شود.",
  });
  const banners = document.getElementById("banners-wrapper");
  if (banners) banners.replaceChildren();
  const catSections = document.getElementById("category-sections");
  if (catSections) catSections.replaceChildren();
}

// بارگذاری
async function loadAndRender(): Promise<void> {
  if (isLoading) return;
  isLoading = true;
  lastLoadError = null;

  renderSkeletonCategories(document.getElementById("categories-grid"), 7);
  renderSkeletonProducts(document.getElementById("special-track"), 4);
  renderSkeletonProducts(document.getElementById("all-track"), 8);

  const retryOptions = {
    onRetry: ({
      attempt,
      waitMs,
    }: {
      attempt: number;
      waitMs: number;
    }): void => {
      showRetryToast({ attempt, total: 3, waitMs });
    },
  };

  let data: RenderData | null = null;

  try {
    const [products, categories, shop, home, offers, stock] = await Promise.all(
      [
        api.products<unknown>(retryOptions),
        api.categories<unknown>(retryOptions),
        api.shop<unknown>(retryOptions),
        api.home<unknown>(retryOptions),
        api.offers<unknown>(retryOptions),
        api.stock<unknown>(retryOptions),
      ],
    );

    const validProducts: Product[] = Array.isArray(products)
      ? products.filter(isValidProduct)
      : [];
    const validCategories: Category[] = Array.isArray(categories)
      ? categories.filter(isValidCategory)
      : [];
    const validOffers: Offer[] = Array.isArray(offers)
      ? offers.filter(
          (o): o is Offer =>
            o !== null &&
            typeof o === "object" &&
            Number.isInteger((o as Offer).productId) &&
            (o as Offer).productId > 0 &&
            Number.isFinite((o as Offer).percent) &&
            (o as Offer).percent > 0 &&
            (o as Offer).percent < 100,
        )
      : [];

    data = {
      products: validProducts,
      categories: validCategories,
      shop: shop && typeof shop === "object" ? (shop as Shop) : {},
      home: home && typeof home === "object" ? (home as Home) : {},
      offers: validOffers,
      stock:
        stock && typeof stock === "object"
          ? (stock as StockData)
          : { items: {} },
    };
  } catch (err: unknown) {
    console.error("خطا در لود داده‌ها:", err);
    lastLoadError = err instanceof ApiError ? err : new ApiError("خطای نامشخص");
  }

  isLoading = false;

  if (!data) {
    showErrorState(lastLoadError);
    initCart();
    return;
  }
  if (!data.products.length && !data.categories.length) {
    showEmptyState();
    initCart();
    return;
  }
  renderAll(data);
  initCart();
}

// چک آنلاین/آفلاین
watchConnectivity({
  onOffline: (): void => {
    showOfflineBanner();
  },
  onOnline: (): void => {
    hideOfflineBanner();
    if (lastLoadError || allProductsData.length === 0) {
      void loadAndRender();
    }
  },
});

if (!navigator.onLine) showOfflineBanner();

// ========== جستجو ==========

const searchInput = document.getElementById(
  "site-search",
) as HTMLInputElement | null;
const searchForm = document.getElementById(
  "search-form",
) as HTMLFormElement | null;
const searchSuggestions = document.getElementById("search-suggestions");
const searchClear = document.getElementById("search-clear");

let searchQuery = "";
let activeSuggestionIndex = -1;

// debounce
function debounce<T extends (...args: never[]) => void>(
  fn: T,
  delay: number,
): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: never[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// نتایج جستجو با Fuse
function getSearchResults(query: string, limit = 8): Product[] {
  const q = query.trim();
  if (!q) return [];

  if (!fuseInstance) {
    return allProductsData
      .filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
      .slice(0, limit);
  }

  return fuseInstance
    .search(q)
    .slice(0, limit)
    .map((result) => result.item);
}

// آیتم پیشنهاد
function createSuggestionItem(product: Product): HTMLButtonElement {
  const item = h("button", "search-suggestion");
  item.type = "button";
  item.setAttribute("role", "option");
  item.dataset.id = String(product.id);

  const emoji = h("span", "search-suggestion__emoji", product.emoji || "📦");
  emoji.setAttribute("aria-hidden", "true");

  const info = h("div", "search-suggestion__info");
  info.append(
    h("span", "search-suggestion__name", product.name),
    h("span", "search-suggestion__unit", product.unit || ""),
  );

  const price = h(
    "span",
    "search-suggestion__price",
    formatPrice(product.price),
  );

  item.append(emoji, info, price);

  item.addEventListener("click", () => {
    openProductDetail(product);
    if (searchInput) searchInput.value = "";
    closeSuggestions();
  });

  return item;
}

// بستن
function closeSuggestions(): void {
  if (!searchSuggestions) return;
  searchSuggestions.classList.remove("search__suggestions--visible");
  searchSuggestions.replaceChildren();
  activeSuggestionIndex = -1;
  searchInput?.setAttribute("aria-expanded", "false");
}

// نمایش پیشنهادها
function renderSearchSuggestions(query: string): void {
  if (!searchSuggestions) return;
  searchSuggestions.replaceChildren();
  activeSuggestionIndex = -1;

  if (!query.trim()) {
    closeSuggestions();
    return;
  }

  const results = getSearchResults(query);

  if (results.length === 0) {
    const empty = h("div", "search-suggestion--empty");
    empty.append(
      h("span", undefined, `نتیجه‌ای برای "${query}" پیدا نشد`),
      h("small", undefined, "عبارت دیگری را امتحان کنید"),
    );
    searchSuggestions.appendChild(empty);
    searchSuggestions.classList.add("search__suggestions--visible");
    searchInput?.setAttribute("aria-expanded", "true");
    return;
  }

  results.forEach((product) => {
    searchSuggestions.appendChild(createSuggestionItem(product));
  });

  searchSuggestions.classList.add("search__suggestions--visible");
  searchInput?.setAttribute("aria-expanded", "true");
}

// فیلتر
function applySearchFilter(query: string): void {
  searchQuery = query.trim();

  const allProductsTitle = document.getElementById("all-products-title");
  if (allProductsTitle) {
    const existingBadge = allProductsTitle.querySelector(
      ".search-active-badge",
    );
    if (existingBadge) existingBadge.remove();

    if (searchQuery) {
      const badge = document.createElement("span");
      badge.className = "search-active-badge";

      const text = document.createElement("span");
      text.textContent = `"${searchQuery}"`;

      const clearBtn = document.createElement("button");
      clearBtn.type = "button";
      clearBtn.setAttribute("aria-label", "پاک کردن جستجو");
      clearBtn.textContent = "✕";
      clearBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        applySearchFilter("");
        if (searchClear) searchClear.hidden = true;
        closeSuggestions();
      });

      badge.append(text, clearBtn);
      allProductsTitle.appendChild(badge);
    }
  }

  renderFilteredProducts();
}

// دکمه پاک کردن
function updateClearButton(): void {
  if (!searchClear || !searchInput) return;
  searchClear.hidden = searchInput.value.trim().length === 0;
}

// تایپ
if (searchInput) {
  const debouncedFilter = debounce(() => {
    if (!searchInput) return;
    applySearchFilter(searchInput.value);
  }, 350);

  searchInput.addEventListener("input", () => {
    if (!searchInput) return;
    renderSearchSuggestions(searchInput.value);
    updateClearButton();
    debouncedFilter();
  });

  searchInput.addEventListener("keydown", (e: KeyboardEvent) => {
    if (!searchSuggestions) return;
    const items =
      searchSuggestions.querySelectorAll<HTMLButtonElement>(
        ".search-suggestion",
      );

    if (e.key === "Escape") {
      closeSuggestions();
      searchInput.blur();
      return;
    }

    if (e.key === "ArrowDown" && items.length > 0) {
      e.preventDefault();
      activeSuggestionIndex = Math.min(
        activeSuggestionIndex + 1,
        items.length - 1,
      );
      items[activeSuggestionIndex]?.focus();
      return;
    }

    if (e.key === "ArrowUp" && items.length > 0) {
      e.preventDefault();
      activeSuggestionIndex = Math.max(activeSuggestionIndex - 1, 0);
      items[activeSuggestionIndex]?.focus();
      return;
    }
  });

  searchInput.addEventListener("focus", () => {
    if (!searchInput) return;
    if (searchInput.value.trim()) {
      renderSearchSuggestions(searchInput.value);
    }
  });

  document.addEventListener("click", (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    if (!e.target.closest(".search")) {
      closeSuggestions();
    }
  });
}

if (searchClear) {
  searchClear.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    searchClear.hidden = true;
    applySearchFilter("");
    closeSuggestions();
    searchInput?.focus();
  });
}

if (searchForm) {
  searchForm.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    if (!searchInput) return;
    const query = searchInput.value.trim();
    if (!query) return;
    applySearchFilter(query);
    closeSuggestions();
    document.getElementById("all-products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// ========== Auto Animate ==========

function setupAutoAnimate(): void {
  const containers = ["cart-body", "all-track", "search-suggestions"];
  containers.forEach((id) => {
    const el = document.getElementById(id);
    if (el) autoAnimate(el);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupAutoAnimate);
} else {
  setupAutoAnimate();
}

// شروع
void loadAndRender();
