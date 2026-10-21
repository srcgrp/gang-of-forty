import type {
  Product, Category, Offer, Stock, Shop, Home,
  MenuLink, Schedule, Banner, Promo, Carousel
} from "./types";
import {
  getProducts, getStock, getOffers, getCategories, getShop, getHome
} from "./api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import confetti from "canvas-confetti";
import Fuse from "fuse.js";
import flatbreadIcon from "./icons/flatbread.svg";
import beansIcon from "./icons/beans.svg";
import sunIcon from "./icons/sun.svg";
import moonIcon from "./icons/moon.svg";

const notyf = new Notyf();
let cartCount: number = 0;

function createElement<Tag extends keyof HTMLElementTagNameMap>(
  tag: Tag,
  className: string,
  text: string,
): HTMLElementTagNameMap[Tag] {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

function createLink(text: string, href: string, className: string): HTMLAnchorElement {
  const link = createElement("a", className, text);
  link.href = href;
  return link;
}

function formatNumber(number: number): string {
  return new Intl.NumberFormat("fa-IR").format(number);
}

function formatPrice(price: number): string {
  return formatNumber(price) + " تومان";
}

function updateCart(): void {
  const count = document.querySelector<HTMLElement>("#cart-count");
  const button = document.querySelector<HTMLButtonElement>(".cart-button");

  if (!count || !button) {
    throw new Error("عناصر سبد خرید در صفحه پیدا نشدند");
  }

  count.textContent = formatNumber(cartCount);

  button.setAttribute(
    "aria-label",
    "سبد خرید، " + formatNumber(cartCount) + " کالا",
  );
}

function readCart(): void {
  try {
    const savedCount = Number(localStorage.getItem("batshop-cart-count"));
    if (Number.isSafeInteger(savedCount) && savedCount >= 0) {
      cartCount = savedCount;
    }
  } catch (error: unknown) {
    cartCount = 0;
  }
  updateCart();
}

function showShop(shop: Shop): void {
  const notice = document.querySelector<HTMLElement>("#notice");
  const slogan = document.querySelector<HTMLElement>("#slogan");

  if (!notice || !slogan) {
    throw new Error("عناصر پیام و شعار فروشگاه پیدا نشدند");
  }

  notice.textContent = shop.notice;
  slogan.textContent = shop.slogan;

  const mainLinks = document.querySelector<HTMLElement>("#main-links");
  const mobileLinks = document.querySelector<HTMLElement>("#mobile-links");

  if (!mainLinks || !mobileLinks) {
    throw new Error("منوی اصلی یا منوی موبایل پیدا نشد");
  }

  shop.menu.forEach(function (item: MenuLink): void {
    mainLinks.appendChild(createLink(item.label, item.href, ""));
    mobileLinks.appendChild(createLink(item.label, item.href, ""));
  });

  const info = document.querySelector<HTMLElement>("#shop-info");
  if (!info) {
    throw new Error("Missing element: #shop-info");
  }
  info.appendChild(createElement("h2", "", "بت‌شاپ"));
  info.appendChild(createElement("p", "", shop.about));
  info.appendChild(createElement("address", "", shop.address));
  const phone = createLink(shop.phone, "tel:" + shop.phone, "");
  phone.dir = "ltr";
  info.appendChild(phone);

  const hours = document.querySelector<HTMLElement>("#shop-hours");
  if (!hours) {
    throw new Error("Missing element: #shop-hours");
  }
  hours.appendChild(createElement("h2", "", "ساعت کاری"));
  shop.schedule.forEach(function (day: Schedule): void {
    hours.appendChild(createElement("p", "", day.days + ": " + day.time));
  });

  const bottom = document.querySelector<HTMLElement>("#footer-bottom");
  if (!bottom) {
    throw new Error("Missing element: #footer-bottom");
  }
  bottom.appendChild(
    createElement("p", "", shop.copyright.replace(shop.name, "بت‌شاپ")),
  );
  bottom.appendChild(createLink("بازگشت به بالا ↑", "#top", ""));
}

function showCategories(categories: Category[]): void {
  const categoryHeading = document.querySelector<HTMLElement>(
    "#categories-heading",
  );
  const footerCategories =
    document.querySelector<HTMLElement>("#footer-categories");
  const categoryTiles = document.querySelector<HTMLElement>("#category-tiles");
  const categoryLinks = document.querySelector<HTMLElement>("#category-links");
  if (
    !categoryHeading ||
    !footerCategories ||
    !categoryTiles ||
    !categoryLinks
  ) {
    throw new Error("Required page elements were not found");
  }

  categoryHeading.appendChild(createElement("h2", "", "از اینجا شروع کن"));
  footerCategories.appendChild(createElement("h2", "", "دسته‌بندی‌ها"));

  categories.forEach(function (category: Category): void {
    const href = "#" + category.slug;
    const tile = createLink("", href, "category-tile");
    const icon = createElement("span", "category-emoji", category.emoji);
    icon.style.backgroundColor = category.color;
    icon.setAttribute("aria-hidden", "true");
    tile.appendChild(icon);
    tile.appendChild(createElement("strong", "", category.name));
    categoryTiles.appendChild(tile);
    categoryLinks.appendChild(createLink(category.name, href, ""));
    footerCategories.appendChild(createLink(category.name, href, ""));
  });
}

function showBanner(banner: Banner, headingTag: "h1" | "h2"): void {
  const banners = document.querySelector<HTMLElement>("#banners");
  if (!banners) {
    throw new Error("Required page elements were not found");
  }

  const section = createElement("section", "hero", "");
  section.appendChild(createElement(headingTag, "", banner.title));
  section.appendChild(createElement("p", "", banner.text));
  const emoji = createElement("span", "banner-emoji", banner.emoji);
  emoji.setAttribute("aria-hidden", "true");
  section.appendChild(emoji);
  section.appendChild(
    createLink(banner.cta.label, banner.cta.href, "primary-link"),
  );
  banners.appendChild(section);
}

function showBanners(home: Home): void {
  const promos = document.querySelector<HTMLElement>("#promos");
  if (!promos) {
    throw new Error("Required page elements were not found");
  }

  showBanner(home.hero, "h1");
  showBanner(home.side, "h2");
  home.promos.forEach(function (promo: Promo): void {
    const link = createLink("", promo.href, "promo");
    link.style.backgroundColor = promo.color;
    const emoji = createElement("span", "promo-emoji", promo.emoji);
    emoji.setAttribute("aria-hidden", "true");
    link.appendChild(emoji);
    link.appendChild(createElement("span", "", promo.text));
    promos.appendChild(link);
  });
}

function createProductCard(product: Product, stock: Stock, offers: Map<number, Offer>): HTMLElement {
  const cartMessage =
    document.querySelector<HTMLParagraphElement>("#cart-message");
  if (!cartMessage) {
    throw new Error("Required page elements were not found");
  }

  const card = document.createElement("article");
  card.className = "product-card";

  const image = document.createElement("div");
  image.className = "product-image product-emoji";
  if (product.emoji === "🫓") {
    const breadImage = document.createElement("img");
    breadImage.src = flatbreadIcon;
    breadImage.alt = "";
    image.appendChild(breadImage);
  } else if (product.emoji === "🫘") {
    const beansImage = document.createElement("img");
    beansImage.src = beansIcon;
    beansImage.alt = "";
    image.appendChild(beansImage);
  } else {
    image.textContent = product.emoji;
  }
  image.setAttribute("aria-hidden", "true");
  card.appendChild(image);

  const name = document.createElement("h3");
  name.textContent = product.name;
  card.appendChild(name);

  const unit = document.createElement("p");
  unit.className = "unit";
  unit.textContent = product.unit;
  card.appendChild(unit);

  const offer = offers.get(product.id);

  let finalPrice = product.price;

  if (offer) {
    const badge = document.createElement("span");
    badge.className = "discount-badge";
    badge.textContent =
      offer.label +
      "؛ " +
      new Intl.NumberFormat("fa-IR").format(offer.percent) +
      "٪ تخفیف";
    card.appendChild(badge);

    finalPrice = Math.round((product.price * (100 - offer.percent)) / 100);
  }

  const price = document.createElement("div");
  price.className = "price";

  if (offer) {
    const oldPrice = document.createElement("del");
    oldPrice.textContent = formatPrice(product.price);
    price.appendChild(oldPrice);
  }

  const currentPrice = document.createElement("strong");
  currentPrice.textContent = formatPrice(finalPrice);
  price.appendChild(currentPrice);
  card.appendChild(price);

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "افزودن به سبد";
  button.setAttribute("aria-label", "افزودن " + product.name + " به سبد");

  if (stock.items[product.id] === 0) {
    card.classList.add("is-unavailable");

    const stockBadge = document.createElement("span");
    stockBadge.className = "stock-badge";
    stockBadge.textContent = "ناموجود";
    image.after(stockBadge);

    button.disabled = true;
    button.textContent = "ناموجود";
    button.setAttribute("aria-label", product.name + "؛ ناموجود");
  }

  button.addEventListener("click", function (_event: MouseEvent): void {
    cartCount = cartCount + 1;
    updateCart();
    const productName = product.name
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
    notyf.success(productName + " به سبد خرید اضافه شد");

    confetti({
      particleCount: 60,
      spread: 70,
      disableForReducedMotion: true,
    });
    try {
      localStorage.setItem("batshop-cart-count", String(cartCount));
      cartMessage.textContent = product.name + " به سبد خرید اضافه شد.";
    } catch (error: unknown) {
      cartMessage.textContent =
        "کالا اضافه شد، اما مرورگر اجازه ذخیره تعداد سبد را نمی‌دهد.";
    }
  });

  card.appendChild(button);
  return card;
}

function showCarousel(carousel: Carousel, products: Product[], stock: Stock, offers: Map<number, Offer>): void {
  const carousels = document.querySelector<HTMLElement>("#carousels");
  if (!carousels) {
    throw new Error("Required page elements were not found");
  }

  const section = createElement("section", "product-section", "");
  section.id = carousel.id;
  section.setAttribute("aria-labelledby", carousel.id + "-title");

  const heading = createElement("div", "section-heading", "");
  const title = createElement("h2", "", carousel.title);
  title.id = carousel.id + "-title";
  heading.appendChild(title);

  const controls = createElement("div", "carousel-controls", "");
  controls.setAttribute("role", "group");
  controls.setAttribute("aria-label", "کنترل " + carousel.title);
  heading.appendChild(controls);
  section.appendChild(heading);

  const status = createElement("p", "products-status", "");
  status.id = carousel.id + "-status";
  section.appendChild(status);

  const list = createElement("div", "products", "");
  list.id = carousel.id + "-products";
  list.tabIndex = 0;
  list.setAttribute("role", "group");
  list.setAttribute(
    "aria-label",
    carousel.title + "؛ برای پیمایش از کلیدهای جهت استفاده کنید",
  );

  let selectedProducts: Product[];
  if (carousel.source === "offers") {
    selectedProducts = products.filter(function (product: Product): boolean {
      return offers.has(product.id);
    });
  } else {
    selectedProducts = products.filter(function (product: Product): boolean {
      return product.categoryId === carousel.categoryId;
    });
  }

  selectedProducts.forEach(function (product: Product, index: number): void {
    const card = createProductCard(product, stock, offers);
    card.id = carousel.id + "-" + product.id;
    if (index === 0) {
      card.id = carousel.id + "-first";
    } else if (index === selectedProducts.length - 1) {
      card.id = carousel.id + "-last";
    }
    list.appendChild(card);
  });

  const firstCard = list.firstElementChild;
  const lastCard = list.lastElementChild;
  if (selectedProducts.length > 0 && firstCard && lastCard) {
    const first = createLink("ابتدا", "#" + firstCard.id, "");
    first.setAttribute("aria-label", "ابتدای " + carousel.title);
    const last = createLink("انتها", "#" + lastCard.id, "");
    last.setAttribute("aria-label", "انتهای " + carousel.title);
    controls.appendChild(first);
    controls.appendChild(last);
  } else {
    controls.hidden = true;
    status.textContent = "محصولی برای نمایش وجود ندارد.";
  }

  section.appendChild(list);
  carousels.appendChild(section);
}

function showCategoryProducts(category: Category, products: Product[], stock: Stock, offers: Map<number, Offer>): void {
  const categoryProducts =
    document.querySelector<HTMLElement>("#category-products");
  if (!categoryProducts) {
    throw new Error("Required page elements were not found");
  }

  const section = createElement("section", "product-section", "");
  section.id = category.slug;
  const title = createElement("h2", "", category.name);
  title.id = category.slug + "-title";
  section.setAttribute("aria-labelledby", title.id);
  section.appendChild(title);

  const list = createElement("div", "sample-products", "");
  const selectedProducts = products.filter(function (product: Product): boolean {
    return product.categoryId === category.id;
  });

  selectedProducts.forEach(function (product: Product): void {
    list.appendChild(createProductCard(product, stock, offers));
  });

  if (selectedProducts.length === 0) {
    list.appendChild(
      createElement("p", "products-status", "محصولی برای نمایش وجود ندارد."),
    );
  }

  section.appendChild(list);
  categoryProducts.appendChild(section);
}

function showCarousels(home: Home, categories: Category[], products: Product[], stock: Stock, offers: Map<number, Offer>): void {
  home.carousels.forEach(function (carousel: Carousel): void {
    showCarousel(carousel, products, stock, offers);
  });

  categories.forEach(function (category: Category): void {
    if (!document.getElementById(category.slug)) {
      if (category.slug === "fruits") {
        const carousel: Carousel = {
          id: category.slug,
          title: category.name,
          emoji: category.emoji,
          categoryId: category.id,
        };
        showCarousel(carousel, products, stock, offers);
      } else {
        showCategoryProducts(category, products, stock, offers);
      }
    }
  });
}

function goToFragment(): void {
  const id = window.location.hash.slice(1);
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ block: "start", inline: "nearest" });
  }
}

