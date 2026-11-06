import type { CatalogItem, CategorySection, LoadState } from "../types";
import { resetCarousel } from "./arrows";
import { createCategorySection } from "./section";
import { renderState } from "./state";

type MakeCard = (item: CatalogItem) => HTMLElement;
type State = LoadState<CatalogItem>;

export function renderSpecials(state: State, makeCard: MakeCard, retry: () => void): void {
  const track = document.querySelector<HTMLElement>(".special-offer .carousel");
  if (!track) return;

  renderState(track, state, {
    skeletons: 5,
    emptyText: "فعلاً پیشنهاد ویژه‌ای نداریم.",
    errorTitle: "بارگذاری پیشنهادها انجام نشد.",
    retry,
    build: (items) => items.map((item) => makeCard(item)),
  });
  resetCarousel(track);
}

export function renderCategories(
  state: State,
  sections: CategorySection[],
  makeCard: MakeCard,
  retry: () => void
): void {
  const container = document.querySelector<HTMLElement>("#category-carousels");
  if (!container) return;

  renderState(container, state, {
    skeletons: 0,
    emptyText: "فعلاً کالایی برای نمایش نداریم.",
    errorTitle: "بارگذاری دسته‌بندی‌ها انجام نشد.",
    retry,
    build: () => sections.map((section) => createCategorySection(section, makeCard)),
  });
  container
    .querySelectorAll<HTMLElement>(".carousel")
    .forEach((track) => resetCarousel(track));
}
