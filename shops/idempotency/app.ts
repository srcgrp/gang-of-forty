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
} from "./src/types";
import { fetchJSON } from "./src/api";
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
      fetchJSON<Product[]>("/api/products.json"),
      fetchJSON<Offer[]>("/api/offers.json"),
      fetchJSON<Stock>("/api/stock.json"),
      fetchJSON<Shop>("/api/shop.json"),
      fetchJSON<Category[]>("/api/categories.json"),
      fetchJSON<Home>("/api/home.json"),
    ]);
  } catch (error) {
    console.error("Failed to load API data:", error);

    showError(
      document.querySelector("#category-grid"),
      "دریافت اطلاعات فروشگاه با مشکل مواجه شد."
    );

    showError(
      document.querySelector("#home-featured-carousels"),
      "دریافت پیشنهادها با مشکل مواجه شد."
    );

    showError(
      document.querySelector("#home-category-carousels"),
      "دریافت محصولات با مشکل مواجه شد."
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

  initializeProductSearch(products);

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

  renderHomeCarousels(
    home.carousels,
    products,
    offersMap,
    stock
  );
}
setupCart();
setupTheme();
setupSearchForm();
setupProductsSearch();
setupOffersConfetti();
showProductSkeletons();
loadAllData();

