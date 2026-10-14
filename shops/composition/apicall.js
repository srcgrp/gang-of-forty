const pageStatus = document.querySelector("#page-status");
let cartCount = 0;

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

function createLink(text, href, className) {
  const link = createElement("a", className, text);
  link.href = href;
  return link;
}

function formatNumber(number) {
  return new Intl.NumberFormat("fa-IR").format(number);
}

function formatPrice(price) {
  return formatNumber(price) + " تومان";
}

async function getJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("دریافت اطلاعات ناموفق بود");
  }
  return await response.json();
}

function updateCart() {
  document.querySelector("#cart-count").textContent = formatNumber(cartCount);
  document.querySelector(".cart-button").setAttribute(
    "aria-label", "سبد خرید، " + formatNumber(cartCount) + " کالا"
  );
}

function readCart() {
  try {
    const savedCount = Number(localStorage.getItem("batshop-cart-count"));
    if (Number.isSafeInteger(savedCount) && savedCount >= 0) {
      cartCount = savedCount;
    }
  } catch (error) {
    cartCount = 0;
  }
  updateCart();
}

function showShop(shop) {
  document.querySelector("#notice").textContent = shop.notice;
  document.querySelector("#slogan").textContent = shop.slogan;

  shop.menu.forEach(function (item) {
    document.querySelector("#main-links").appendChild(createLink(item.label, item.href, ""));
    document.querySelector("#mobile-links").appendChild(createLink(item.label, item.href, ""));
  });

  const info = document.querySelector("#shop-info");
  info.appendChild(createElement("h2", "", "بت‌شاپ"));
  info.appendChild(createElement("p", "", shop.about));
  info.appendChild(createElement("address", "", shop.address));
  const phone = createLink(shop.phone, "tel:" + shop.phone, "");
  phone.dir = "ltr";
  info.appendChild(phone);

  const hours = document.querySelector("#shop-hours");
  hours.appendChild(createElement("h2", "", "ساعت کاری"));
  shop.schedule.forEach(function (day) {
    hours.appendChild(createElement("p", "", day.days + ": " + day.time));
  });

  const bottom = document.querySelector("#footer-bottom");
  bottom.appendChild(createElement("p", "", shop.copyright.replace(shop.name, "بت‌شاپ")));
  bottom.appendChild(createLink("بازگشت به بالا ↑", "#top", ""));
}

function showCategories(categories) {
  document.querySelector("#categories-heading").appendChild(
    createElement("h2", "", "از اینجا شروع کن")
  );
  document.querySelector("#footer-categories").appendChild(
    createElement("h2", "", "دسته‌بندی‌ها")
  );

  categories.forEach(function (category) {
    const href = "#" + category.slug;
    const tile = createLink("", href, "category-tile");
    const icon = createElement("span", "category-emoji", category.emoji);
    icon.style.backgroundColor = category.color;
    icon.setAttribute("aria-hidden", "true");
    tile.appendChild(icon);
    tile.appendChild(createElement("strong", "", category.name));
    document.querySelector("#category-tiles").appendChild(tile);
    document.querySelector("#category-links").appendChild(createLink(category.name, href, ""));
    document.querySelector("#footer-categories").appendChild(createLink(category.name, href, ""));
  });
}

function showBanner(banner, headingTag) {
  const section = createElement("section", "hero", "");
  section.appendChild(createElement(headingTag, "", banner.title));
  section.appendChild(createElement("p", "", banner.text));
  const emoji = createElement("span", "banner-emoji", banner.emoji);
  emoji.setAttribute("aria-hidden", "true");
  section.appendChild(emoji);
  section.appendChild(createLink(banner.cta.label, banner.cta.href, "primary-link"));
  document.querySelector("#banners").appendChild(section);
}

function showBanners(home) {
  showBanner(home.hero, "h1");
  showBanner(home.side, "h2");
  home.promos.forEach(function (promo) {
    const link = createLink("", promo.href, "promo");
    link.style.backgroundColor = promo.color;
    const emoji = createElement("span", "promo-emoji", promo.emoji);
    emoji.setAttribute("aria-hidden", "true");
    link.appendChild(emoji);
    link.appendChild(createElement("span", "", promo.text));
    document.querySelector("#promos").appendChild(link);
  });
}

