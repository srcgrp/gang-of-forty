const API_BASE = "../../api/";
const numberFormatter = new Intl.NumberFormat("fa-IR");
const CART_STORAGE_KEY = "superino-cart";
let cart = readCart();

function makeElement(tag, className = "", text = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== "") element.textContent = text;
  return element;
}

function appendLink(container, label, href = "#", className = "") {
  const link = makeElement("a", className, label);
  link.href = href || "#";
  container.append(link);
  return link;
}

function readCart() {
  try {
    const value = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function updateCartCount() {
  const count = Object.values(cart).reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
  const badge = document.querySelector("#cart-count");
  if (badge) badge.textContent = numberFormatter.format(count);
}

function addToCart(productId) {
  const key = String(productId);
  cart[key] = (Number(cart[key]) || 0) + 1;
  try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)); } catch { /* storage may be unavailable */ }
  updateCartCount();
}

function makeSkeleton(className = "") {
  return makeElement("div", `skeleton ${className}`.trim());
}

function renderLoadingSkeletons() {
  const banner = document.querySelector("#home-banners");
  banner.replaceChildren(makeSkeleton("skeleton-banner"), makeSkeleton("skeleton-banner"));
  const categories = document.querySelector("#category-cards");
  categories.replaceChildren(...Array.from({ length: 7 }, () => makeSkeleton("skeleton-category")));
  const carouselContainer = document.querySelector("#home-carousels");
  carouselContainer.replaceChildren();
  for (let i = 0; i < 2; i++) {
    const section = makeElement("section", "recommendation");
    section.append(makeSkeleton("skeleton-heading"));
    const row = makeElement("div", "skeleton-products");
    for (let j = 0; j < 4; j++) row.append(makeSkeleton("skeleton-product"));
    section.append(row);
    carouselContainer.append(section);
  }
  const promos = document.querySelector("#home-promos");
  promos.replaceChildren(makeSkeleton("skeleton-banner"), makeSkeleton("skeleton-banner"));
}

function makeProductCard(product, { offer, stock, categoryName }) {
  const card = makeElement("li", "product-item");
  const emoji = makeElement("div", "product-icon product-emoji", product.emoji || "🛒");
  const tag = makeElement("p", "item-tag", categoryName || product.categoryName || "محصول");
  const quantity = stock?.items?.[String(product.id)];
  const outOfStock = quantity === 0;
  const discount = makeElement("span", "product-discount");
  const title = makeElement("h3", "item-title", product.name || "");
  const description = makeElement("p", "item-description", product.unit || "");
  const oldPrice = makeElement("p", "item-old-price");
  const buyRow = makeElement("div", "item-buy");
  const price = makeElement("span", "item-price");
  const finalPrice = offer ? Math.round(product.price * (100 - offer.percent) / 100) : product.price;
  price.textContent = `${numberFormatter.format(finalPrice)} تومان`;
  if (offer) {
    discount.textContent = `${numberFormatter.format(offer.percent)}٪`;
    oldPrice.textContent = `${numberFormatter.format(product.price)} تومان`;
  } else {
    discount.hidden = true;
    oldPrice.hidden = true;
  }
  const button = makeElement("button", "buy-button", "+");
  button.type = "button";
  if (outOfStock) {
    card.classList.add("product-item--unavailable");
    tag.after(makeElement("span", "product-stock-badge", "ناموجود"));
    button.disabled = true;
    button.title = "این کالا موجود نیست";
  } else {
    button.dataset.productId = String(product.id);
    button.title = `افزودن ${product.name} به سبد خرید`;
  }
  buyRow.append(price, button);
  card.append(emoji, tag, discount, title, description, oldPrice, buyRow);
  return card;
}

function renderProducts(container, products, optionsForProduct) {
  const fragment = document.createDocumentFragment();
  products.forEach((product) => fragment.append(makeProductCard(product, optionsForProduct(product))));
  container.replaceChildren(fragment);
}

function setupCarousel({ products, viewport, previous, next }) {
  const carousel = { offset: 0, step: 0, maxOffset: 0 };
  const update = () => {
    const firstCard = products.querySelector(".product-item");
    if (!firstCard) { previous.disabled = true; next.disabled = true; return; }
    const styles = getComputedStyle(products);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    carousel.step = firstCard.getBoundingClientRect().width + gap;
    carousel.maxOffset = Math.max(0, products.scrollWidth - viewport.clientWidth);
    carousel.offset = Math.min(carousel.offset, carousel.maxOffset);
    products.style.transform = `translateX(${carousel.offset}px)`;
    previous.disabled = carousel.offset <= 0;
    next.disabled = carousel.offset >= carousel.maxOffset - 1;
  };
  const move = (direction) => {
    carousel.offset = Math.max(0, Math.min(carousel.maxOffset, carousel.offset + direction * carousel.step));
    products.style.transform = `translateX(${carousel.offset}px)`;
    previous.disabled = carousel.offset <= 0;
    next.disabled = carousel.offset >= carousel.maxOffset - 1;
  };
  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  window.addEventListener("resize", update);
  requestAnimationFrame(update);
}

