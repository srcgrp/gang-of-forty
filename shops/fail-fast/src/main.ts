import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import {
  Search,
  ShoppingCart,
  Check,
  X,
  AlertCircle,
} from "lucide-static";

import type { Product, Stock, OfferProduct } from "./types.js";
import { getJSON } from "./api/client.js";
import { filterValidProducts, filterValidOffers, isStock } from "./api/guards.js";
import { filterDairyProducts, buildOfferProducts } from "./catalog/catalog.js";

// API URLs
const API_PRODUCTS_URL = "../../api/products.json";
const API_OFFERS_URL = "../../api/offers.json";
const API_STOCK_URL = "../../api/stock.json";

const icons = {
  search: Search,
  cart: ShoppingCart,
  check: Check,
  x: X,
  alertCircle: AlertCircle,
};

let notyf: Notyf;

let cartCount = 0;

function updateCartCount(): void {
  const cartCountElement =
    document.querySelector<HTMLElement>("#cart-count");

  if (!cartCountElement) {
    console.error("Cart count element was not found.");
  } else {
    cartCountElement.textContent = String(cartCount);
  }
}

function initializeNotyf(): void {
  notyf = new Notyf({
    duration: 3000,
    position: {
      x: "left",
      y: "bottom",
    },
    types: [
      {
        type: "success",
        background: "#4CAF50",
        icon: icons.check,
      },
      {
        type: "error",
        background: "#F44336",
        icon: icons.x,
      },
      {
        type: "warning",
        background: "#FF9800",
        icon: icons.alertCircle,
      },
    ],
  });
}

// Lucide icons
function initializeIcons(): void {
  const searchIconEl = document.querySelector("#search-icon");
  const cartIconEl = document.querySelector("#cart-icon");

  if (searchIconEl) {
    searchIconEl.innerHTML = icons.search;
  }

  if (cartIconEl) {
    cartIconEl.innerHTML = icons.cart;
  }
}

// Load dairy products
async function loadDairyProducts(): Promise<void> {
  const container = document.querySelector<HTMLElement>("#dairy-products");

  if (!container) {
    console.error("Container #dairy-products not found");
    return;
  }

  const loadingMessage = document.createElement("p");
  loadingMessage.textContent = "در حال بارگذاری محصولات...";
  loadingMessage.setAttribute("role", "status");

  container.appendChild(loadingMessage);

  try {
    const data = await getJSON(API_PRODUCTS_URL);

    // Validate products with type guards
    const products = filterValidProducts(data);

    const dairyProducts = filterDairyProducts(products);

    loadingMessage.remove();

    const template = container.querySelector<HTMLElement>("#dairy-template");

    if (!template) {
      console.error("Template #dairy-template not found");
      return;
    }

    template.remove();

    dairyProducts.forEach((product: Product, index: number): void => {
      const card = template.cloneNode(true) as HTMLElement;

      card.removeAttribute("id");

      if (index === 0) {
        card.id = "dairy-first";
      }

      if (index === dairyProducts.length - 1) {
        card.id = "dairy-last";
      }

      const emojiElement = card.querySelector(".product-emoji") as HTMLElement;
      const headingElement = card.querySelector("h3") as HTMLElement;
      const unitElement = card.querySelector(".product-info p") as HTMLElement;
      const priceElement = card.querySelector(".product-price") as HTMLElement;
      const button = card.querySelector("button") as HTMLButtonElement;

      if (emojiElement) emojiElement.textContent = product.emoji;
      if (headingElement) headingElement.textContent = product.name;
      if (unitElement) unitElement.textContent = product.unit;

      if (priceElement) {
        priceElement.textContent = `${new Intl.NumberFormat("fa-IR").format(product.price)} تومان`;
      }

      if (button) {
        button.setAttribute("aria-label", `افزودن ${product.name} به سبد خرید`);

        button.addEventListener("click", (): void => {
          cartCount += 1;
          updateCartCount();

          notyf.success(`${product.name} به سبد خرید اضافه شد`);
        });
      }

      container.appendChild(card);
    });
  } catch (error) {
    console.error("خطا در دریافت محصولات لبنی:", error);

    const message = document.createElement("p");
    message.textContent =
      "دریافت محصولات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.";
    message.setAttribute("role", "alert");

    container.replaceChildren(message);

    notyf.error("دریافت محصولات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.");
  }
}

