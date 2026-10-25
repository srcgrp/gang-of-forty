
import type { Product, Offer, Stock } from "./types";
import { productImages } from "./data";

const priceFormatter = new Intl.NumberFormat("fa-IR");

function createProductMedia(product: Product) {
  const imagePath = productImages[product.id];

  if (imagePath) {
    const image = document.createElement("img");
    image.src = imagePath;
    image.alt = product.name;
    image.classList.add("product-image");
    image.loading = "lazy";
    return image;
  }

  const emoji = document.createElement("div");
  emoji.classList.add("product-emoji");
  emoji.textContent = product.emoji ?? "";
  emoji.setAttribute("aria-hidden", "true");
  return emoji;
}

function createProductCard(
  product: Product,
  offersMap: Map<number, Offer>,
  stock: Stock
) {
  const offer = offersMap.get(product.id);
  const quantity = stock.items[product.id] ?? 0;
  const isAvailable = quantity > 0;

  const card = document.createElement("article");
  card.classList.add("product-card");
  card.dataset.apiProduct = String(product.id);

  if (offer) {
    card.classList.add("product-card-discount");

    const badge = document.createElement("span");
    badge.classList.add("discount-badge");
    badge.textContent = `${priceFormatter.format(offer.percent)}٪`;
    badge.title = offer.label;
    card.append(badge);
  }

  if (!isAvailable) {
    card.classList.add("product-card-unavailable");

    const badge = document.createElement("span");
    badge.classList.add("unavailable-badge");
    badge.textContent = "ناموجود";
    card.append(badge);
  }

  const media = createProductMedia(product);

  const name = document.createElement("h3");
  name.textContent = product.name;

  const unit = document.createElement("p");
  unit.classList.add("product-meta");
  unit.textContent = product.unit;

  const priceBox = document.createElement("div");
  priceBox.classList.add("price-box");

  const price = document.createElement("p");
  price.classList.add("product-price");

  if (offer) {
    const oldPrice = document.createElement("p");
    oldPrice.classList.add("old-price");
    oldPrice.textContent = `${priceFormatter.format(product.price)} تومان`;

    const discountedPrice = Math.round(
      product.price * (1 - offer.percent / 100)
    );

    price.textContent = `${priceFormatter.format(discountedPrice)} تومان`;
    priceBox.append(oldPrice, price);
  } else {
    price.textContent = `${priceFormatter.format(product.price)} تومان`;
    priceBox.append(price);
  }

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = isAvailable ? "افزودن به سبد" : "ناموجود";
  button.disabled = !isAvailable;

  card.append(media, name, unit, priceBox, button);

  return card;
}

export function renderProductCarousel(
  container: HTMLElement,
  products: Product[],
  offersMap: Map<number, Offer>,
  stock: Stock
) {
  const cards = products.map((product) => {
    return createProductCard(product, offersMap, stock);
  });

  container.replaceChildren(...cards);
  container.setAttribute("aria-busy", "false");
}

export function createProductSkeletons(count: number): HTMLElement {
  const track = document.createElement("div");
  track.className = "product-track";
  track.setAttribute("aria-busy", "true");
  track.setAttribute("aria-label", "در حال بارگذاری محصولات");

  for (let index = 0; index < count; index++) {
    const card = document.createElement("article");
    card.className = "product-card product-card-skeleton";
    card.setAttribute("aria-hidden", "true");

    const image = document.createElement("div");
    image.className = "skeleton-image";

    const title = document.createElement("div");
    title.className = "skeleton-line skeleton-title";

    const unit = document.createElement("div");
    unit.className = "skeleton-line skeleton-unit";

    const price = document.createElement("div");
    price.className = "skeleton-line skeleton-price";

    const button = document.createElement("div");
    button.className = "skeleton-button";

    card.append(image, title, unit, price, button);
    track.append(card);
  }

  return track;
}