import type { MakeItem, Product } from "../types/product.ts";

export function addCards(
  row: HTMLUListElement,
  products: Product[],
  makeItem: MakeItem,
  startId: string,
  endId: string,
): void {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (!product) continue;
    const li = makeItem(product);
    if (i === 0) {
      li.id = startId;
    }
    if (i === products.length - 1) {
      li.id = endId;
    }
    row.appendChild(li);
  }
}

export function makeCarousel(
  id: string,
  title: string,
): { section: HTMLElement; row: HTMLUListElement } {
  const section: HTMLElement = document.createElement("section");
  section.id = id;

  const h2: HTMLHeadingElement = document.createElement("h2");
  h2.textContent = title;
  section.appendChild(h2);

  const nav: HTMLDivElement = document.createElement("div");
  nav.className = "row-nav";
  const start: HTMLAnchorElement = document.createElement("a");
  start.href = "#" + id + "-start";
  start.textContent = "اولین محصول";
  const end: HTMLAnchorElement = document.createElement("a");
  end.href = "#" + id + "-end";
  end.textContent = "آخرین محصول";
  nav.appendChild(start);
  nav.appendChild(end);
  section.appendChild(nav);

  const row: HTMLUListElement = document.createElement("ul");
  row.className = "row";
  row.setAttribute("tabindex", "0");
  section.appendChild(row);

  return { section, row };
}