function createProductCard(product, stock, offers) {
  const card = document.createElement("article");
  card.className = "product-card";

  const image = document.createElement("div");
  image.className = "product-image product-emoji";
  image.textContent = product.emoji;
  image.setAttribute("aria-hidden", "true");
  card.appendChild(image);

  const name = document.createElement("h3");
  name.textContent = product.name;
  card.appendChild(name);

  const unit = document.createElement("p");
  unit.className = "unit";
  unit.textContent = product.unit;
  card.appendChild(unit);

  const offer = offers.find(function (item) {
    return item.productId === product.id;
  });

  let finalPrice = product.price;

  if (offer) {
    const badge = document.createElement("span");
    badge.className = "discount-badge";
    badge.textContent =
      offer.label + "؛ " + new Intl.NumberFormat("fa-IR").format(offer.percent) + "٪ تخفیف";
    card.appendChild(badge);

    finalPrice = Math.round(product.price * (100 - offer.percent) / 100);
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

  button.addEventListener("click", function () {
    cartCount = cartCount + 1;
    updateCart();
    try {
      localStorage.setItem("batshop-cart-count", cartCount);
      document.querySelector("#cart-message").textContent = product.name + " به سبد اضافه شد.";
    } catch (error) {
      document.querySelector("#cart-message").textContent =
        "کالا اضافه شد، اما مرورگر اجازه ذخیره تعداد سبد را نمی‌دهد.";
    }
  });

  card.appendChild(button);
  return card;
}


function showCarousel(carousel, products, stock, offers) {
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
  list.setAttribute("aria-label", carousel.title + "؛ برای پیمایش از کلیدهای جهت استفاده کنید");

  let selectedProducts;
  if (carousel.source === "offers") {
    selectedProducts = products.filter(function (product) {
      return offers.find(function (offer) {
        return offer.productId === product.id;
      });
    });
  } else {
    selectedProducts = products.filter(function (product) {
      return product.categoryId === carousel.categoryId;
    });
  }

  selectedProducts.forEach(function (product, index) {
    const card = createProductCard(product, stock, offers);
    card.id = carousel.id + "-" + product.id;
    if (index === 0) {
      card.id = carousel.id + "-first";
    } else if (index === selectedProducts.length - 1) {
      card.id = carousel.id + "-last";
    }
    list.appendChild(card);
  });

  if (selectedProducts.length > 0) {
    const first = createLink("ابتدا", "#" + list.firstElementChild.id, "");
    first.setAttribute("aria-label", "ابتدای " + carousel.title);
    const last = createLink("انتها", "#" + list.lastElementChild.id, "");
    last.setAttribute("aria-label", "انتهای " + carousel.title);
    controls.appendChild(first);
    controls.appendChild(last);
  } else {
    controls.hidden = true;
    status.textContent = "محصولی برای نمایش وجود ندارد.";
  }

  section.appendChild(list);
  document.querySelector("#carousels").appendChild(section);
}

function showCategoryProducts(category, products, stock, offers) {
  const section = createElement("section", "product-section", "");
  section.id = category.slug;
  const title = createElement("h2", "", category.name);
  title.id = category.slug + "-title";
  section.setAttribute("aria-labelledby", title.id);
  section.appendChild(title);

  const list = createElement("div", "sample-products", "");
  const selectedProducts = products.filter(function (product) {
    return product.categoryId === category.id;
  });

  selectedProducts.forEach(function (product) {
    list.appendChild(createProductCard(product, stock, offers));
  });

  if (selectedProducts.length === 0) {
    list.appendChild(createElement("p", "products-status", "محصولی برای نمایش وجود ندارد."));
  }

  section.appendChild(list);
  document.querySelector("#category-products").appendChild(section);
}

function showCarousels(home, categories, products, stock, offers) {
  home.carousels.forEach(function (carousel) {
    showCarousel(carousel, products, stock, offers);
  });

  categories.forEach(function (category) {
    if (!document.getElementById(category.slug)) {
      showCategoryProducts(category, products, stock, offers);
    }
  });
}

function goToFragment() {
  const id = window.location.hash.slice(1);
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ block: "start", inline: "nearest" });
  }
}

async function loadShop() {
  pageStatus.textContent = "در حال دریافت اطلاعات فروشگاه...";
  try {
    const [products, stock, offers, categories, shop, home] = await Promise.all([
      getJSON("../../api/products.json"),
      getJSON("../../api/stock.json"),
      getJSON("../../api/offers.json"),
      getJSON("../../api/categories.json"),
      getJSON("../../api/shop.json"),
      getJSON("../../api/home.json")
    ]);

    showShop(shop);
    showCategories(categories);
    showBanners(home);
    showCarousels(home, categories, products, stock, offers);
    document.querySelector("#product-search").placeholder =
      "جست‌وجو در میان " + formatNumber(products.length) + " کالا…";
    pageStatus.textContent = "";
    goToFragment();
  } catch (error) {
    pageStatus.textContent =
      "دریافت اطلاعات ممکن نشد. اتصال اینترنت را بررسی و صفحه را تازه‌سازی کنید.";
  }
}

document.querySelector("#mobile-links").addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    document.querySelector(".mobile-menu").open = false;
  }
});

readCart();
loadShop();
