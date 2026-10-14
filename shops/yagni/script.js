// update Cart on loading page

document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
});

//render error

function renderError(container, retryFunction, messageText) {
  const errorMessage = document.createElement("div");
  errorMessage.classList.add("product-error");

  const icon = document.createElement("span");
  icon.classList.add("product-error__icon");
  icon.textContent = "⚠️";
  icon.setAttribute("aria-hidden", "true");

  const message = document.createElement("p");
  message.classList.add("product-error__message");
  message.textContent = messageText;

  const retryButton = document.createElement("button");
  retryButton.classList.add("product-error__retry");
  retryButton.type = "button";
  retryButton.textContent = "تلاش مجدد";

  retryButton.addEventListener("click", retryFunction);

  errorMessage.append(icon, message, retryButton);

  container.replaceChildren(errorMessage);
}

//skeletons

function renderSkeletons(container, count = 6) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const card = document.createElement("div");
    card.classList.add("product-skeleton");
    card.setAttribute("aria-hidden", "true");

    const thumb = document.createElement("div");
    thumb.classList.add("product-skeleton__thumb");

    const thumbShimmer = document.createElement("div");
    thumbShimmer.classList.add("product-skeleton__shimmer");
    thumb.append(thumbShimmer);

    const info = document.createElement("div");
    info.classList.add("product-skeleton__info");

    const name = document.createElement("div");
    name.classList.add(
      "product-skeleton__shimmer",
      "product-skeleton__name"
    );

    const unit = document.createElement("div");
    unit.classList.add(
      "product-skeleton__shimmer",
      "product-skeleton__unit"
    );

    info.append(name, unit);

    const footer = document.createElement("div");
    footer.classList.add("product-skeleton__footer");

    const pricing = document.createElement("div");
    pricing.classList.add("product-skeleton__pricing");

    const oldPrice = document.createElement("div");
    oldPrice.classList.add(
      "product-skeleton__shimmer",
      "product-skeleton__old-price"
    );

    const currentPrice = document.createElement("div");
    currentPrice.classList.add(
      "product-skeleton__shimmer",
      "product-skeleton__current-price"
    );

    pricing.append(oldPrice, currentPrice);

    const button = document.createElement("div");
    button.classList.add(
      "product-skeleton__shimmer",
      "product-skeleton__button"
    );

    footer.append(pricing, button);
    card.append(thumb, info, footer);
    fragment.append(card);
  }

  container.replaceChildren(fragment);
}

function renderCategorySkeletons(container, count = 7) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const card = document.createElement("div");
    card.classList.add("category-skeleton");
    card.setAttribute("aria-hidden", "true");

    const image = document.createElement("div");
    image.classList.add(
      "category-skeleton__shimmer",
      "category-skeleton__image"
    );

    const title = document.createElement("div");
    title.classList.add(
      "category-skeleton__shimmer",
      "category-skeleton__title"
    );

    card.append(image, title);
    fragment.append(card);
  }

  container.replaceChildren(fragment);
}

function renderBannerSkeleton(count = 2) {
  const banner = document.querySelector("#banner");

  if (!banner) return;

  const bannerTrack = banner.querySelector(".banner__track");

  if (!bannerTrack) return;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const slide = document.createElement("div");

    slide.classList.add("banner-skeleton");
    slide.setAttribute("aria-hidden", "true");

    const emoji = document.createElement("div");

    emoji.classList.add(
      "banner-skeleton__shimmer",
      "banner-skeleton__emoji"
    );

    const content = document.createElement("div");

    content.classList.add("banner-skeleton__content");

    const title = document.createElement("div");

    title.classList.add(
      "banner-skeleton__shimmer",
      "banner-skeleton__title"
    );

    const text = document.createElement("div");

    text.classList.add(
      "banner-skeleton__shimmer",
      "banner-skeleton__text"
    );

    const cta = document.createElement("div");

    cta.classList.add(
      "banner-skeleton__shimmer",
      "banner-skeleton__cta"
    );

    content.append(title, text, cta);
    slide.append(emoji, content);

    fragment.append(slide);
  }

  bannerTrack.replaceChildren(fragment);
}