function renderShopDetails(shop) {
  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element && value != null) {
      element.textContent = value;
      element.classList.remove("skeleton-text");
    }
  };
  setText("#shop-notice", shop.notice);
  setText("#shop-name", "سوپرینو");
  setText("#footer-shop-name", "سوپرینو");
  setText("#shop-slogan", shop.slogan);
  setText("#shop-about", shop.about);
  setText("#shop-address", shop.address);
  setText("#shop-phone", shop.phone);
  const copyright = String(shop.copyright || "").replace(/سوپرمارکت\s*مینا/g, "سوپرینو").trim();
  setText("#shop-copyright", copyright || "سوپرینو");

  const menu = document.querySelector("#shop-menu-links");
  menu.replaceChildren();
  (shop.menu || []).forEach((item) => appendLink(menu, item.label, item.href, "menu-texts"));
  const hours = document.querySelector("#shop-hours");
  hours.replaceChildren();
  (shop.schedule || []).forEach((item) => hours.append(makeElement("p", "", `${item.days}: ${item.time}`)));
}

function renderCategories(categories) {
  const categoryMenu = document.querySelector("#category-menu-links");
  const categoryCards = document.querySelector("#category-cards");
  const footerCategories = document.querySelector("#footer-category-links");
  categoryMenu.replaceChildren(); categoryCards.replaceChildren(); footerCategories.replaceChildren();
  categories.forEach((category) => {
    const href = `#${category.slug}`;
    appendLink(categoryMenu, `${category.emoji || "🛒"} ${category.name}`, href, "hidden-content-links");
    const card = appendLink(categoryCards, "", href, "categories-box");
    const icon = makeElement("span", "categories-icon category-emoji", category.emoji || "🛒");
    icon.style.backgroundColor = category.color || "var(--light-blue)";
    card.append(icon, makeElement("p", "categories-name", category.name));
    appendLink(footerCategories, category.name, href);
  });
}

function makeBanner(data, variant) {
  if (!data) return null;
  const article = makeElement("article", variant);
  const content = makeElement("div", `banner-content ${variant}-content`);
  content.append(makeElement("h2", `banner-title ${variant}-title`, `${data.title || ""}`.trim()));
  content.append(makeElement("p", `banner-details ${variant}-details`, data.text || ""));
  if (data.cta) appendLink(content, data.cta.label || "مشاهده", data.cta.href || "#", `banner-button ${variant}-button`);
  const icon = makeElement("span", "banner-art", data.emoji || "🛍️");
  article.append(content, icon);
  return article;
}

function renderHeroBanners(home) {
  const container = document.querySelector("#home-banners");
  container.replaceChildren();
  const hero = makeBanner(home.hero, "banner-fruit");
  const side = makeBanner(home.side, "banner-sale");
  if (hero) container.append(hero);
  if (side) container.append(side);
}

function renderPromos(home) {
  const container = document.querySelector("#home-promos");
  container.replaceChildren();
  (home.promos || []).forEach((promo, index) => {
    const variant = index % 2 === 0 ? "banner-breakfast" : "banner-bread";
    const article = makeElement("article", variant);
    const content = makeElement("div", "banner-content");
    content.append(makeElement("h2", "banner-title", `${promo.text || ""}`.trim()));
    appendLink(content, "دیدن محصولات", promo.href || "#", "promo-link");
    const icon = makeElement("span", "promo-emoji", promo.emoji || "🛍️");
    article.append(content, icon);
    container.append(article);
  });
}

