import type { CartItem, SearchState } from "./types";
import { loadShopData } from "./api/shop-data";
import { loadCartCount, saveCartCount } from "./storage/cart";
import { loadTheme, saveTheme } from "./storage/theme";
import { readSearchUrl, writeSearchUrl, watchSearchUrl, readFragment } from "./storage/url";
import { addToCart } from "./cart/count";
import { buildPage } from "./catalog/sections";
import { formatNumber } from "./catalog/format";
import { cleanSearch, createResults } from "./catalog/results";
import { showPage } from "./ui/page";
import { updateCart, showCartMessage } from "./ui/cart";
import { applyTheme, bindTheme } from "./ui/theme";
import { bindSearch } from "./ui/search-events";
import { setSearchControls } from "./ui/search-controls";
import { showSearch, setSearchReady } from "./ui/search";
import { renderLoadStatus } from "./ui/load-status";
import { goToFragment, bindMobileMenu } from "./ui/navigation";
let count = loadCartCount();
let dark = loadTheme();
function onAdd(item: CartItem): void {
  count = addToCart(count, item);
  updateCart(formatNumber(count));
  showCartMessage(item.name, saveCartCount(count));
}
async function start(): Promise<void> {
  renderLoadStatus({ status: "loading" });
  setSearchReady(false, "دنبال چی می‌گردی؟");
  try {
    const data = await loadShopData();
    const getResults = createResults(data);
    let state = cleanSearch(readSearchUrl(), data);
    function renderSearch(): void {
      const result = getResults(state);
      setSearchControls(state);
      showSearch(result.active, result.cards, result.message, onAdd);
    }
    showPage(data, buildPage(data), onAdd);
    setSearchReady(true, "جست‌وجو در میان " + formatNumber(data.products.length) + " کالا…");
    bindSearch(data.categories, (next: SearchState, fragment = "") => {
      state = cleanSearch(next, data);
      writeSearchUrl(state, fragment);
      renderSearch();
      goToFragment(fragment);
    });
    watchSearchUrl(() => {
      state = cleanSearch(readSearchUrl(), data);
      renderSearch();
      goToFragment(readFragment());
    });
    renderSearch();
    renderLoadStatus(data.products.length ?
      { status: "success", products: data.products } : { status: "empty" });
    goToFragment(readFragment());
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
