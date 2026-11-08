import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import type {
  Cart,
  CatalogData,
  CartLine,
  LoadState,
  Product,
  ProductCardOptions,
  Stock,
} from "./types";
import { loadCatalog } from "../api/index-api";
import { addItem } from "./logic/cart/add-item";
import { cartCount, getCartLines } from "./logic/cart/cart-lines";
import { filterProducts } from "./logic/catalog/filter-products";
import { sortProducts } from "./logic/catalog/sort-products";
import { calculatePrice } from "./logic/catalog/calculate-price";
import { removeItem } from "./logic/cart/remove-item";
import { changeStock } from "./logic/stock/change-stock";
import { readCart, saveCart } from "./storage/cart-storage";
import { readStock, saveStock } from "./storage/stock-storage";
import { renderCart } from "./ui/cart/render-cart";
import { updateProductStockUI } from "./ui/catalog/render-products";
import { renderSections } from "./ui/catalog/render-sections";
import { renderCategories, renderHome } from "./ui/home/render-home";
import { renderShop } from "./ui/home/render-shop";
import { setupSearch } from "./ui/search/setup-search";
import { renderLoading, renderStatus } from "./ui/shared/render-status";
import { animateCartIcon, animateProductToCart } from "./ui/shared/animations";

const notify = new Notyf({
  duration: 5000,
  position: { x: "right", y: "bottom" },
  dismissible: true,
});
let cart: Cart = readCart(),
  products: CatalogData["products"] = [],
  stock: Stock = { updatedAt: "", items: {} };
function showCart(): void {
  const lines: CartLine[] = getCartLines(cart, products);
  renderCart(cartCount(cart), lines);
}
function commit(nextCart: Cart, nextStock: Stock): boolean {
  if (!saveCart(nextCart)) {
    notify.error("تغییرات سبد خرید ذخیره نشد.");
    return false;
  }
  if (!saveStock(nextStock)) {
    saveCart(cart);
    notify.error("موجودی ذخیره نشد؛ تغییرات اعمال نشد.");
    return false;
  }
  cart = nextCart;
  stock = nextStock;
  return true;
}
function handleCart(
  id: string,
  remove: boolean,
  button?: HTMLButtonElement,
): void {
  if (!id) {
    notify.error(
      "انجام این عملیات ممکن نشد. لطفاً صفحه را دوباره بارگذاری کنید.",
    );
    return;
  }
  const quantity = stock.items[id] ?? 0;
  if (!remove && quantity <= 0) {
    notify.error("موجودی این محصول تمام شده است");
    return;
  }
  const nextCart = remove ? removeItem(cart, id) : addItem(cart, id);
  const nextStock = changeStock(stock, id, remove ? 1 : -1, String(Date.now()));
  if (nextStock === stock || !commit(nextCart, nextStock)) return;
  showCart();
  updateProductStockUI(id, stock.items[id] ?? 0);
  if (!remove && button) animateProductToCart(button);
  else animateCartIcon();
  notify.success(
    remove ? "محصول از سبد خرید حذف شد" : "محصول به سبد خرید اضافه شد",
  );
}
function renderCatalog(data: CatalogData): void {
  products = data.products;
  stock = readStock(data.stock);
  showCart();
  renderShop(data.shop);
  renderCategories(data.categories);
  renderHome(data.home);
  const offers = new Map(data.offers.map((offer) => [offer.productId, offer]));
  const options = (product: Product): ProductCardOptions => ({
    offer: offers.get(product.id),
    stock,
    categoryName:
      data.categories.find((item) => item.id === product.categoryId)?.name ||
      "محصول",
    finalPrice: calculatePrice(product.price, offers.get(product.id)),
  });
  const sections = data.categories.map((category) => ({
    id: category.slug,
    title: category.name,
    products: products.filter((product) => product.categoryId === category.id),
    options,
  }));
  sections.unshift({
    id: "offers",
    title: "پیشنهاد ویژه",
    products: products.filter(
      (product) => offers.get(product.id)?.label === "پیشنهاد ویژه",
    ),
    options,
  });
  renderSections(sections, sortProducts);
  setupSearch(
    products.length,
    (query) =>
      filterProducts(
        products,
        query,
        new Map(data.categories.map((item) => [item.id, item.name])),
      ),
    options,
  );
  const carousels = document.querySelector<HTMLElement>("#home-carousels"),
    featured = document.querySelector<HTMLElement>("#offers"),
    promos = document.querySelector<HTMLElement>("#home-promos");
  if (featured && promos) featured.insertAdjacentElement("afterend", promos);
  else if (carousels && promos)
    carousels.insertAdjacentElement("afterend", promos);
  products.forEach((product) =>
    updateProductStockUI(
      String(product.id),
      stock.items[String(product.id)] ?? 0,
    ),
  );
}
async function loadPage(): Promise<void> {
  renderLoading();
  const state: LoadState = await loadCatalog();
  document.querySelectorAll(".api-status").forEach((item) => item.remove());
  if (state.status === "success") renderCatalog(state);
  else if (state.status === "loading") renderLoading();
  else
    renderStatus(
      state.status === "error"
        ? state.message
        : "در حال حاضر محصولی برای نمایش وجود ندارد.",
      () => {
        void loadPage();
      },
    );
}
document.addEventListener("click", (event: MouseEvent) => {
  if (!(event.target instanceof Element)) return;
  const remove = event.target.closest<HTMLButtonElement>(
    "[data-cart-remove-id]",
  );
  if (remove) {
    event.preventDefault();
    event.stopPropagation();
    handleCart(remove.dataset.cartRemoveId || "", true);
    return;
  }
  const cartButton = event.target.closest<HTMLButtonElement>("#cart-button");
  if (cartButton) {
    const open =
      cartButton
        .closest<HTMLElement>(".cart-dropdown-wrap")
        ?.classList.toggle("is-open") ?? false;
    cartButton.setAttribute("aria-expanded", String(open));
    return;
  }
  const buy = event.target.closest<HTMLButtonElement>(
    ".buy-button[data-product-id]",
  );
  if (buy && !buy.disabled) handleCart(buy.dataset.productId || "", false, buy);
  if (!event.target.closest(".cart-dropdown-wrap"))
    document.querySelector(".cart-dropdown-wrap")?.classList.remove("is-open");
});
showCart();
void loadPage();
