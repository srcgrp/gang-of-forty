import type { Home } from "../types/shop.ts";

type Spot = {
  title: string;
  text: string;
  emoji: string;
  cta: { label: string; href: string };
};

function addPromo(
  box: HTMLElement,
  spot: Spot,
  className: string,
  level: "h2" | "h3",
  buttonClass: string,
  emojiFirst: boolean,
): void {
  const article: HTMLElement = document.createElement("article");
  article.className = className;

  const title: HTMLHeadingElement = document.createElement(level);
  title.textContent = spot.title;

  const text: HTMLParagraphElement = document.createElement("p");
  text.textContent = spot.text;

  const button: HTMLAnchorElement = document.createElement("a");
  button.className = buttonClass;
  button.href = spot.cta.href;
  button.textContent = spot.cta.label;

  const emoji: HTMLSpanElement = document.createElement("span");
  emoji.className = "hero-emoji";
  emoji.textContent = spot.emoji;

  article.appendChild(title);
  article.appendChild(text);
  if (emojiFirst) article.appendChild(emoji);
  article.appendChild(button);
  if (!emojiFirst) article.appendChild(emoji);
  box.appendChild(article);
}

export function fillHero(home: Home): void {
  const box = document.querySelector<HTMLElement>("#hero");
  if (!box) throw new Error("index.html is missing an element");

  addPromo(box, home.hero, "promo fruit", "h2", "pill gold", false);
  addPromo(box, home.side, "promo dairy-off", "h3", "pill", true);
}
