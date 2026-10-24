import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { loadShop } from "./api/load-shop.ts";
import { addToCart, clearCart } from "./cart/count.ts";
import { findOffer } from "./catalog/offer.ts";
import { loadCart, saveCart } from "./storage/cart-storage.ts";
import { fillCarousels } from "./ui/carousels.ts";
import { updateCart } from "./ui/cart-view.ts";
import { bindControls } from "./ui/controls.ts";
import { fillPage } from "./ui/page.ts";
import { makeProductItem } from "./ui/product-item.ts";
import { filterProducts } from "./ui/search.ts";
import { renderStatus } from "./ui/status.ts";

const notyf = new Notyf();
const API = import.meta.env.VITE_API_URL ?? "";

async function loadPage(): Promise<void> {
  renderStatus({ status: "loading" });

  try {
    const { products, stock, offers, categories, shop, home } =
      await loadShop(API);
    if (products.length === 0) {
      renderStatus({ status: "empty" });
      return;
    }
    const faNumber = new Intl.NumberFormat("fa-IR");

    fillPage(shop, categories, home);

    let count = loadCart();

    fillCarousels(home, categories, products, offers, function (product) {
      const qty = stock.items[product.id] ?? 0;
      const offer = findOffer(offers, product.id);
      return makeProductItem(product, qty, offer, faNumber, function () {
        count = addToCart(count);
        saveCart(count);
        updateCart(count, faNumber);
        notyf.success(product.name + " به سبد اضافه شد");
      });
    });
    updateCart(count, faNumber);

    bindControls(
      products.length,
      faNumber,
      function () {
        count = clearCart();
        saveCart(count);
        updateCart(count, faNumber);
      },
      filterProducts,
    );
    renderStatus({ status: "success", products });
  } catch (err: unknown) {
    renderStatus({
      status: "error",
      message: "بارگذاری نشد. لطفا صفحه را رفرش کنید.",
    });
  }
}

loadPage();
