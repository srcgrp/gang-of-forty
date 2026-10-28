import "notyf/notyf.min.css";
import { loadStoreData } from "./features/products/api/store-data";
import { prepareHomeCarousels } from "./features/products/logic/carousel-view";
import { createCarouselFilter } from "./features/products/logic/filter";
import { createProductSearch } from "./features/products/logic/search";
import { categoryImages, productImages } from "./features/products/data";
import { createHeroSlides } from "./shared/ui/hero/slides";
import {
  readFilterUrl,
  writeFilterUrl,
  listenToFilterHistory,
} from "./features/products/storage/filter-url";
import type { FilterState } from "./shared/types/filters";
import type { SearchHandler } from "./shared/types/search";
import { setupCategoryFilter } from "./features/products/ui/filters/categories";
import { createFilterView } from "./features/products/ui/filters/view";
import { startHeroSlider } from "./shared/ui/hero";
import {
  renderLoadState,
  finishLoading,
} from "./features/products/ui/load-state";
import { setupProductsSearch, restoreSearchQuery } from "./features/products/ui/search/events";
import { renderShopPage } from "./features/products/ui/shop/page";
import { setupStaticUi } from "./features/products/ui/setup";
import { setupCart } from "./features/cart/setup";

let searchProducts: SearchHandler = () => null;
let applyFilters: (filters: FilterState) => void = () => {};
function changeFilters(filters: FilterState, mode: "push" | "replace"): void {
  writeFilterUrl(filters, mode);
  applyFilters(filters);
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
