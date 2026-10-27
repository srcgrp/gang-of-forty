import type { CartItem, ShopData } from "./types";
import { loadShopData } from "./api/shop-data";
import { loadCartCount, saveCartCount } from "./storage/cart";
import { loadTheme, saveTheme } from "./storage/theme";
import { addToCart } from "./cart/count";
import { buildPage } from "./catalog/sections";
import { offersById, toCards } from "./catalog/cards";
import { formatNumber } from "./catalog/format";
import { createSearch, normalizeSearch } from "./catalog/search";
import { sortProducts, readSortOption } from "./catalog/sorting";
import { showShop } from "./ui/shop";
import { showFooter } from "./ui/footer";
import { showCategories } from "./ui/categories";
import { showBanners } from "./ui/banners";
import { showSections } from "./ui/sections";
import { updateCart, showCartMessage } from "./ui/cart";
import { applyTheme, bindTheme } from "./ui/theme";
import { bindSearch } from "./ui/search-events";
import { showSearch, setSearchReady } from "./ui/search";
import { renderLoadStatus } from "./ui/load-status";
import { goToFragment, bindMobileMenu } from "./ui/navigation";
let count = loadCartCount();
let dark = loadTheme();
let data: ShopData | undefined;
let searchProducts = createSearch([]);
function onAdd(item: CartItem): void {
  count = addToCart(count, item);
  updateCart(formatNumber(count));
  showCartMessage(item.name, saveCartCount(count));
}
function onSearch(query: string, sort: string): void {
  if (!data) return;
  const products = sortProducts(searchProducts(query), readSortOption(sort));
  const cards = toCards(products, data.stock, offersById(data.offers));
  const active = normalizeSearch(query) !== "";
  const message = products.length ? formatNumber(products.length) + " محصول پیدا شد." :
    "محصولی پیدا نشد. عبارت دیگری بنویسید.";
  showSearch(active, cards, active ? message : "", onAdd);
}
async function start(): Promise<void> {
  renderLoadStatus({ status: "loading" });
  setSearchReady(false, "دنبال چی می‌گردی؟");
  try {
    data = await loadShopData();
    showShop(data.shop);
    showFooter(data.shop);
    showCategories(data.categories);
    showBanners(data.home);
    showSections(buildPage(data), onAdd);
    searchProducts = createSearch(data.products);
    setSearchReady(true, "جست‌وجو در میان " + formatNumber(data.products.length) + " کالا…");
    bindSearch(onSearch);
    renderLoadStatus(data.products.length ?
      { status: "success", products: data.products } : { status: "empty" });
    goToFragment();
  } catch (error: unknown) {
    console.error("خطا در دریافت اطلاعات فروشگاه:", error);
    renderLoadStatus({ status: "error",
      message: "دریافت اطلاعات ممکن نشد. اتصال اینترنت را بررسی و صفحه را تازه‌سازی کنید." });
  }
}
applyTheme(dark);
updateCart(formatNumber(count));
bindMobileMenu();
bindTheme(() => {
  dark = !dark;
  applyTheme(dark);
  saveTheme(dark);
});
start();
