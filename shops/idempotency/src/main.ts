import "notyf/notyf.min.css";
import { loadStoreData } from "./api/store-data";
import { prepareHomeCarousels } from "./catalog/carousel-view";
import { createProductSearch } from "./catalog/search";
import { incrementCartCount } from "./cart/count";
import { categoryImages, productImages } from "./data";
import { createHeroSlides } from "./hero/slides";
import { loadCartCount, saveCartCount } from "./storage/cart";
import type { SearchHandler } from "./types/search";
import { setupAddToCartClick } from "./ui/cart/events";
import { updateCartCount } from "./ui/cart/count";
import { showCartToast } from "./ui/cart/toast";
import { renderHomeCarousels } from "./ui/carousels";
import { setupOffersConfetti } from "./ui/effects";
import { startHeroSlider } from "./ui/hero";
import { renderLoadState } from "./ui/load-state";
import { setupProductsSearch, setupSearchForm } from "./ui/search/events";
import { renderShopPage } from "./ui/shop/page";
import { setupTheme } from "./ui/theme";
let searchProducts: SearchHandler = () => null;
function setupCart(): void {
  let count = loadCartCount();
  setupAddToCartClick(() => {
    count = incrementCartCount(count);
    saveCartCount(count);
    updateCartCount(count);
    showCartToast();
  });
  updateCartCount(count);
}
async function start(): Promise<void> {
  renderLoadState({ status: "loading" });
  try {
    const { products, offers, stock, shop, categories, home } =
      await loadStoreData();

    renderShopPage(shop, categories, home, categoryImages);
    startHeroSlider(createHeroSlides(home.hero));

    if (products.length === 0) {
      renderLoadState({ status: "empty" });
      return;
    }
    const offersMap = new Map(
      offers.map((offer) => [offer.productId, offer]),
    );
    const views = prepareHomeCarousels(
      home.carousels, categories, products, offersMap, stock, productImages,
    );
    renderHomeCarousels(views.featured, views.category);
    searchProducts = createProductSearch(products);
    renderLoadState({ status: "success", products });
  } catch (error) {
    console.error("Failed to load API data:", error);
    renderLoadState({
      status: "error",
      message: "دریافت اطلاعات فروشگاه با مشکل مواجه شد.",
    });
  } finally {
    document.querySelectorAll("[aria-busy='true']").forEach((element) => {
      element.setAttribute("aria-busy", "false");
    });
  }
}
setupCart();
setupTheme();
setupSearchForm();
setupProductsSearch((query) => searchProducts(query));
setupOffersConfetti();
void start();