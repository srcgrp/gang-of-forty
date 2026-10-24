import type { Home } from "../types/shop.ts";

export function fillHero(home: Home): void {
  const box = document.querySelector<HTMLElement>("#hero");
  if (!box) throw new Error("index.html is missing an element");

  const fruit: HTMLElement = document.createElement("article");
  fruit.className = "promo fruit";
  const fruitTitle: HTMLHeadingElement = document.createElement("h2");
  fruitTitle.textContent = home.hero.title;
  const fruitText: HTMLParagraphElement = document.createElement("p");
  fruitText.textContent = home.hero.text;
  const fruitBtn: HTMLAnchorElement = document.createElement("a");
  fruitBtn.className = "pill gold";
  fruitBtn.href = home.hero.cta.href;
  fruitBtn.textContent = home.hero.cta.label;
  const fruitEmoji: HTMLSpanElement = document.createElement("span");
  fruitEmoji.className = "hero-emoji";
  fruitEmoji.textContent = home.hero.emoji;
  fruit.appendChild(fruitTitle);
  fruit.appendChild(fruitText);
  fruit.appendChild(fruitBtn);
  fruit.appendChild(fruitEmoji);

  const side: HTMLElement = document.createElement("article");
  side.className = "promo dairy-off";
  const sideTitle: HTMLHeadingElement = document.createElement("h3");
  sideTitle.textContent = home.side.title;
  const sideText: HTMLParagraphElement = document.createElement("p");
  sideText.textContent = home.side.text;
  const sideEmoji: HTMLSpanElement = document.createElement("span");
  sideEmoji.className = "hero-emoji";
  sideEmoji.textContent = home.side.emoji;
  const sideBtn: HTMLAnchorElement = document.createElement("a");
  sideBtn.className = "pill";
  sideBtn.href = home.side.cta.href;
  sideBtn.textContent = home.side.cta.label;
  side.appendChild(sideTitle);
  side.appendChild(sideText);
  side.appendChild(sideEmoji);
  side.appendChild(sideBtn);

  box.appendChild(fruit);
  box.appendChild(side);
}
