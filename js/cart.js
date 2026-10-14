
import { formatPrice, safeInt, isValidProduct } from "./utils.js";

const CART_KEY = "supermarket_cart";
const MAX_ITEMS = 100;
const MAX_QUANTITY = 99;


console.log("🛒 [cart.js] loaded:", {
  cartBtn: !!document.getElementById("cart-btn"),
  cartModal: !!document.getElementById("cart-modal"),
  cartBody: !!document.getElementById("cart-body"),
  cartFooter: !!document.getElementById("cart-footer"),
});


function validateCartItem(item) {
  if (!item || typeof item !== "object") return null;

  const id = safeInt(item.id, 0);
  if (id <= 0) return null;

  const name = typeof item.name === "string" ? item.name.slice(0, 100) : "";
  if (!name) return null;

  const price = safeInt(item.price, 0);
  if (price < 0) return null;

  const quantity = safeInt(item.quantity, 1, MAX_QUANTITY);

  return {
    id,
    name,
    emoji: typeof item.emoji === "string" ? item.emoji.slice(0, 8) : "📦",
    unit: typeof item.unit === "string" ? item.unit.slice(0, 50) : "",
    price,
    quantity,
  };
}


export function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.slice(0, MAX_ITEMS).map(validateCartItem).filter(Boolean);
  } catch (err) {
    console.warn("سبد خرید آلوده بود، پاک شد");
    localStorage.removeItem(CART_KEY);
    return [];
  }
}


function saveCart(cart) {
  if (!Array.isArray(cart)) cart = [];

  const safeCart = cart
    .slice(0, MAX_ITEMS)
    .map(validateCartItem)
    .filter(Boolean);

  try {
    localStorage.setItem(CART_KEY, JSON.stringify(safeCart));
  } catch (err) {
    console.error("خطا در ذخیره سبد:", err);
  }

  updateCartUI();
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: safeCart }));
}


export function addToCart(product) {
  if (!isValidProduct(product)) {
    console.warn("محصول نامعتبر:", product);
    return getCart();
  }

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

export function removeFromCart(id) {
  const safeId = safeInt(id, 0);
  if (safeId <= 0) return;
  saveCart(getCart().filter((item) => item.id !== safeId));
}

export function decreaseQuantity(id) {
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

// ═══════════════════════════════════════════════════
// محاسبات
// ═══════════════════════════════════════════════════
export function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const price = safeInt(item.price, 0);
    const qty = safeInt(item.quantity, 0);
    return sum + price * qty;
  }, 0);
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + safeInt(item.quantity, 0), 0);
}

export function clearCart() {
  saveCart([]);
}

// ═══════════════════════════════════════════════════
// به‌روزرسانی UI
// ═══════════════════════════════════════════════════
function updateCartUI() {
  const count = getCartCount();
  const badge = document.getElementById("cart-count");

  if (badge) {
    badge.textContent = count.toLocaleString("fa-IR");
    badge.style.display = count > 0 ? "grid" : "none";
  }

  renderCartModal();
}

