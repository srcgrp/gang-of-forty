import type { Home } from "../types/shop.ts";

export function fillPromos(home: Home): void {
  const box = document.querySelector<HTMLElement>("#promos");
  if (!box) throw new Error("index.html is missing an element");

  for (const item of home.promos) {
    const a: HTMLAnchorElement = document.createElement("a");
    a.className = "strip";
    a.href = item.href;
    a.style.backgroundColor = item.color;

    const text: HTMLSpanElement = document.createElement("span");
    text.textContent = item.text;

    const emoji: HTMLSpanElement = document.createElement("span");
    emoji.className = "strip-emoji";
    emoji.textContent = item.emoji;

    a.appendChild(text);
    a.appendChild(emoji);
    box.appendChild(a);
  }
}
