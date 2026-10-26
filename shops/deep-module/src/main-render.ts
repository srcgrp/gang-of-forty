import type { Category, Home, Offer, Product, Shop, StockData } from "./types";
import { filterProducts } from "./catalog/filter";
import { createProductCard } from "./ui/product-card";
import { attachProductEvents } from "./ui/product-events";
import { h } from "./ui/dom";
import { safeHref } from "./ui/format";

import { renderEmpty } from "./ui/empty-state";
import { state, addToCart } from "./main";

export function renderApp(): void {
  if (!state.data) return;
  const { products, categories, shop, home, offers, stock } = state.data;

  renderShopInfo(shop, categories);
  renderHero(home);
  renderCategories(categories);
  renderSpecialOffers(products, offers, stock);
  renderAllProducts(products, offers, stock);
  renderBanners(home);
  renderFooter(shop, categories);
  renderCategorySections(products, categories, stock);
}

// ========== Shop Info (Topbar + Nav + Mega) ==========
function renderShopInfo(shop: Shop, categories: Category[]): void {
  const topbar = document.getElementById("topbar-text");
  if (topbar && shop.notice)
    topbar.textContent = String(shop.notice).slice(0, 200);

  const brandName = document.getElementById("brand-name");
  if (brandName && shop.name)
    brandName.textContent = String(shop.name).slice(0, 50);

  const brandSlogan = document.getElementById("brand-slogan");
  if (brandSlogan && shop.slogan)
    brandSlogan.textContent = String(shop.slogan).slice(0, 100);

  // Nav links از shop.menu
  const navLinks = document.getElementById("nav-links");
  if (navLinks && Array.isArray(shop.menu)) {
    navLinks.replaceChildren();
    for (const item of shop.menu.slice(0, 10)) {
      const li = h("li");
      const a = h("a", undefined, String(item.label ?? "").slice(0, 50));
      a.href = safeHref(item.href);
      li.appendChild(a);
      navLinks.appendChild(li);
    }
  }

  // Mega list از categories
  const megaList = document.getElementById("mega-list");
  if (megaList && categories.length > 0) {
    megaList.replaceChildren();
    for (const cat of categories) {
      const li = h("li");
      const a = h("a");
      a.href = `#cat-${cat.id}`;
      a.setAttribute("role", "menuitem");
      const emoji = h("span", undefined, cat.emoji ?? "");
      emoji.setAttribute("aria-hidden", "true");
      a.append(emoji, " " + cat.name);
      li.appendChild(a);
      megaList.appendChild(li);
    }
  }
}

// ========== Hero Cards (primary + secondary) ==========
function renderHero(home: Home): void {
  if (home.hero) {
    const title = home.hero.title;
    const heroTitle = document.getElementById("hero-title");
    if (heroTitle && typeof title === "string") {
      heroTitle.replaceChildren();
      title
        .slice(0, 200)
        .split("،")
        .forEach((line, i) => {
          if (i > 0) heroTitle.appendChild(document.createElement("br"));
          heroTitle.appendChild(document.createTextNode(line.trim()));
        });
    }

    const text = document.querySelector<HTMLElement>(
      ".hero-card--primary .hero-card__text",
    );
    if (text && typeof home.hero.text === "string")
      text.textContent = home.hero.text.slice(0, 300);

    const btn = document.querySelector<HTMLAnchorElement>(
      ".hero-card--primary .hero-card__btn",
    );
    if (btn && home.hero.cta) {
      btn.href = safeHref(home.hero.cta.href);
      const span = btn.querySelector<HTMLElement>("span:first-child");
      if (span && home.hero.cta.label)
        span.textContent = String(home.hero.cta.label).slice(0, 50);
    }
  }

  if (home.side) {
    const title = document.querySelector<HTMLElement>(
      ".hero-card--secondary .hero-card__title",
    );
    if (title && home.side.title)
      title.textContent = String(home.side.title).slice(0, 100);

    const text = document.querySelector<HTMLElement>(
      ".hero-card--secondary .hero-card__text",
    );
    if (text && home.side.text)
      text.textContent = String(home.side.text).slice(0, 200);

    const btn = document.querySelector<HTMLAnchorElement>(
      ".hero-card--secondary .hero-card__btn",
    );
    if (btn && home.side.cta) {
      btn.href = safeHref(home.side.cta.href);
      const span = btn.querySelector<HTMLElement>("span:first-child");
      if (span && home.side.cta.label)
        span.textContent = String(home.side.cta.label).slice(0, 50);
    }
  }
}

