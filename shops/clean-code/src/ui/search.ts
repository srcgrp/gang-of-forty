export function visibleProducts(q: string, category: string): void {
  const hero = document.querySelector<HTMLElement>("#hero");
  const cats = document.querySelector<HTMLElement>("#categories");
  const promos = document.querySelector<HTMLElement>("#promos");
  if (!hero || !cats || !promos)
    throw new Error("index.html is missing an element");
  const searching = q !== "";
  hero.hidden = searching;
  cats.hidden = searching;
  promos.hidden = searching;

  const titles = document.querySelectorAll<HTMLElement>(
    "#featured h2, #carousels h2",
  );
  for (const title of titles) {
    title.hidden = false;
  }
  const navs = document.querySelectorAll<HTMLElement>(
    "#featured .row-nav, #carousels .row-nav",
  );
  for (const nav of navs) {
    nav.hidden = searching;
  }

  const items = document.querySelectorAll<HTMLLIElement>(
    "#featured li, #carousels li",
  );
  for (const li of items) {
    const name = li.querySelector("h3");
    const text = name ? name.textContent : "";
    li.hidden = !text.includes(q);
  }

  const sections = document.querySelectorAll<HTMLElement>(
    "#featured section, #carousels section",
  );
  for (const section of sections) {
    const list = section.querySelector<HTMLUListElement>(".row");
    if (!list) throw new Error("index.html is missing an element");

    let visible = 0;
    for (const li of list.children) {
      if (li instanceof HTMLElement && !li.hidden) {
        visible = visible + 1;
      }
    }
    if (category && section.id !== category) {
      section.hidden = true;
      continue;
    }
    section.hidden = visible === 0;
  }
}
