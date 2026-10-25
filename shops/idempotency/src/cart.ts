
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  duration: 2500,
  position: {
    x: "center",
    y: "top",
  },
  types: [
    {
      type: "success",
      background: "#07566b",
      icon: {
        className: "notyf__icon--success",
        tagName: "i",
        color: "#07566b",
      },
    },
  ],
});

const priceFormatter = new Intl.NumberFormat("fa-IR");

const cartCountElement = document.querySelector("#cart-count");

const savedCartCount = Number(localStorage.getItem("cartCount"));

let cartCount =
  Number.isFinite(savedCartCount) && savedCartCount >= 0
    ? savedCartCount
    : 0;

function updateCartCount() {
  if (!cartCountElement) {
    throw new Error("Cart count element is missing from the DOM.");
  }

  cartCountElement.textContent = priceFormatter.format(cartCount);
}

function showCartToast() {
  notyf.success("محصول به سبد خرید اضافه شد");
}

function addToCart() {
  cartCount += 1;
  localStorage.setItem("cartCount", String(cartCount));
  updateCartCount();
  showCartToast();
}

export function setupCart() {
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (target instanceof Element) {
      const button = target.closest<HTMLButtonElement>(
        ".product-card button"
      );

      if (button && !button.disabled) {
        addToCart();
      }
    }
  });

  updateCartCount();
}