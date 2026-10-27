import type { CarouselView } from "../../types/catalog";
import { renderProductCarousel } from "../products/render";
import { createCarouselControls } from "./controls";

export function createHomeCarousel(
  view: CarouselView,
): HTMLElement {
  const section = document.createElement("section");
  section.className = "product-section home-carousel-section";
  section.id = view.id;
  section.setAttribute(
    "aria-labelledby",
    `carousel-title-${view.id}`,
  );

  const title = document.createElement("h2");
  title.id = `carousel-title-${view.id}`;
  title.textContent = view.title;

  const track = document.createElement("div");
  track.className = "product-track";
  track.tabIndex = 0;
  track.setAttribute(
    "aria-label",
    `محصولات ${view.title}`,
  );

  renderProductCarousel(track, view.cards);

  section.append(
    title,
    track,
    createCarouselControls(track, view.title),
  );

  return section;
}