// ========== Categories (با رنگ و glow و arrow) ==========
function createArrowSvg(): SVGElement {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "14");
  svg.setAttribute("height", "14");
  const path = document.createElementNS(NS, "path");
  path.setAttribute("d", "M5 12h14M13 6l6 6-6 6");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "2.5");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  svg.appendChild(path);
  return svg;
}

function renderCategories(categories: Category[]): void {
  const grid = document.getElementById("categories-grid");
  if (!grid) return;

  if (categories.length === 0) {
    renderEmpty(grid, {
      icon: "📂",
      title: "دسته‌بندی‌ای موجود نیست",
      text: "به‌زودی اضافه می‌شود.",
    });
    return;
  }

  grid.replaceChildren();
  const frag = document.createDocumentFragment();
  categories.forEach((cat, index) => {
    const li = h("li");
    li.style.setProperty("--i", String(index));
    const a = h("a", "category-card");
    a.href = `#cat-${cat.id}`;

    const validColor = /^#[0-9a-fA-F]{3,8}$/.test(cat.color ?? "")
      ? cat.color!
      : "#f0f9f1";
    const glow = h("span", "category-card__glow");
    glow.style.setProperty("--c", validColor);

    const icon = h("span", "category-card__icon", cat.emoji ?? "");
    icon.style.background = validColor;

    const arrow = h("span", "category-card__arrow");
    arrow.setAttribute("aria-hidden", "true");
    arrow.appendChild(createArrowSvg());

    a.append(glow, icon, h("span", "category-card__title", cat.name), arrow);
    li.appendChild(a);
    frag.appendChild(li);
  });
  grid.appendChild(frag);
}

// ========== Special Offers ==========
function renderSpecialOffers(
  products: Product[],
  offers: Offer[],
  stock: StockData,
): void {
  const track = document.getElementById("special-track");
  if (!track) return;

  if (offers.length === 0) {
    renderEmpty(track, {
      icon: "🔥",
      title: "پیشنهاد ویژه‌ای موجود نیست",
      text: "به‌زودی اضافه می‌شود.",
    });
    return;
  }

  track.replaceChildren();
  const frag = document.createDocumentFragment();
  for (const offer of offers) {
    const product = products.find((p) => p.id === offer.productId);
    if (!product) continue;
    frag.appendChild(createProductCard(product, offer, stock));
  }
  track.appendChild(frag);
  attachProductEvents(track, products, addToCart);
}

// ========== All Products (با فیلتر و badge) ==========
function renderAllProducts(
  products: Product[],
  offers: Offer[],
  stock: StockData,
): void {
  const track = document.getElementById("all-track");
  const countEl = document.getElementById("all-count");
  if (!track) return;

  const filtered = filterProducts(
    products,
    state.filters,
    stock,
    offers,
    state.searchIds,
  );
  track.replaceChildren();

  if (filtered.length === 0) {
    const empty = h("li", "products-empty");
    const message = state.searchIds
      ? "نتیجه‌ای برای جستجوی شما پیدا نشد"
      : "محصولی پیدا نشد";
    const hint = state.searchIds
      ? "عبارت دیگری را امتحان کنید"
      : "فیلترها را تغییر دهید";
    empty.append(
      h("span", "products-empty__icon", "🔍"),
      h("p", "products-empty__text", message),
      h("p", "products-empty__hint", hint),
    );
    track.appendChild(empty);
  } else {
    for (const p of filtered) {
      const offer = offers.find((o) => o.productId === p.id) ?? null;
      track.appendChild(createProductCard(p, offer, stock));
    }
    attachProductEvents(track, products, addToCart);
  }

  if (countEl)
    countEl.textContent = `${filtered.length.toLocaleString("fa-IR")} کالا`;

  // Filter badge
  const activeCount = [
    state.filters.categoryId !== "all",
    state.filters.stock !== "all",
    state.filters.discount !== "all",
    state.filters.sort !== "default",
  ].filter(Boolean).length;
  const badge = document.getElementById("filter-badge");
  if (badge) {
    badge.hidden = activeCount === 0;
    if (activeCount > 0)
      badge.textContent = activeCount.toLocaleString("fa-IR");
  }
}