// ═══════════════════════════════════════════════════
// رندر مودال
// ═══════════════════════════════════════════════════
function renderCartModal() {
  const body = document.getElementById("cart-body");
  const footer = document.getElementById("cart-footer");
  if (!body || !footer) return;

  const cart = getCart();
  body.textContent = "";
  footer.textContent = "";

  // حالت خالی
  if (cart.length === 0) {
    const empty = document.createElement("div");
    empty.className = "cart-empty";

    const icon = document.createElement("span");
    icon.className = "cart-empty__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "🛒";

    const text = document.createElement("p");
    text.className = "cart-empty__text";
    text.textContent = "سبد خرید شما خالی است";

    const hint = document.createElement("p");
    hint.className = "cart-empty__hint";
    hint.textContent = "محصولی به سبد اضافه کنید";

    empty.append(icon, text, hint);
    body.appendChild(empty);
    return;
  }

  // آیتم‌ها
  cart.forEach((item) => {
    const el = document.createElement("div");
    el.className = "cart-item";
    el.dataset.id = String(item.id);

    const media = document.createElement("div");
    media.className = "cart-item__media";
    media.textContent = item.emoji;

    const info = document.createElement("div");
    info.className = "cart-item__info";

    const name = document.createElement("h4");
    name.className = "cart-item__name";
    name.textContent = item.name;

    const unit = document.createElement("p");
    unit.className = "cart-item__unit";
    unit.textContent = item.unit;

    info.append(name, unit);

    const controls = document.createElement("div");
    controls.className = "cart-item__controls";

    const minusBtn = document.createElement("button");
    minusBtn.className = "cart-item__btn";
    minusBtn.type = "button";
    minusBtn.dataset.action = "decrease";
    minusBtn.dataset.id = String(item.id);
    minusBtn.setAttribute("aria-label", "کم کردن");
    minusBtn.textContent = "−";

    const qty = document.createElement("span");
    qty.className = "cart-item__qty";
    qty.textContent = item.quantity.toLocaleString("fa-IR");

    const plusBtn = document.createElement("button");
    plusBtn.className = "cart-item__btn";
    plusBtn.type = "button";
    plusBtn.dataset.action = "increase";
    plusBtn.dataset.id = String(item.id);
    plusBtn.setAttribute("aria-label", "زیاد کردن");
    plusBtn.textContent = "+";

    controls.append(minusBtn, qty, plusBtn);

    const price = document.createElement("div");
    price.className = "cart-item__price";
    price.textContent = formatPrice(item.price * item.quantity);

    const removeBtn = document.createElement("button");
    removeBtn.className = "cart-item__remove";
    removeBtn.type = "button";
    removeBtn.dataset.action = "remove";
    removeBtn.dataset.id = String(item.id);
    removeBtn.setAttribute("aria-label", "حذف");
    removeBtn.textContent = "✕";

    el.append(media, info, controls, price, removeBtn);
    body.appendChild(el);
  });

  // Footer
  const total = getCartTotal();

  const totalBox = document.createElement("div");
  totalBox.className = "cart-total";

  const totalLabel = document.createElement("span");
  totalLabel.className = "cart-total__label";
  totalLabel.textContent = "جمع کل:";

  const totalValue = document.createElement("span");
  totalValue.className = "cart-total__value";
  totalValue.textContent = formatPrice(total);

  totalBox.append(totalLabel, totalValue);

  const checkoutBtn = document.createElement("button");
  checkoutBtn.type = "button";
  checkoutBtn.className = "btn btn--primary";
  checkoutBtn.textContent = "تسویه حساب";

  footer.append(totalBox, checkoutBtn);
}

// ═══════════════════════════════════════════════════
// Modal open/close
// ═══════════════════════════════════════════════════
export function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) {
    console.warn("🛒 modal not found:", id);
    return;
  }
  modal.classList.add("modal--open");
  document.body.style.overflow = "hidden";
  console.log("🛒 modal opened:", id);
}

export function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove("modal--open");
  if (!document.querySelector(".modal--open")) {
    document.body.style.overflow = "";
  }
  console.log("🛒 modal closed:", id);
}



// Global click handler
document.addEventListener("click", (e) => {
  // 1. Cart button
  const cartBtn = e.target.closest("#cart-btn");
  if (cartBtn) {
    e.preventDefault();
    e.stopPropagation();
    console.log("🛒 cart-btn clicked");
    openModal("cart-modal");
    return;
  }

  // 2. Close button / overlay via data-close
  const closeEl = e.target.closest("[data-close]");
  if (closeEl) {
    e.preventDefault();
    e.stopPropagation();
    console.log("🛒 [data-close] clicked:", closeEl.dataset.close);
    closeModal(closeEl.dataset.close);
    return;
  }

  // 3. Direct overlay click
  if (e.target.classList.contains("modal__overlay")) {
    const modal = e.target.closest(".modal");
    if (modal) {
      console.log("🛒 overlay clicked");
      closeModal(modal.id);
    }
    return;
  }

  // 4. Cart item actions
  const actionBtn = e.target.closest("[data-action]");
  if (actionBtn) {
    const action = actionBtn.dataset.action;
    const id = safeInt(actionBtn.dataset.id, 0);
    if (id <= 0) return;
    if (action === "increase") {
      const item = getCart().find((i) => i.id === id);
      if (item) addToCart(item);
    } else if (action === "decrease") {
      decreaseQuantity(id);
    } else if (action === "remove") {
      removeFromCart(id);
    }
  }
});

// ESC key
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll(".modal--open").forEach((m) => {
    console.log("🛒 ESC pressed");
    closeModal(m.id);
  });
});

// Initial render (safe - runs after DOM ready since module)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateCartUI);
} else {
  updateCartUI();
}

// ═══════════════════════════════════════════════════
// Stubs — این‌ها فقط برای سازگاری با main.js قدیمی
// ═══════════════════════════════════════════════════
export function initCart() {
  console.log("✅ initCart() — no-op (auto-bound)");
}

export function initModals() {
  console.log("✅ initModals() — no-op (auto-bound)");
}