// daily offers
async function loadDailyOffers(): Promise<void> {
  const container = document.querySelector<HTMLElement>("#dailyOffers");

  if (!container) {
    console.error("Container #dailyOffers not found");
    return;
  }

  const loadingMessage = document.createElement("p");
  loadingMessage.textContent = "در حال بارگذاری پیشنهادهای روزانه...";
  loadingMessage.setAttribute("role", "status");

  container.appendChild(loadingMessage);

  try {
    const [productsData, offersData, stockData] = await Promise.all([
      getJSON(API_PRODUCTS_URL),
      getJSON(API_OFFERS_URL),
      getJSON(API_STOCK_URL),
    ]);

    // Validate with type guards
    const products = filterValidProducts(productsData);
    const offers = filterValidOffers(offersData);

    if (!isStock(stockData)) {
      throw new Error("Invalid stock data: missing or malformed items");
    }
    const stock: Stock = stockData;

    loadingMessage.remove();

    // Build offer products using catalog logic
    const offerProducts = buildOfferProducts(products, offers, stock);

    const template = container.querySelector<HTMLElement>("#offer-template");

    if (!template) {
      console.error("Template #offer-template not found");
      return;
    }

    template.remove();
    container.replaceChildren();

    offerProducts.forEach((product: OfferProduct, index: number): void => {
      const card = template.cloneNode(true) as HTMLElement;

      card.removeAttribute("id");

      if (index === 0) {
        card.id = "offer-first";
      }

      if (index === offerProducts.length - 1) {
        card.id = "offer-last";
      }

      const emojiElement = card.querySelector(".product-emoji") as HTMLElement;
      const headingElement = card.querySelector("h3") as HTMLElement;
      const unitElement = card.querySelector(".product-info p") as HTMLElement;
      const discountBadge = card.querySelector(".discount-badge") as HTMLElement;
      const unavailableBadge = card.querySelector(".unavailable-badge") as HTMLElement;
      const oldPrice = card.querySelector(".old-price") as HTMLElement;
      const newPrice = card.querySelector(".new-price") as HTMLElement;
      const button = card.querySelector("button") as HTMLButtonElement;

      if (emojiElement) emojiElement.textContent = product.emoji;
      if (headingElement) headingElement.textContent = product.name;
      if (unitElement) unitElement.textContent = product.unit;

      if (discountBadge) {
        discountBadge.textContent = `${product.percent}٪ تخفیف`;
        discountBadge.hidden = false;
      }

      if (oldPrice) {
        oldPrice.textContent = `${new Intl.NumberFormat("fa-IR").format(product.price)} تومان`;
      }

      if (newPrice) {
        newPrice.textContent = `${new Intl.NumberFormat("fa-IR").format(product.discountedPrice)} تومان`;
      }

      if (button) {
        button.setAttribute("aria-label", `افزودن ${product.name} به سبد خرید`);
      }

      if (product.quantity === 0) {
        card.classList.add("out-of-stock");

        if (unavailableBadge) {
          unavailableBadge.textContent = "ناموجود";
          unavailableBadge.hidden = false;
        }

        if (button) button.disabled = true;
      } else {
        if (unavailableBadge) unavailableBadge.hidden = true;
        if (button) {
          button.disabled = false;

          button.addEventListener("click", (): void => {
            cartCount += 1;
            updateCartCount();

            notyf.success(`${product.name} به سبد خرید اضافه شد`);
          });
        }
      }

      container.appendChild(card);
    });

    if (offerProducts.length === 0) {
      const message = document.createElement("p") as HTMLParagraphElement;
      message.textContent = "فعلاً پیشنهادی برای نمایش وجود ندارد.";
      container.appendChild(message);
    }
  } catch (error) {
    console.error("خطا در دریافت محصولات پیشنهادی:", error);
    const message = document.createElement("p");
    message.textContent =
      "دریافت محصولات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.";
    message.setAttribute("role", "alert");
    container.replaceChildren(message);
    notyf.error("دریافت محصولات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.");
  }
}

document.addEventListener("DOMContentLoaded", (): void => {
  initializeNotyf();
  initializeIcons();
  loadDairyProducts();
  loadDailyOffers();
});
