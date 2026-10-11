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

      footer.append(pricing, button);

      // Assemble card
      card.append(thumb, info, footer);
      container.append(card);
    });
  } catch (error) {
    console.error("Error loading products:", error);

    container.replaceChildren();

    const errorMessage = document.createElement("div");
    errorMessage.classList.add("product-error");

    const icon = document.createElement("span");
    icon.classList.add("product-error__icon");
    icon.textContent = "⚠️";
    icon.setAttribute("aria-hidden", "true");

    const message = document.createElement("p");
    message.classList.add("product-error__message");
    message.textContent = "بارگذاری محصولات ناموفق بود";

    const retryButton = document.createElement("button");
    retryButton.classList.add("product-error__retry");
    retryButton.type = "button";
    retryButton.textContent = "تلاش مجدد";

    retryButton.addEventListener("click", () => {
      renderProducts(categoryId, containerSelector);
    });

    errorMessage.append(icon, message, retryButton);
    container.append(errorMessage);
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
  } catch (error) {
    console.error("Error loading products:", error);

    suggestions.replaceChildren();

    const errorMessage = document.createElement("div");
    errorMessage.classList.add("product-error");

    const icon = document.createElement("span");
    icon.classList.add("product-error__icon");
    icon.textContent = "⚠️";
    icon.setAttribute("aria-hidden", "true");

    const message = document.createElement("p");
    message.classList.add("product-error__message");
    message.textContent = "بارگذاری محصولات ناموفق بود";

    const retryButton = document.createElement("button");
    retryButton.classList.add("product-error__retry");
    retryButton.type = "button";
    retryButton.textContent = "تلاش مجدد";

    retryButton.addEventListener("click", () => {
      getSuggestions();
    });

    errorMessage.append(icon, message, retryButton);
    suggestions.append(errorMessage);
  }
}



function renderSuggestions(products, stock, offers) {
  const suggestions = document.querySelector(".suggestions");

  if (!suggestions) return;

  suggestions.replaceChildren();

  const formatNumber = (number) => number.toLocaleString("fa-IR");

  products.forEach((product) => {
   
    const offer = offers.find(
      (item) => item.productId === product.id
    );

   
    if (!offer) return;

    // Stock
    const quantity = stock.items[String(product.id)] ?? 0;
    const isOutOfStock = quantity <= 0;

    // Calculate discounted price
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

    // Discount
    if (offer) {
      const discount = document.createElement("span");
      discount.classList.add("badge-discount");
      discount.textContent = `${formatNumber(offer.percent)}٪`;

      badges.append(discount);
    }

    // Product tags
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

    // Always append badges to reserve its height
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
    if (offer) {
      const oldPrice = document.createElement("span");
      oldPrice.classList.add("old-price");
      oldPrice.textContent = `${formatNumber(product.price)} تومان`;

      pricing.append(oldPrice);
    }

    // Current price
    const currentPrice = document.createElement("span");
    currentPrice.classList.add("current-price");
    currentPrice.textContent = `${formatNumber(discountedPrice)} تومان`;

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

    footer.append(pricing, button);

    // Assemble card
    card.append(thumb, info, footer);

    suggestions.append(card);
  });
}

getSuggestions();