function renderPromoSkeletons() {
  const advertisements = document.querySelectorAll(".advertisement");

  advertisements.forEach((advertisement) => {
    const skeleton = document.createElement("div");

    skeleton.classList.add("advertisement-skeleton");
    skeleton.setAttribute("aria-hidden", "true");

    advertisement.replaceChildren(skeleton);
  });
}
/////////////////////////////////
// task 1- fetch and show  products in carousel
///////////////////////////////////

async function getProducts() {
  const [productsResponse, offersResponse] = await Promise.all([
    fetch("../../api/products.json"),
    fetch("../../api/offers.json"),
  ]);

  if (!productsResponse.ok || !offersResponse.ok) {
    throw new Error("Failed to fetch products or offers");
  }

  const [products, offers] = await Promise.all([
    productsResponse.json(),
    offersResponse.json(),
  ]);

  return { products, offers };
}
async function renderProducts(categoryId, containerSelector) {
  const container = document.querySelector(containerSelector);

  if (!container) return;

  renderSkeletons(container);

  try {
    const { products, offers } = await getProducts();

    const filteredProducts = products.filter(
      (product) => product.categoryId === categoryId
    );

    container.replaceChildren();

    // =========================
    // Carousel start anchor
    // =========================

    const startAnchor = document.createElement("span");

    startAnchor.id = `products-${categoryId}-start`;
    startAnchor.classList.add("anchor-section");

    container.append(startAnchor);


    filteredProducts.forEach((product) => {
      const offer = offers.find(
        (item) => item.productId === product.id
      );

      const discountedPrice = offer
        ? Math.round(product.price * (1 - offer.percent / 100))
        : product.price;

  

      const card = document.createElement("div");

      card.classList.add("product-card");

     

      const badges = document.createElement("div");

      badges.classList.add("product-badges");

      if (offer) {
        const discount = document.createElement("span");

        discount.classList.add("badge-discount");

        discount.textContent =
          `${offer.percent.toLocaleString("fa-IR")}٪`;

        badges.append(discount);
      }

      if (product.tags?.length) {
        const tags = document.createElement("div");

        tags.classList.add("product-tags");

        product.tags.forEach((tag) => {
          const tagBadge = document.createElement("span");

          tagBadge.classList.add("badge-offer-label");

          tagBadge.textContent = tag;

          tags.append(tagBadge);
        });

        badges.append(tags);
      }

      card.append(badges);

 

      const thumb = document.createElement("div");

      thumb.classList.add("product-thumb");

      const emoji = document.createElement("span");

      emoji.classList.add("product-emoji");

      emoji.textContent = product.emoji;

      emoji.setAttribute("role", "img");
      emoji.setAttribute("aria-label", product.name);

      thumb.append(emoji);

      const info = document.createElement("div");

      info.classList.add("product-info");

      const name = document.createElement("span");

      name.classList.add("product-name");

      name.textContent = product.name;

      const unit = document.createElement("span");

      unit.classList.add("product-unit");

      unit.textContent = product.unit;

      info.append(name, unit);


      const footer = document.createElement("div");

      footer.classList.add("product-footer");

      const pricing = document.createElement("div");

      pricing.classList.add("product-pricing");

      if (offer) {
        const oldPrice = document.createElement("span");

        oldPrice.classList.add("old-price");

        oldPrice.textContent =
          `${product.price.toLocaleString("fa-IR")} تومان`;

        pricing.append(oldPrice);
      }

      const currentPrice = document.createElement("span");

      currentPrice.classList.add("current-price");

      currentPrice.textContent =
        `${discountedPrice.toLocaleString("fa-IR")} تومان`;

      pricing.append(currentPrice);


      const button = document.createElement("button");

      button.classList.add("add-btn");

      button.type = "button";

      button.setAttribute(
        "aria-label",
        `افزودن ${product.name} به سبد`
      );

      button.textContent = "+";

      button.addEventListener("click", () => {
        addToCart(product, discountedPrice);
      });

      footer.append(pricing, button);


      card.append(thumb, info, footer);

      container.append(card);
    });


    const endAnchor = document.createElement("span");

    endAnchor.id = `products-${categoryId}-end`;
    endAnchor.classList.add("anchor-section");

    container.append(endAnchor);
  } catch (error) {
    renderError(
      container,
      () => renderProducts(categoryId, containerSelector),
      "دریافت محصولات با خطا مواجه شد"
    );
  }
}
renderProducts(1, ".fruitsVegetablesProducts");
renderProducts(2, ".dairyProducts");
renderProducts(3, ".bakeryPastriesProducts");
renderProducts(4, ".staplesGroceriesProducts");
renderProducts(5, ".beveragesProducts");
renderProducts(6, ".meatProteinProducts");
renderProducts(7, ".snacksProducts");

