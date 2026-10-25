import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { loadShop } from "./api/load-shop.ts";
import { addToCart, cartCount, removeFromCart } from "./cart/count.ts";
import { cartRows, cartTotal } from "./cart/rows.ts";
import { findOffer, offerProducts } from "./catalog/offer.ts";
import { cardPrices } from "./catalog/price.ts";
import { loadCart, saveCart } from "./storage/cart-storage.ts";
import type { Product } from "./types/product.ts";
import { renderProducts } from "./ui/carousels.ts";
import { renderCart } from "./ui/cart-view.ts";
import { bindControls } from "./ui/controls.ts";
import { render } from "./ui/page.ts";
import { toCard } from "./ui/product-item.ts";
import { visibleProducts } from "./ui/search.ts";
import { renderError, renderStatus } from "./ui/status.ts";

const notyf = new Notyf();
const API = import.meta.env.VITE_API_URL ?? "";

async function start(): Promise<void> {
  renderStatus({ status: "loading" });
  try {
    const { products, stock, offers, categories, shop, home } =
      await loadShop(API);
    if (products.length === 0) {
      renderStatus({ status: "empty" });
      return;
    }
    const faNumber = new Intl.NumberFormat("fa-IR");
    render(shop, categories, home);
    let lines = loadCart();
    function showCart(): void {
      const rows = cartRows(lines, products);
      renderCart(rows, cartCount(lines), cartTotal(rows, offers), faNumber);
    }
    function emptyCart(): void {
      lines = removeFromCart();
      saveCart(lines);
      showCart();
    }
    function item(product: Product): HTMLElement {
      const qty = stock.items[product.id] ?? 0;
      const offer = findOffer(offers, product.id);
      const prices = cardPrices(product, offer, qty, faNumber);
      return toCard(product, qty, offer, faNumber, prices, function () {
        lines = addToCart(lines, product.id);
        saveCart(lines);
        showCart();
        notyf.success(product.name + " به سبد اضافه شد");
      });
    }
    renderProducts(home, categories, products, offerProducts(products, offers), item);
    showCart();
    bindControls(products.length, faNumber, emptyCart, visibleProducts);
    renderStatus({ status: "success", products });
  } catch {
    renderError();
  }
}

start();