function normalizeSearch(text: string): string {
  return text.replaceAll("ي", "ی").replaceAll("ك", "ک")
    .replace(/‌/g, " ").replace(/[ًٌٍَُِّْ]/g, "").replace(/\s+/g, " ").trim();
}

function setupSearch(products: Product[], stock: Stock, offers: Map<number, Offer>): void {
  const input = document.querySelector<HTMLInputElement>("#product-search");
  const results = document.querySelector<HTMLElement>("#search-results");
  const list = document.querySelector<HTMLElement>("#search-products");
  const status = document.querySelector<HTMLElement>("#search-status");
  const content = document.querySelector<HTMLElement>("#shop-content");
  const clear = document.querySelector<HTMLButtonElement>("#clear-search");
  if (!input || !results || !list || !status || !content || !clear) {
    throw new Error("عناصر جست‌وجو پیدا نشدند");
  }

  const searchableProducts = products.map(function (product: Product) {
    return { product, name: normalizeSearch(product.name), tags: product.tags.map(normalizeSearch) };
  });
  const fuse = new Fuse(searchableProducts, {
    keys: [{ name: "name", weight: 2 }, "tags"],
    threshold: 0.3,
    ignoreLocation: true,
  });

  function search(): void {
    if (!input || !results || !list || !status || !content) return;
    const query = normalizeSearch(input.value);
    results.hidden = query === "";
    content.hidden = query !== "";
    list.replaceChildren();
    status.textContent = "";
    if (query === "") return;

    const matches = fuse.search(query);
    status.textContent = matches.length === 0
      ? "محصولی پیدا نشد. عبارت دیگری بنویسید."
      : formatNumber(matches.length) + " محصول پیدا شد.";
    matches.forEach(function (match): void {
      list.appendChild(createProductCard(match.item.product, stock, offers));
    });
  }

  input.disabled = false;
  input.addEventListener("input", search);
  clear.addEventListener("click", function (): void {
    input.value = "";
    search();
    input.focus();
  });
  document.addEventListener("click", function (event: MouseEvent): void {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a");
    if (link && link.hash && link.origin === location.origin && link.pathname === location.pathname) {
      input.value = "";
      search();
    }
  });
  search();
}

