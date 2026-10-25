import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { loadShop } from "./api/load-shop.ts";
import { addToCart, removeFromCart } from "./cart/count.ts";
import { findOffer } from "./catalog/offer.ts";
import { loadCart, saveCart } from "./storage/cart-storage.ts";
import { renderProducts } from "./ui/carousels.ts";
import { renderCart } from "./ui/cart-view.ts";
import { bindControls } from "./ui/controls.ts";
import { render } from "./ui/page.ts";
import { toCard } from "./ui/product-item.ts";
import { visibleProducts } from "./ui/search.ts";
import { renderStatus } from "./ui/status.ts";

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

    let count = loadCart();

    renderProducts(home, categories, products, offers, function (product) {
      const qty = stock.items[product.id] ?? 0;
      const offer = findOffer(offers, product.id);
      return toCard(product, qty, offer, faNumber, function () {
        count = addToCart(count);
        saveCart(count);
        renderCart(count, faNumber);
        notyf.success(product.name + " به سبد اضافه شد");
      });
    });
    renderCart(count, faNumber);

    bindControls(
      products.length,
      faNumber,
      function () {
        count = removeFromCart();
        saveCart(count);
        renderCart(count, faNumber);
      },
      visibleProducts,
    );
    renderStatus({ status: "success", products });
  } catch (err: unknown) {
    renderStatus({
      status: "error",
      message: "بارگذاری نشد. لطفا صفحه را رفرش کنید.",
    });
  }
}

start();
