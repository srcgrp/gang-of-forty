import type { CardView } from "../types";
import { el } from "./dom";
import { PLUS_ICON } from "./icons";

type OnAdd = (button: HTMLButtonElement) => void;

function createMedia(view: CardView, onAdd: OnAdd): HTMLElement {
  const media = el("div", "offer-media");
  if (view.color) media.style.setProperty("--media-bg", view.color);

  const addBtn = el("button", "offer-add");
  addBtn.type = "button";
  addBtn.innerHTML = PLUS_ICON;
  addBtn.disabled = view.disabled;
  addBtn.setAttribute("aria-label", view.addLabel);
  addBtn.addEventListener("click", () => onAdd(addBtn));

  const emoji = el("span", "offer-emoji", view.emoji);
  emoji.setAttribute("aria-hidden", "true");
  media.append(emoji, addBtn);

  if (view.tag) media.append(el("span", "offer-tag", view.tag));
  if (view.badge) media.append(el("span", "offer-badge", view.badge));
  return media;
}

function createBody(view: CardView): HTMLElement {
  const body = el("div", "offer-body");
  body.append(el("h3", "offer-name", view.name), el("p", "offer-unit", view.unit));
  if (view.stockText) body.append(el("p", "offer-stock", view.stockText));

  const prices = el("div", "offer-prices");
  const price = el("span", "offer-price", view.price);
  price.append(el("small", null, view.currency));
  prices.append(price);
  if (view.oldPrice) prices.append(el("del", "offer-old-price", view.oldPrice));
  body.append(prices);
  return body;
}

export function createCard(view: CardView, onAdd: OnAdd): HTMLElement {
  const card = el("article", "offer-card" + (view.soldOut ? " is-sold-out" : ""));
  card.append(createMedia(view, onAdd), createBody(view));
  return card;
}