// ========== Banners ==========
function renderBanners(home: Home): void {
  const wrapper = document.getElementById("banners-wrapper");
  if (!wrapper) return;
  wrapper.replaceChildren();
  if (!home.promos) return;

  for (const promo of home.promos.slice(0, 10)) {
    const a = h("a", "banner");
    a.href = safeHref(promo.href);
    const icon = h("span", "banner__icon", promo.emoji ?? "");
    icon.setAttribute("aria-hidden", "true");
    const content = h("div", "banner__content");
    content.appendChild(h("strong", undefined, promo.text ?? ""));
    const arrow = h("span", "banner__arrow", "←");
    arrow.setAttribute("aria-hidden", "true");
    a.append(icon, content, arrow);
    wrapper.appendChild(a);
  }
}

// ========== Footer (کامل: name, about, phone, links, help, schedule, copyright) ==========
function renderFooter(shop: Shop, categories: Category[]): void {
  const name = document.getElementById("footer-name");
  if (name && shop.name) name.textContent = String(shop.name).slice(0, 50);

  const about = document.getElementById("footer-about");
  if (about && shop.about) about.textContent = String(shop.about).slice(0, 300);

  const phone = document.querySelector<HTMLAnchorElement>("#footer-phone");
  if (phone && shop.phone) {
    const p = String(shop.phone)
      .replace(/[^\d+\-\s()]/g, "")
      .slice(0, 20);
    phone.textContent = p;
    phone.href = `tel:${p.replace(/[^\d+]/g, "")}`;
  }

  const links = document.getElementById("footer-links");
  if (links && categories.length > 0) {
    links.replaceChildren();
    for (const cat of categories.slice(0, 5)) {
      const li = h("li");
      const a = h("a", undefined, cat.name);
      a.href = `#cat-${cat.id}`;
      li.appendChild(a);
      links.appendChild(li);
    }
  }

  const help = document.getElementById("footer-help");
  if (help && Array.isArray(shop.help)) {
    help.replaceChildren();
    for (const item of shop.help.slice(0, 10)) {
      const li = h("li");
      const a = h("a", undefined, item.label ?? "");
      a.href = safeHref(item.href);
      li.appendChild(a);
      help.appendChild(li);
    }
  }

  const schedule = document.getElementById("footer-schedule");
  if (schedule && Array.isArray(shop.schedule)) {
    schedule.replaceChildren();
    for (const item of shop.schedule.slice(0, 7)) {
      const p = h("p", "footer__text");
      p.append(item.days ?? "", document.createElement("br"), item.time ?? "");
      schedule.appendChild(p);
    }
  }

  const copy = document.getElementById("footer-copy");
  if (copy && shop.copyright)
    copy.textContent = String(shop.copyright).slice(0, 200);
}

// ========== Category Sections (carousel per category) ==========
function renderCategorySections(
  products: Product[],
  categories: Category[],
  stock: StockData,
): void {
  const container = document.getElementById("category-sections");
  if (!container) return;
  container.replaceChildren();

  if (categories.length === 0 || products.length === 0) return;

  const frag = document.createDocumentFragment();

  for (const cat of categories) {
    const catProducts = products.filter((p) => p.categoryId === cat.id);
    if (catProducts.length === 0) continue;

    const section = h("section", "carousel-section");
    section.id = `cat-${cat.id}`;
    const head = h("div", "carousel-section__head");
    const h2 = h("h2", "section-head__title");
    const emoji = h("span", undefined, cat.emoji ?? "");
    emoji.setAttribute("aria-hidden", "true");
    h2.append(emoji, " " + cat.name);
    head.append(
      h2,
      h(
        "span",
        "section-head__count",
        `${catProducts.length.toLocaleString("fa-IR")} کالا`,
      ),
    );

    const carousel = h("div", "carousel");
    carousel.setAttribute("role", "region");
    carousel.setAttribute("aria-label", `کاروسل ${cat.name}`);
    carousel.tabIndex = 0;

    const track = h("ul", "carousel__track");
    for (const p of catProducts) {
      track.appendChild(createProductCard(p, null, stock));
    }

    carousel.appendChild(track);
    section.append(head, carousel);
    frag.appendChild(section);

    attachProductEvents(track, products, addToCart);
  }

  container.appendChild(frag);
}
