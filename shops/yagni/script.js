// update Cart on loading page
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
});
// task 1- fetch and show  products
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
async function renderProducts(categoryId, containerSelector) {
  const container = document.querySelector(containerSelector);

  if (!container) return;

  renderSkeletons(container);

  try {
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

    const filteredProducts = products.filter(
      (product) => product.categoryId === categoryId
    );

    container.replaceChildren();

    filteredProducts.forEach((product) => {
      // Find product offer, if available
      const offer = offers.find(
        (item) => item.productId === product.id
      );

      // Calculate discounted price
      const discountedPrice = offer
        ? Math.round(product.price * (1 - offer.percent / 100))
        : product.price;

   

      // Card
      const card = document.createElement("div");
      card.classList.add("product-card");

  // Badges
const badges = document.createElement("div");
badges.classList.add("product-badges");

if (offer) {
  const discount = document.createElement("span");
  discount.classList.add("badge-discount");
  discount.textContent = `${offer.percent.toLocaleString("fa-IR")}٪`;

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

      // Footer
      const footer = document.createElement("div");
      footer.classList.add("product-footer");

      const pricing = document.createElement("div");
      pricing.classList.add("product-pricing");

      // Show original price only when discounted
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

      // Assemble card
      card.append(thumb, info, footer);
      container.append(card);
    });
  } catch (error){
    renderError(container,renderProducts)
  }
}

renderProducts(1, ".fruitsVegetablesProducts");
renderProducts(2, ".dairyProducts");
renderProducts(3, ".bakeryPastriesProducts");
renderProducts(4, ".staplesGroceriesProducts");
renderProducts(5, ".beveragesProducts");
renderProducts(6, ".meatProteinProducts");
renderProducts(7, ".snacksProducts");


//task 2 -fetch and show in suggestions


async function getSuggestions() {
    const suggestions = document.querySelector(".suggestions");

  if (!suggestions) return;

  // Show skeletons while data is loading
  renderSkeletons(suggestions);

  try {
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

    renderSuggestions(products, stock, offers);
  }catch (error){
     renderError(suggestions,getSuggestions);
  }
}



function renderSuggestions(products, stock, offers) {
  const suggestions = document.querySelector(".suggestions");

  if (!suggestions) return;

  suggestions.replaceChildren();

  const formatNumber = (number) =>
    number.toLocaleString("fa-IR");

  // =========================
  // Search placeholder
  // =========================

  const searchInput =
    document.querySelector(".header__search input");

  if (searchInput) {
    searchInput.placeholder =
      `می‌تونی بین ${formatNumber(products.length)} محصول جستجو کنی`;
  }

  // =========================
  // Products
  // =========================

  products.forEach((product) => {
    // ... your existing code
  });
}

getSuggestions();

//task 3-fetch data from categories.json

const categoriesGrid = document.querySelector("#categories-grid");

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

function renderError(container,retryFunction) {
  const errorMessage = document.createElement("div");
  errorMessage.classList.add("product-error");

  const icon = document.createElement("span");
  icon.classList.add("product-error__icon");
  icon.textContent = "⚠️";
  icon.setAttribute("aria-hidden", "true");

  const message = document.createElement("p");
  message.classList.add("product-error__message");
  message.textContent = "بارگذاری دسته‌بندی‌ها ناموفق بود";

  const retryButton = document.createElement("button");
  retryButton.classList.add("product-error__retry");
  retryButton.type = "button";
  retryButton.textContent = "تلاش مجدد";

  retryButton.addEventListener("click",retryFunction );

  errorMessage.append(icon, message, retryButton);

  container.replaceChildren(errorMessage);
}

async function fetchCategories() {
  renderCategorySkeletons(categoriesGrid);

  try {
    const response = await fetch("../../api/categories.json");

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categories = await response.json();

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
    console.error("Error loading categories:", error);

    renderError(categoriesGrid,fetchCategories);
  }
}


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



async function fetchShop() {
  try {
    // =========================
    // Fetch shop and categories
    // =========================

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

    const shop = await shopResponse.json();
    const categories = await categoriesResponse.json();

    // =========================
    // Header information
    // =========================

    document.querySelector("#shop-header-name").textContent = shop.name;

    document.querySelector("#shop-header-slogan").textContent =
      shop.slogan;

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

    const navbarList =
      document.querySelector("#navbar-list");

    // Remove previously generated menu items
    const oldNavbarItems =
      navbarList.querySelectorAll(".navbar-menu-item");

    oldNavbarItems.forEach((item) => {
      item.remove();
    });

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
    // Help
    // =========================

    const helpList =
      document.querySelector("#footer-help");

    const helpFragment =
      document.createDocumentFragment();

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
    // Working hours
    // =========================

    const schedule =
      document.querySelector("#shop-schedule");

    const scheduleFragment =
      document.createDocumentFragment();

    shop.schedule.forEach((item) => {
      const p = document.createElement("p");

      const strong = document.createElement("strong");
      strong.textContent = `${item.days}:`;

      const time = document.createElement("span");
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
    console.error("Error loading shop data:", error);

    renderError(
      document.querySelector("#footer"),
      fetchShop,
      "بارگذاری اطلاعات فروشگاه ناموفق بود"
    );
  }
}



fetchShop();

fetchCategories();


// fetch from home.json
async function fetchHome() {
  try {
    const response = await fetch("../../api/home.json");

    if (!response.ok) {
      throw new Error("Failed to fetch home data");
    }

    const home = await response.json();

    // =========================
    // Hero / Banner
    // =========================

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

    // =========================
    // Promos
    // =========================

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
    console.error("Error loading home data:", error);
  }
}
fetchHome();


// Cart
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