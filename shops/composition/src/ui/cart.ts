import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import confetti from "canvas-confetti";
const notyf = new Notyf();
export function updateCart(countText: string): void {
  const count = document.querySelector<HTMLElement>("#cart-count");
  const button = document.querySelector<HTMLButtonElement>(".cart-button");
  if (!count || !button) throw new Error("عناصر سبد خرید پیدا نشدند.");
  count.textContent = countText;
  button.setAttribute("aria-label", "سبد خرید، " + countText + " کالا");
}
export function showCartMessage(name: string, saved: boolean): void {
  const message = document.querySelector<HTMLElement>("#cart-message");
  if (!message) throw new Error("پیام سبد خرید پیدا نشد.");
  const safeName = name.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  notyf.success(safeName + " به سبد خرید اضافه شد");
  confetti({ particleCount: 60, spread: 70, disableForReducedMotion: true });
  message.textContent = saved ? name + " به سبد خرید اضافه شد." :
    "کالا اضافه شد، اما مرورگر اجازه ذخیره تعداد سبد را نمی‌دهد.";
}
