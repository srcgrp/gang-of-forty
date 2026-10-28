
import { Notyf } from "notyf";
import confetti from "canvas-confetti";

const notyf = new Notyf();
let cartCount = 0;

export function initCart(): void {
  const counter = document.querySelector<HTMLSpanElement>(".cart-count");
  if (!counter) throw new Error("Missing cart counter");

  const handleClick = (event: MouseEvent): void => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest<HTMLButtonElement>("button");
    if (!button || button.disabled) return;

    cartCount += 1;
    counter.textContent = cartCount.toLocaleString("fa-IR");
    notyf.success(`${button.dataset.title ?? "محصول"} به سبد خرید اضافه شد`);
    confetti({ particleCount: 60, spread: 70 });
  };

  document
    .querySelectorAll<HTMLDivElement>("#special-offers .carousel, #tents .carousel")
    .forEach((container) => container.addEventListener("click", handleClick));
}