///////////////////////////////
// task 2 -fetch and show products in suggestions + search input placeholder count
// /////////////////////////////////

async function getSuggestions() {
  const [productsResponse, stockResponse, offersResponse] =
    await Promise.all([
      fetch("../../api/products.json"),
      fetch("../../api/stock.json"),
      fetch("../../api/offers.json"),
    ]);

  if (
    !productsResponse.ok ||
    !stockResponse.ok ||
    !offersResponse.ok
  ) {
    throw new Error("Failed to fetch suggestions data");
  }

  const [products, stock, offers] = await Promise.all([
    productsResponse.json(),
    stockResponse.json(),
    offersResponse.json(),
  ]);

  return {
    products,
    stock,
    offers,
  };
}

async function renderSuggestions() {
  const suggestions = document.querySelector(".suggestions");

  if (!suggestions) return;

  renderSkeletons(suggestions);

  try {
    const { products, stock, offers } = await getSuggestions();

    suggestions.replaceChildren();

    const formatNumber = (number) =>
      number.toLocaleString("fa-IR");


    // Search placeholder


    const searchInput =
      document.querySelector(".header__search input");

    if (searchInput) {
      searchInput.placeholder =
        `می‌تونی بین ${formatNumber(products.length)} محصول جستجو کنی`;
    }


    // Carousel start anchor


    const startAnchor = document.createElement("span");

    startAnchor.id = "offers-start";
    startAnchor.classList.add("anchor-section");

    suggestions.append(startAnchor);


    // Products with offers


    const suggestedProducts = products.filter((product) =>
      offers.some((offer) => offer.productId === product.id)
    );

    suggestedProducts.forEach((product) => {
      const offer = offers.find(
        (item) => item.productId === product.id
      );


      // Stock


      const quantity =
        stock.items[String(product.id)] ?? 0;

      const isOutOfStock = quantity <= 0;

  
      // Discounted price
  

      const discountedPrice = Math.round(
        product.price * (1 - offer.percent / 100)
      );

   
      // Card
   

      const card = document.createElement("div");

      card.classList.add("product-card");

      if (isOutOfStock) {
        card.classList.add("product-card--out-of-stock");
      }


      // Badges
   

      const badges = document.createElement("div");

      badges.classList.add("product-badges");

      const discount = document.createElement("span");

      discount.classList.add("badge-discount");
      discount.textContent = `${formatNumber(offer.percent)}٪`;

      badges.append(discount);

      if (product.tags?.length) {
        const tags = document.createElement("div");

        tags.classList.add("product-tags");

        product.tags.forEach((tag) => {
          const tagBadge = document.createElement("span");

          tagBadge.classList.add("badge-offer-label");
          tagBadge.textContent = tag;

          tags.append(tagBadge);
        });

        badges.append(tags);
      }

      card.append(badges);

    
      // Thumbnail
    

      const thumb = document.createElement("div");

      thumb.classList.add("product-thumb");

      const emoji = document.createElement("span");

      emoji.classList.add("product-emoji");
      emoji.textContent = product.emoji;
      emoji.setAttribute("role", "img");
      emoji.setAttribute("aria-label", product.name);

      thumb.append(emoji);


      // Product info


      const info = document.createElement("div");

      info.classList.add("product-info");

      const name = document.createElement("span");

      name.classList.add("product-name");
      name.textContent = product.name;

      const unit = document.createElement("span");

      unit.classList.add("product-unit");
      unit.textContent = product.unit;

      info.append(name, unit);


      // Out-of-stock message
 

      if (isOutOfStock) {
        const stockMessage = document.createElement("span");

        stockMessage.classList.add("stock-message");
        stockMessage.textContent = "ناموجود";

        info.append(stockMessage);
      }


      // Footer


      const footer = document.createElement("div");

      footer.classList.add("product-footer");

      const pricing = document.createElement("div");

      pricing.classList.add("product-pricing");

      // Original price
      const oldPrice = document.createElement("span");

      oldPrice.classList.add("old-price");
      oldPrice.textContent =
        `${formatNumber(product.price)} تومان`;

      pricing.append(oldPrice);

      // Current price
      const currentPrice = document.createElement("span");

      currentPrice.classList.add("current-price");
      currentPrice.textContent =
        `${formatNumber(discountedPrice)} تومان`;

      pricing.append(currentPrice);

    
      // Add button


      const button = document.createElement("button");

      button.classList.add("add-btn");
      button.type = "button";

      button.setAttribute(
        "aria-label",
        `افزودن ${product.name} به سبد`
      );

      button.textContent = "+";
      button.disabled = isOutOfStock;

      button.addEventListener("click", () => {
        addToCart(product, discountedPrice);
      });

      footer.append(pricing, button);

  
      // Assemble card
 

      card.append(
        thumb,
        info,
        footer
      );

      suggestions.append(card);
    });

    
    // Carousel end anchor

    const endAnchor = document.createElement("span");

    endAnchor.id = "offers-end";
    endAnchor.classList.add("anchor-section");

    suggestions.append(endAnchor);
  } catch (error) {
    console.error("Error loading suggestions:", error);

    renderError(
      suggestions,
      renderSuggestions,
      "دریافت محصولات با خطا مواجه شد"
    );
  }
}