function setupTheme(): void {
  const button = document.querySelector<HTMLButtonElement>("#theme-toggle");
  if (!button) throw new Error("دکمه تغییر تم پیدا نشد");
  const icon = document.createElement("img");
  icon.alt = "";
  icon.width = 24;
  icon.height = 24;
  button.replaceChildren(icon);
  let dark = false;
  try {
    const savedTheme = localStorage.getItem("batshop-theme");
    if (savedTheme === "dark" || savedTheme === "light") dark = savedTheme === "dark";
  } catch (error: unknown) {
    dark = false;
  }

  function applyTheme(): void {
    if (!button) return;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    icon.src = dark ? sunIcon : moonIcon;
    button.setAttribute("aria-label", dark ? "فعال کردن تم روشن" : "فعال کردن تم تیره");
  }

  applyTheme();
  button.addEventListener("click", function (): void {
    dark = !dark;
    applyTheme();
    try {
      localStorage.setItem("batshop-theme", dark ? "dark" : "light");
    } catch (error: unknown) {
      return;
    }
  });
}

async function loadShop(): Promise<void> {
  const pageStatus =
    document.querySelector<HTMLParagraphElement>("#page-status");
  const productSearch =
    document.querySelector<HTMLInputElement>("#product-search");
  if (!pageStatus || !productSearch) {
    throw new Error("Required page elements were not found");
  }

  pageStatus.textContent = "در حال دریافت اطلاعات فروشگاه...";
  try {
    const [products, stock, offers, categories, shop, home] = await Promise.all(
      [
        getProducts(),
        getStock(),
        getOffers(),
        getCategories(),
        getShop(),
        getHome(),
      ],
    );

    const offersById = new Map<number, Offer>();
    offers.forEach(function (offer: Offer): void {
      if (!offersById.has(offer.productId)) {
        offersById.set(offer.productId, offer);
      }
    });

    showShop(shop);
    showCategories(categories);
    showBanners(home);
    showCarousels(home, categories, products, stock, offersById);
    productSearch.placeholder =
      "جست‌وجو در میان " + formatNumber(products.length) + " کالا…";
    setupSearch(products, stock, offersById);
    pageStatus.textContent = "";
    goToFragment();
  } catch (error: unknown) {
    pageStatus.textContent =
      "دریافت اطلاعات ممکن نشد. اتصال اینترنت را بررسی و صفحه را تازه‌سازی کنید.";
  }
}

const mobileLinks = document.querySelector<HTMLElement>("#mobile-links");
const mobileMenu = document.querySelector<HTMLDetailsElement>(".mobile-menu");

if (!mobileLinks || !mobileMenu) {
  throw new Error("Mobile menu elements were not found");
}

mobileLinks.addEventListener("click", function (event: MouseEvent): void {
  if (event.target instanceof Element && event.target.tagName === "A") {
    mobileMenu.open = false;
  }
});

setupTheme();
readCart();
loadShop();
