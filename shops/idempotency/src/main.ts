import "notyf/notyf.min.css";
import { loadStoreData } from "./api/store-data";
import { prepareHomeCarousels } from "./catalog/carousel-view";
import { createCarouselFilter } from "./catalog/filter";
import { createProductSearch } from "./catalog/search";
import { incrementCartCount } from "./cart/count";
import { categoryImages, productImages } from "./data";
import { createHeroSlides } from "./hero/slides";
import { loadCartCount, saveCartCount } from "./storage/cart";
import { readFilterUrl, writeFilterUrl, listenToFilterHistory } from "./storage/filter-url";
import type { FilterState } from "./types/filters";
import type { SearchHandler } from "./types/search";
import { setupCartView } from "./ui/cart/setup";
import { setupCategoryFilter } from "./ui/filters/categories";
import { createFilterView } from "./ui/filters/view";
import { startHeroSlider } from "./ui/hero";
import { renderLoadState, finishLoading } from "./ui/load-state";
import { setupProductsSearch, restoreSearchQuery } from "./ui/search/events";
import { renderShopPage } from "./ui/shop/page";
import { setupStaticUi } from "./ui/setup";
let searchProducts: SearchHandler = () => null;
let applyFilters: (filters: FilterState) => void = () => {};
function changeFilters(filters: FilterState, mode: "push" | "replace"): void {
  writeFilterUrl(filters, mode);
  applyFilters(filters);
}
function setupCart(): void {
  let count = loadCartCount();
  setupCartView(count, () => {
    count = incrementCartCount(count);
    saveCartCount(count);
    return count;
  });
}
async function start(): Promise<void> {
  renderLoadState({ status: "loading" });
  try {
    const { products, offers, stock, shop, categories, home } = await loadStoreData();
    renderShopPage(shop, categories, home, categoryImages);
    startHeroSlider(createHeroSlides(home.hero));
    if (products.length === 0) {
      renderLoadState({ status: "empty" }); return;
    }
    const offersMap = new Map(offers.map((offer) => [offer.productId, offer]));
    const views = prepareHomeCarousels(
      home.carousels, categories, products, offersMap, stock, productImages,
    );
    const filterCarousels = createCarouselFilter(products, categories);
    searchProducts = createProductSearch(products, categories, () => readFilterUrl().category);
    applyFilters = createFilterView((filters) => filterCarousels(views, filters));
    applyFilters(readFilterUrl());
    renderLoadState({ status: "success", products });
  } catch (error) {
    console.error("Failed to load API data:", error);
    renderLoadState({ status: "error", message: "دریافت اطلاعات فروشگاه با مشکل مواجه شد." });
  } finally {
    finishLoading();
  }
}
setupCart();
setupStaticUi();
setupProductsSearch((query) => searchProducts(query), (query) =>
  changeFilters({ ...readFilterUrl(), query }, "replace")
);
setupCategoryFilter((category) =>
  changeFilters({ ...readFilterUrl(), category }, "push")
);
listenToFilterHistory((filters) => applyFilters(filters));
restoreSearchQuery(readFilterUrl().query);
void start();
