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
async function loadAllData() {
  try {
    const [products, offers, stock, shop, categories, home] = await Promise.all(
      [
        fetchJSON<Product[]>("/api/products.json"),
        fetchJSON<Offer[]>("/api/offers.json"),
        fetchJSON<Stock>("/api/stock.json"),
        fetchJSON<Shop>("/api/shop.json"),
        fetchJSON<Category[]>("/api/categories.json"),
        fetchJSON<Home>("/api/home.json"),
      ],
    );
    const offersMap = new Map(offers.map((offer) => [offer.productId, offer]));
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
    renderHomeCarousels(home.carousels, products, offersMap, stock, categories);
  } catch (error) {
    console.error("Failed to load API data:", error);
    showError(
      document.querySelector("#category-grid"),
      "دریافت اطلاعات فروشگاه با مشکل مواجه شد.",
    );
    showError(
      document.querySelector("#home-featured-carousels"),
      "دریافت پیشنهادها با مشکل مواجه شد.",
    );
    showError(
      document.querySelector("#home-category-carousels"),
      "دریافت محصولات با مشکل مواجه شد.",
    );
  } finally {
    document.querySelectorAll("[aria-busy='true']").forEach((element) => {
      element.setAttribute("aria-busy", "false");
    });
  }
}
setupCart();
setupTheme();
setupSearchForm();
setupProductsSearch();
setupOffersConfetti();
loadAllData();

