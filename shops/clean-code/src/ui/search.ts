export function filterProducts(q: string): void {
  const items = document.querySelectorAll<HTMLLIElement>(
    "#featured li, #carousels li",
  );
  for (const li of items) {
    li.hidden = !li.textContent.includes(q);
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
    section.hidden = visible === 0;
  }
}
