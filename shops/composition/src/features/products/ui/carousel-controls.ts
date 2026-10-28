import { createElement, createLink } from "../../../shared/ui/elements";
export function createCarouselControls(title: string): HTMLElement {
  const controls = createElement("div", "carousel-controls", "");
  controls.setAttribute("role", "group");
  controls.setAttribute("aria-label", "کنترل " + title);
  return controls;
}
export function fillCarouselControls(controls: HTMLElement, list: HTMLElement, title: string): void {
  const first = list.firstElementChild;
  const last = list.lastElementChild;
  if (!first || !last) { controls.hidden = true; return; }
  const start = createLink("ابتدا", "#" + first.id, "");
  start.setAttribute("aria-label", "ابتدای " + title);
  const end = createLink("انتها", "#" + last.id, "");
  end.setAttribute("aria-label", "انتهای " + title);
  controls.append(start, end);
}
