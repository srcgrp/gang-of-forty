import type { CartItem, SearchState } from "./shared/types";
import { loadCatalog } from "./features/products/api/catalog-data";
import { getShop, getHome } from "./shared/api/site";
import { showSite } from "./shared/ui/site";
import { loadCartCount, saveCartCount } from "./features/cart/storage/cart";
import { loadTheme, saveTheme } from "./shared/storage/theme";
import { readSearchUrl, writeSearchUrl, watchSearchUrl, readFragment } from "./shared/storage/url";
import { addToCart } from "./features/cart/logic/count";
import { buildPage } from "./features/products/catalog/sections";
import { formatNumber } from "./shared/format";
import { cleanSearch, createResults } from "./features/products/catalog/results";
import { showPage } from "./features/products/ui/page";
import { updateCart, showCartMessage } from "./features/cart/ui/cart";
import { applyTheme, bindTheme } from "./shared/ui/theme";
import { bindSearch } from "./features/products/ui/search-events";
import { setSearchControls } from "./features/products/ui/search-controls";
import { showSearch, setSearchReady } from "./features/products/ui/search";
import { renderLoadStatus } from "./shared/ui/load-status";
import { goToFragment, bindMobileMenu } from "./shared/ui/navigation";
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
    const [catalog, shop, home] = await Promise.all([loadCatalog(), getShop(), getHome()]);
    const data = { ...catalog, shop, home };
    const getResults = createResults(data);
    let state = cleanSearch(readSearchUrl(), data);
    function renderSearch(): void {
      const result = getResults(state);
      setSearchControls(state);
      showSearch(result.active, result.cards, result.message, onAdd);
    }
    showSite(shop, home);
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
    renderLoadStatus(data.products.length ? { status: "success", products: data.products } : { status: "empty" });
    goToFragment(readFragment());
  } catch (error: unknown) {
    console.error("خطا در دریافت اطلاعات فروشگاه:", error);
    renderLoadStatus({ status: "error", message: "دریافت اطلاعات ممکن نشد. اتصال اینترنت را بررسی و صفحه را تازه‌سازی کنید." });
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
