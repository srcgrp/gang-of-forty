
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
import type { Product } from "./shared/types/products";

import { setupCategoryFilter } from "./features/products/ui/filters/categories";
import { createFilterView } from "./features/products/ui/filters/view";
import { startHeroSlider } from "./shared/ui/hero";

import {
  renderLoadState,
  finishLoading,
} from "./features/products/ui/load-state";

import {
  setupProductsSearch,
  restoreSearchQuery,
} from "./features/products/ui/search/events";

import { renderShopPage } from "./features/products/ui/shop/page";
import { setupStaticUi } from "./features/products/ui/setup";

import { loadCart, saveCart } from "./features/cart/storage/items";
import { setupCartView } from "./features/cart/ui/setup";
import { setupCartPopover } from "./features/cart/ui/popover";

import type { Offer } from "./shared/types/products";
import { toCartRows } from "./features/cart/logic/view";
import { renderCartPopover } from "./features/cart/ui/render";

import {
  addCartItem,
  increaseCartItem,
  decreaseCartItem,
  removeCartItem,
  clearCart,
  getCartCount,
  getCartSubtotal,
  canIncreaseCartItem,
} from "./features/cart/logic/items";

import { setupCartActions } from "./features/cart/ui/actions";
import { updateCartCount } from "./features/cart/ui/count";
import { showCartStockLimitToast } from "./features/cart/ui/toast";
// Search and filter state
let searchProducts: SearchHandler = () => null;
let applyFilters: (filters: FilterState) => void = () => {};

// Cart state
let cart = loadCart();
let productsById = new Map<number, Product>();
let offersById = new Map<number, Offer>();
let stockItems: Readonly<Record<number, number>> = {};

function changeFilters(
  filters: FilterState,
  mode: "push" | "replace",
): void {
  writeFilterUrl(filters, mode);
  applyFilters(filters);
}

function refreshCartPopover(): void {
  const rows = toCartRows(
    cart,
    productsById,
    offersById,
    productImages,
    stockItems,
  );

  renderCartPopover(rows, getCartSubtotal(rows));
}

// Connect cart logic, storage, and UI
setupCartView(getCartCount(cart), (productId) => {
  const product = productsById.get(productId);

  if (!product) {
    return null;
  }
  const available =stockItems[productId] ?? 0;
  if(!canIncreaseCartItem(cart,productId,available)){
   showCartStockLimitToast();
   return null;
  }
  cart = addCartItem(cart, product);
  saveCart(cart);
  refreshCartPopover();
  return getCartCount(cart);
});

async function start(): Promise<void> {
  renderLoadState({ status: "loading" });

  try {
    const { products, offers, stock, shop, categories, home } =
      await loadStoreData();
      stockItems = stock.items;

    // Keep products available
    productsById = new Map(
      products.map((product) => [product.id, product]),
    );
    offersById = new Map(
  offers.map((offer) => [offer.productId, offer]),
);

refreshCartPopover();

    renderShopPage(shop, categories, home, categoryImages);
    startHeroSlider(createHeroSlides(home.hero));

    if (products.length === 0) {
      renderLoadState({ status: "empty" });
      return;
    }

    const offersMap = offersById;

    const views = prepareHomeCarousels(
      home.carousels,
      categories,
      products,
      offersMap,
      stock,
      productImages,
    );

    const filterCarousels = createCarouselFilter(
      products,
      categories,
    );

    searchProducts = createProductSearch(
      products,
      categories,
      () => readFilterUrl().category,
    );

    applyFilters = createFilterView((filters) =>
      filterCarousels(views, filters),
    );

    applyFilters(readFilterUrl());

    renderLoadState({ status: "success", products });
  } catch (error) {
    console.error("Failed to load API data:", error);

    renderLoadState({
      status: "error",
      message: "دریافت اطلاعات فروشگاه با مشکل مواجه شد.",
    });
  } finally {
    finishLoading();
  }
}

// Initialize UI
setupStaticUi();
setupCartPopover();
refreshCartPopover();


setupCartActions(
  (action, productId) => {
    if (action === "increase") {
      const available = stockItems[productId] ?? 0;
      if(!canIncreaseCartItem(cart,productId,available)){
        showCartStockLimitToast();
        return;
      }
      cart = increaseCartItem(cart, productId);
    } else if (action === "decrease") {
      cart = decreaseCartItem(cart, productId);
    } else {
      cart = removeCartItem(cart, productId);
    }

    saveCart(cart);
    updateCartCount(getCartCount(cart));
    refreshCartPopover();
  },
  () => {
    cart = clearCart();

    saveCart(cart);
    updateCartCount(getCartCount(cart));
    refreshCartPopover();
  },
);


setupProductsSearch(
  (query) => searchProducts(query),
  (query) =>
    changeFilters(
      { ...readFilterUrl(), query },
      "replace",
    ),
);

setupCategoryFilter((category) =>
  changeFilters(
    { ...readFilterUrl(), category },
    "push",
  ),
);

listenToFilterHistory((filters) => applyFilters(filters));

restoreSearchQuery(readFilterUrl().query);

void start();