renderSuggestions();



///////////////////////////////////////////
// task 3-fetch data from categories and show in homepage-navBar-footer  && footer and header info
///////////////////////////////////////////////

async function getCategories() {
  const response = await fetch("../../api/categories.json");

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}
async function renderCategories() {
  const categoriesGrid = document.querySelector("#categories-grid");
  renderCategorySkeletons(categoriesGrid);

  try {
    const categories = await getCategories();

    const fragment = document.createDocumentFragment();

    categories.forEach((category) => {
      const card = document.createElement("a");

      card.classList.add("category-card");
      card.href = `#${category.slug}`;

      const image = document.createElement("span");

      image.classList.add("category-card__image");
      image.textContent = category.emoji;
      image.style.backgroundColor = category.color;

      const title = document.createElement("span");

      title.classList.add("category-card__title");
      title.textContent = category.name;

      card.append(image, title);

      fragment.append(card);
    });

    categoriesGrid.replaceChildren(fragment);
   } catch (error) {
  renderError(
    categoriesGrid,
    renderCategories,
    "دریافت دسته‌بندی‌ها با خطا مواجه شد"
  );
  }
}
renderCategories()

// footer navbar and header info

async function getShop() {
  const [shopResponse, categoriesResponse] = await Promise.all([
    fetch("../../api/shop.json"),
    fetch("../../api/categories.json"),
  ]);

  if (!shopResponse.ok) {
    throw new Error("Failed to fetch shop data");
  }

  if (!categoriesResponse.ok) {
    throw new Error("Failed to fetch categories data");
  }

  const [shop, categories] = await Promise.all([
    shopResponse.json(),
    categoriesResponse.json(),
  ]);

  return { shop, categories };
}
async function renderShop() {
  try {
    const { shop, categories } = await getShop();

    // =========================
    // Header brand
    // =========================

    const headerBrand = document.querySelector("#shop-header-brand");

    if (headerBrand) {
      headerBrand.replaceChildren();

      if (shop.name) {
        const heading = document.createElement("h1");
        heading.id = "shop-header-name";
        heading.textContent = shop.name;

        headerBrand.append(heading);
      }

      if (shop.slogan) {
        const slogan = document.createElement("small");
        slogan.id = "shop-header-slogan";
        slogan.textContent = shop.slogan;

        headerBrand.append(slogan);
      }
    }

    // =========================
    // Shop information
    // =========================

    document.querySelector("#shop-name").textContent = shop.name;
    document.querySelector("#shop-about").textContent = shop.about;
    document.querySelector("#shop-address").textContent = shop.address;
    document.querySelector("#shop-phone").textContent = shop.phone;

    // =========================
    // Navbar categories
    // =========================

    const navbarCategories =
      document.querySelector("#navbar-categories");

    const navbarCategoriesFragment =
      document.createDocumentFragment();

    categories.forEach((category) => {
      const li = document.createElement("li");
      const link = document.createElement("a");

      link.classList.add("dropdown-item");
      link.href = `#${category.slug}`;

      const emoji = document.createElement("span");

      emoji.classList.add("emoji");
      emoji.textContent = category.emoji;
      emoji.setAttribute("aria-hidden", "true");

      link.append(emoji, category.name);
      li.append(link);
      navbarCategoriesFragment.append(li);
    });

    navbarCategories.replaceChildren(navbarCategoriesFragment);

    // =========================
    // Navbar menu
    // =========================

    const navbarList = document.querySelector("#navbar-list");

    navbarList
      .querySelectorAll(".navbar-menu-item")
      .forEach((item) => item.remove());

    const navbarMenuFragment =
      document.createDocumentFragment();

    shop.menu.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("navbar-menu-item");

      const link = document.createElement("a");

      link.classList.add("nav-link");
      link.href = item.href;
      link.textContent = item.label;

      li.append(link);
      navbarMenuFragment.append(li);
    });

    navbarList.append(navbarMenuFragment);

    // =========================
    // Footer categories
    // =========================

    const footerCategories =
      document.querySelector("#footer-categories");

    const categoriesFragment =
      document.createDocumentFragment();

    categories.forEach((category) => {
      const li = document.createElement("li");
      const link = document.createElement("a");

      link.href = `#${category.slug}`;
      link.textContent = category.name;

      li.append(link);
      categoriesFragment.append(li);
    });

    footerCategories.replaceChildren(categoriesFragment);

    // =========================
    // Footer help
    // =========================

    const helpList = document.querySelector("#footer-help");

    const helpFragment = document.createDocumentFragment();

    shop.help.forEach((item) => {
      const li = document.createElement("li");
      const link = document.createElement("a");

      link.href = item.href;
      link.textContent = item.label;

      li.append(link);
      helpFragment.append(li);
    });

    helpList.replaceChildren(helpFragment);

    // =========================
    // Shop schedule
    // =========================

    const schedule = document.querySelector("#shop-schedule");

    const scheduleFragment =
      document.createDocumentFragment();

    shop.schedule.forEach((item) => {
      const p = document.createElement("p");
      const strong = document.createElement("strong");
      const time = document.createElement("span");

      strong.textContent = `${item.days}:`;
      time.textContent = item.time;

      p.append(strong, " ", time);
      scheduleFragment.append(p);
    });

    schedule.replaceChildren(scheduleFragment);

    // =========================
    // Copyright
    // =========================

    document.querySelector("#shop-copyright").textContent =
      shop.copyright;
  } catch (error) {
    renderError(
      document.querySelector("#footer"),
      renderShop,
      "بارگذاری اطلاعات فروشگاه ناموفق بود"
    );
  }
}

