import "notyf/notyf.min.css";
import {
  initializeProductSearch,
  setupProductsSearch,
  setupSearchForm,
} from "./src/search";
import type {
  Product,
  Offer,
  Stock,
  Category,
  Shop,
  Home,
  LoadState,
} from "./src/types";
import { getJSON } from "./src/api";
import { renderHomeCarousels } from "./src/carousels";
import { startHeroSlider } from "./src/hero";
import { renderSideBanner, renderPromoBanners } from "./src/banners";
import {
  renderCategories,
  renderCategoryDropdown,
  renderFooterCategories,
} from "./src/categories";
import {
  renderShopHelp,
  renderShopMenus,
  renderShopAbout,
  renderShopSchedule,
  renderShopContact,
  renderShopCopyright,
  renderShopNotice,
} from "./src/shop";

import { setupCart } from "./src/cart";
import { setupTheme } from "./src/theme";
import { setupOffersConfetti } from "./src/effects";
import { createProductSkeletons } from "./src/products";

import { isProduct, isOffer, isStock, isCategory ,isShop, isHome} from "./src/guards";

function showError(container: Element | null, messageText: string) {
  if (!container) {
    return;
  }
  const message = document.createElement("p");
  message.classList.add("error-message");
  message.setAttribute("role", "alert");
  message.textContent = messageText;
  container.replaceChildren(message);
  container.setAttribute("aria-busy", "false");
}
function showProductSkeletons() {
  const featuredContainer = document.querySelector(
    "#home-featured-carousels",
  );

  const categoryContainer = document.querySelector(
    "#home-category-carousels",
  );

  for (const container of [featuredContainer, categoryContainer]) {
    if (!container) {
      continue;
    }

    container.setAttribute("aria-busy", "true");
    container.replaceChildren(createProductSkeletons(4));
  }
}

function renderLoadState(state: LoadState): void {
  switch (state.status) {
    case "loading":
      showProductSkeletons();
      break;

    case "success":
      initializeProductSearch(state.products);
      break;

    case "empty":
      showError(
        document.querySelector("#home-category-carousels"),
        "محصولی برای نمایش وجود ندارد.",
      );
      break;

    case "error":
      showError(
        document.querySelector("#home-category-carousels"),
        state.message,
      );
      break;

    default: {
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
    }
  }
}

async function loadProducts(): Promise<Product[]> {
  const data = await getJSON("/api/products.json");

  if (!Array.isArray(data)) {
    throw new Error("Products data must be an array");
  }

  const products = data.filter(isProduct);
  const invalidCount = data.length - products.length;

  if (invalidCount > 0) {
    console.warn(`${invalidCount} invalid products were removed`);
  }

  return products;
}
async function loadOffers(): Promise<Offer[]> {
  const data = await getJSON("/api/offers.json");

  if (!Array.isArray(data)) {
    throw new Error("Offers data must be an array");
  }

  if (!data.every(isOffer)) {
    throw new Error("Offers data contains invalid items");
  }

  return data;
}
async function loadStock(): Promise<Stock> {
  const data = await getJSON("/api/stock.json");

  if (!isStock(data)) {
    throw new Error("Invalid stock data");
  }

  return data;
}
async function loadShop(): Promise<Shop> {
  const data = await getJSON("/api/shop.json");

  if (!isShop(data)) {
    throw new Error("Invalid shop data");
  }

  return data;
}
async function loadCategories(): Promise<Category[]> {
  const data = await getJSON("/api/categories.json");

  if (!Array.isArray(data)) {
    throw new Error("Categories data must be an array");
  }

  if (!data.every(isCategory)) {
    throw new Error("Categories data contains invalid items");
  }

  return data;
}
async function loadHome(): Promise<Home> {
  const data = await getJSON("/api/home.json");

  if (!isHome(data)) {
    throw new Error("Invalid home data");
  }

  return data;
}
async function loadAllData() {
  let data: [
    Product[],
    Offer[],
    Stock,
    Shop,
    Category[],
    Home
  ];

  try {
    data = await Promise.all([
      loadProducts(),
      loadOffers(),
      loadStock(),
      loadShop(),
      loadCategories(),
      loadHome()
    ]);
  } catch (error) {
  console.error("Failed to load API data:", error);

  renderLoadState({
    status: "error",
    message: "دریافت اطلاعات فروشگاه با مشکل مواجه شد.",
  });

  showError(
    document.querySelector("#category-grid"),
    "دریافت دسته‌بندی‌ها با مشکل مواجه شد.",
  );

  showError(
    document.querySelector("#home-featured-carousels"),
    "دریافت پیشنهادها با مشکل مواجه شد.",
  );

  return;
} finally {
    document.querySelectorAll("[aria-busy='true']").forEach((element) => {
      element.setAttribute("aria-busy", "false");
    });
  }

  const [products, offers, stock, shop, categories, home] = data;
  const offersMap = new Map(
    offers.map((offer) => [offer.productId, offer])
  );

  renderShopNotice(shop);
  renderShopMenus(shop);
  renderShopAbout(shop);
  renderShopSchedule(shop);
  renderShopContact(shop);
  renderShopCopyright(shop);
  renderShopHelp(shop);

  renderCategories(categories);
  renderCategoryDropdown(categories);
  renderFooterCategories(categories);

  startHeroSlider(home.hero);
  renderSideBanner(home.side);
  renderPromoBanners(home.promos);

if(products.length === 0){
  renderLoadState({
    status: "empty"
  });
   showError(
    document.querySelector("#home-featured-carousels"),
    "محصولی برای نمایش وجود ندارد.",
  );
}else{
    renderLoadState({
    status: "success" , products
  });
renderHomeCarousels(
  home.carousels,
  categories,
  products,
  offersMap,
  stock
);
}
}
setupCart();
setupTheme();
setupSearchForm();
setupProductsSearch();
setupOffersConfetti();
renderLoadState({
  status:"loading"
});
loadAllData();

