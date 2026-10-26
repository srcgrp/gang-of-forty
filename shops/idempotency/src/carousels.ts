import type {
  Product,
  Offer,
  Stock,
  HomeCarousel,
  Category
} from "./types";

import { renderProductCarousel } from "./products";

function getCarouselProducts(
  carousel: HomeCarousel,
  products: Product[],
  offersMap: Map<number, Offer>
): Product[] {
  if (carousel.source === "offers") {
    return products.filter((product) => offersMap.has(product.id));
  }

  if (carousel.categoryId != null) {
    return products.filter(
      (product) => product.categoryId === carousel.categoryId
    );
  }

  return [];
}

function setupCarouselControls(
  container: HTMLElement,
  startButton: HTMLButtonElement,
  endButton: HTMLButtonElement
) {
  startButton.addEventListener("click", () => {
    container.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  });

  endButton.addEventListener("click", () => {
    container.scrollTo({
      left: -container.scrollWidth,
      behavior: "smooth",
    });
  });
}

function createHomeCarousel(
  carousel: HomeCarousel,
  products: Product[],
  offersMap: Map<number, Offer>,
  stock: Stock
): HTMLElement {
  const section = document.createElement("section");
  section.className = "product-section home-carousel-section";
  section.id = carousel.id;
  section.setAttribute("aria-labelledby", `carousel-title-${carousel.id}`);

  const title = document.createElement("h2");
  title.id = `carousel-title-${carousel.id}`;
  title.textContent = carousel.title;

  const track = document.createElement("div");
  track.className = "product-track";
  track.tabIndex = 0;
  track.setAttribute("aria-label", `محصولات ${carousel.title}`);

  const carouselProducts = getCarouselProducts(
    carousel,
    products,
    offersMap
  );

  renderProductCarousel(track, carouselProducts, offersMap, stock);

  const controls = document.createElement("div");
  controls.className = "carousel-controls";

  const startButton = document.createElement("button");
  startButton.type = "button";
  startButton.className = "carousel-arrow carousel-arrow-start";
  startButton.textContent = "→";
  startButton.setAttribute("aria-label", `رفتن به ابتدای ${carousel.title}`);

  const endButton = document.createElement("button");
  endButton.type = "button";
  endButton.className = "carousel-arrow carousel-arrow-end";
  endButton.textContent = "←";
  endButton.setAttribute("aria-label", `رفتن به انتهای ${carousel.title}`);

  controls.append(startButton, endButton);
  section.append(title, track, controls);

  setupCarouselControls(track, startButton, endButton);

  return section;
}

export function renderHomeCarousels(
  carousels: HomeCarousel[],
  categories: Category[],
  products: Product[],
  offersMap: Map<number, Offer>,
  stock: Stock
) {
  const featuredContainer = document.querySelector(
    "#home-featured-carousels"
  );

  const categoryContainer = document.querySelector(
    "#home-category-carousels"
  );

  if (!featuredContainer || !categoryContainer) {
    throw new Error("Home carousel containers are missing from the DOM.");
  }

  const featured = carousels.filter(
    (item) => item.source === "offers"
  );

const configuredCategories = carousels.filter(
  (item) => item.source !== "offers"
);

const configuredCategoryIds = new Set(
  configuredCategories
    .map((item) => item.categoryId)
    .filter((id) => id != null)
);

const otherCategories: HomeCarousel[] = categories
  .filter((category) => !configuredCategoryIds.has(category.id))
  .map((category) => ({
    id: category.slug,
    title: category.name,
    categoryId: category.id,
  }));

const categoryCarousels = [
  ...configuredCategories,
  ...otherCategories,
];

  const featuredSections = featured.map((item) =>
    createHomeCarousel(item, products, offersMap, stock)
  );

  const categorySections = categoryCarousels.map((item) =>
    createHomeCarousel(item, products, offersMap, stock)
  );

  featuredContainer.replaceChildren(...featuredSections);
  categoryContainer.replaceChildren(...categorySections);
}