renderShop();

/////////////////////////////////////////////////////
// fetch from home.json create banners and promos && add button+Cart and localSorage
///////////////////////////////////////////////////////
async function getHome() {
  const response = await fetch("../../api/home.json");

  if (!response.ok) {
    throw new Error("Failed to fetch home data");
  }

  return response.json();
}
async function renderHome() {
  renderBannerSkeleton();
  renderPromoSkeletons();

  try {
    const home = await getHome();

    const banner = document.querySelector("#banner");

    const bannerTrack =
      banner.querySelector(".banner__track");

    const slides = [home.hero, home.side];

    const createSlide = (slide, isDuplicate = false) => {
      const link = document.createElement("a");

      link.classList.add("banner__slide");
      link.href = slide.cta.href;

      if (isDuplicate) {
        link.setAttribute("aria-hidden", "true");
      }

      const emoji = document.createElement("span");

      emoji.classList.add("banner__slide-emoji");
      emoji.textContent = slide.emoji;
      emoji.setAttribute("aria-hidden", "true");

      const content = document.createElement("div");

      content.classList.add("banner__slide-content");

      const title = document.createElement("h2");

      title.classList.add("banner__slide-title");
      title.textContent = slide.title;

      const text = document.createElement("p");

      text.classList.add("banner__slide-text");
      text.textContent = slide.text;

      const cta = document.createElement("span");

      cta.classList.add("banner__slide-cta");
      cta.textContent = slide.cta.label;

      content.append(title, text, cta);
      link.append(emoji, content);

      return link;
    };

    const bannerFragment =
      document.createDocumentFragment();

    // Original slides
    slides.forEach((slide) => {
      bannerFragment.append(createSlide(slide));
    });

    // Duplicate slides
    slides.forEach((slide) => {
      bannerFragment.append(createSlide(slide, true));
    });

    bannerTrack.replaceChildren(bannerFragment);



    home.promos.forEach((promo, index) => {
      const advertisement = document.querySelector(
        `#advertisement-${index + 1}`
      );

      if (!advertisement) {
        return;
      }

      const link = document.createElement("a");

      link.href = promo.href;
      link.style.backgroundColor = promo.color;

      const emoji = document.createElement("span");

      emoji.classList.add("advertisement__emoji");
      emoji.textContent = promo.emoji;
      emoji.setAttribute("aria-hidden", "true");

      const text = document.createElement("span");

      text.classList.add("advertisement__text");
      text.textContent = promo.text;

      link.append(emoji, text);

      advertisement.replaceChildren(link);
    });
  } catch (error) {
    renderError(
      document.querySelector("#banner"),
      renderHome,
      "بارگذاری اطلاعات صفحه اصلی ناموفق بود"
    );
  }
}
renderHome();

// Cart + localStorage

const CART_KEY = "yagni-cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartUI() {
  const cart = getCart();

  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const total = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const cartCount =
    document.querySelector(".header__cart-count");

  const cartTotal =
    document.querySelector(".header__cart-content strong");

  if (cartCount) {
    cartCount.textContent = count.toLocaleString("fa-IR");
  }

  if (cartTotal) {
    cartTotal.textContent =
      `${total.toLocaleString("fa-IR")} تومان`;
  }
}

function addToCart(product, price) {
  const cart = getCart();

  const existingItem = cart.find(
    (item) => item.productId === product.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price,
      quantity: 1,
    });
  }

  saveCart(cart);
  updateCartUI();
}