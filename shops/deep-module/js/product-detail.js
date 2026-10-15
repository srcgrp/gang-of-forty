
// ═══════════════════════════════════════════════════
// product-detail.js — مودال جزئیات محصول
// ═══════════════════════════════════════════════════
import { escapeHTML, formatPrice } from "./utils.js";
import { addToCart, openModal } from "./cart.js";

export function openProductDetail(product) {
  const modal = document.getElementById("product-modal");
  if (!modal) return;

  const body = modal.querySelector(".modal__body");
  body.innerHTML = `
    <div class="product-detail">
      <div class="product-detail__media">
        <span class="product-detail__emoji">${escapeHTML(product.emoji) || "📦"}</span>
      </div>
      <div class="product-detail__info">
        <h2 class="product-detail__title">${escapeHTML(product.name)}</h2>
        <p class="product-detail__unit">${escapeHTML(product.unit)}</p>
        <p class="product-detail__desc">
          محصول تازه و با کیفیت از فروشگاه سبزکاله.
          ارسال سریع به سراسر شهر.
        </p>
        <div class="product-detail__price">
          <span class="product-detail__price-value">${formatPrice(product.price)}</span>
        </div>
        <button
          type="button"
          class="btn btn--primary product-detail__add"
          data-id="${product.id}"
        >
          <span aria-hidden="true">🛒</span>
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  `;

  const addBtn = body.querySelector(".product-detail__add");
  addBtn?.addEventListener("click", () => {
    addToCart(product);

    addBtn.innerHTML = "✓ اضافه شد";
    addBtn.classList.add("btn--success");

    setTimeout(() => {
      addBtn.innerHTML = `<span aria-hidden="true">🛒</span> افزودن به سبد خرید`;
      addBtn.classList.remove("btn--success");
    }, 1500);
  });

  openModal("product-modal");
}