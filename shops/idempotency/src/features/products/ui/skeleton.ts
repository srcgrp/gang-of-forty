export function createProductSkeletons(
  count: number,
): HTMLElement {
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