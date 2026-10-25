import confetti from "canvas-confetti";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { loadShop } from "./api/load-shop.ts";
import { addToCart, cartCount, removeFromCart } from "./features/cart/count.ts";
import { cartRows, cartTotal } from "./features/cart/rows.ts";
import { findOffer, offerProducts } from "./features/products/offer.ts";
import { cardPrices } from "./features/products/price.ts";
import { loadCart, saveCart } from "./storage/cart-storage.ts";
import { loadFilters, saveFilters } from "./storage/url-filters.ts";
import type { Product } from "./types/product.ts";
import { bootShop } from "./ui/boot.ts";
import { renderCart } from "./ui/cart-view.ts";
import { toCard } from "./ui/product-item.ts";
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
    let lines = loadCart();
    function showCart(): void {
      const rows = cartRows(lines, products);
      renderCart(rows, cartCount(lines), cartTotal(rows, offers), faNumber);
    }
    function item(product: Product): HTMLElement {
      const qty = stock.items[product.id] ?? 0;
      const offer = findOffer(offers, product.id);
      const prices = cardPrices(product, offer, qty, faNumber);
      function onAdd(): void {
        lines = addToCart(lines, product.id);
        saveCart(lines);
        showCart();
        notyf.success(product.name + " به سبد اضافه شد");
        confetti({ particleCount: 60, spread: 70 });
      }
      return toCard(product, qty, offer, faNumber, prices, onAdd);
    }
    bootShop(
      shop,
      categories,
      home,
      products,
      offerProducts(products, offers),
      item,
      showCart,
      function () {
        lines = removeFromCart();
        saveCart(lines);
        showCart();
      },
      faNumber,
      loadFilters(),
      saveFilters,
    );
  } catch {
    renderError();
  }
}

start();