function createCarouselSection(config, products, stock, offersByProductId, categories) {
  const section = makeElement("section", "recommendation");
  section.id = config.id;
  section.append(makeElement("h2", "recommendation-title", `${config.emoji || "🛒"} ${config.title || "محصولات"}`.trim()));
  const carousel = makeElement("div", "dairy-carousel");
  const viewport = makeElement("div", "dairy-carousel-viewport");
  const list = makeElement("ul", "products");
  const previous = makeElement("button", "dairy-prev-button", "→");
  previous.type = "button"; previous.disabled = true; previous.title = "محصول قبلی";
  const next = makeElement("button", "dairy-next-button", "←");
  next.type = "button"; next.title = "محصول بعدی";
  const controls = makeElement("div", "dairy-carousel-controls");
  controls.append(previous, next);
  viewport.append(list); carousel.append(viewport, controls); section.append(carousel);

  let selected;
  if (config.source === "offers" || config.id === "offers") selected = products.filter((product) => offersByProductId.has(product.id));
  else {
    const categoryId = config.categoryId ?? config.category?.id;
    selected = products.filter((product) => product.categoryId === categoryId);
  }
  const category = categories.find((item) => item.id === (config.categoryId ?? config.category?.id));
  renderProducts(list, selected, (product) => ({ offer: offersByProductId.get(product.id), stock, categoryName: category?.name || config.title || "محصول" }));
  if (!selected.length) section.append(makeElement("p", "empty-message", "محصولی برای نمایش وجود ندارد."));
  setupCarousel({ products: list, viewport, previous, next });
  return section;
}

function renderHomeCarousels(home, products, stock, offersByProductId, categories) {
  const container = document.querySelector("#home-carousels");
  container.replaceChildren();

  const configuredCategoryIds = new Set();

  (home.carousels || [])
    .filter((config) => config.title !== "لبنیات")
    .forEach((config) => {
      if (config.categoryId != null) {
        configuredCategoryIds.add(config.categoryId);
      } else if (config.category?.id != null) {
        configuredCategoryIds.add(config.category.id);
      }

      container.append(
        createCarouselSection(
          config,
          products,
          stock,
          offersByProductId,
          categories
        )
      );
    });

  return configuredCategoryIds;
}

function renderRemainingCategoryCarousels(
  home,
  categories,
  products,
  stock,
  offersByProductId,
  configuredCategoryIds
) {
  const container = document.querySelector("#category-product-sections");
  container.replaceChildren();

  const renderedCategoryIds = new Set(configuredCategoryIds);

  (home.carousels || [])
    .filter((config) => config.id !== "offers" && config.title !== "پیشنهاد ویژه")
    .forEach((config) => {
      const categoryId = config.categoryId ?? config.category?.id;

      if (categoryId == null || renderedCategoryIds.has(categoryId)) return;

      container.append(
        createCarouselSection(
          config,
          products,
          stock,
          offersByProductId,
          categories
        )
      );

      renderedCategoryIds.add(categoryId);
    });

  categories
    .filter((category) => !renderedCategoryIds.has(category.id))
    .forEach((category) => {
      container.append(
        createCarouselSection(
          {
            id: category.slug,
            title: category.name,
            emoji: category.emoji,
            categoryId: category.id,
          },
          products,
          stock,
          offersByProductId,
          categories
        )
      );

      renderedCategoryIds.add(category.id);
    });
}

function setupSearch(products) {
  const input = document.querySelector(".search-entry");
  if (input) input.placeholder = `جستجو در میان ${numberFormatter.format(products.length)} کالا...`;
}

async function loadPage() {
  const endpoints = ["products.json", "stock.json", "offers.json", "categories.json", "shop.json", "home.json"];
  try {
    const responses = await Promise.all(endpoints.map((file) => fetch(`${API_BASE}${file}`)));
    if (responses.some((response) => !response.ok)) throw new Error("API request failed");
    const [products, stock, offers, categories, shop, home] = await Promise.all(responses.map((response) => response.json()));
    const offersByProductId = new Map(offers.map((offer) => [offer.productId, offer]));
    renderShopDetails(shop);
    renderCategories(categories);
    renderHeroBanners(home);
    renderPromos(home);
    const configuredCategoryIds = renderHomeCarousels(
      home,
      products,
      stock,
      offersByProductId,
      categories
    );

    renderRemainingCategoryCarousels(
      home,
      categories,
      products,
      stock,
      offersByProductId,
      configuredCategoryIds
    );
    
    setupSearch(products);
  } catch (error) {
    document.querySelectorAll(".skeleton-text").forEach((item) => item.classList.remove("skeleton-text"));
    const main = document.querySelector("#main-content");
    main.prepend(makeElement("p", "api-status api-status--error", "بارگذاری اطلاعات با مشکل مواجه شد. اتصال را بررسی و صفحه را دوباره بارگذاری کنید."));
    console.error(error);
  }
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".buy-button[data-product-id]");
  if (button && !button.disabled) addToCart(button.dataset.productId);
});

updateCartCount();
renderLoadingSkeletons();
loadPage();
