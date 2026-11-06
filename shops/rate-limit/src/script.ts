import type {
  CartAddDetail,
  CartLine,
  Catalog,
  CatalogItem,
  Category,
  Offer,
  Product,
  Sort,
  SortComparators,
  Stock,
} from "./types";

const API = {
  products: "/api/products.json",
  offers: "/api/offers.json",
  stock: "/api/stock.json",
  categories: "/api/categories.json",
} as const;

const LOW_STOCK = 5;

const PLUS_ICON =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
const CHEVRON_PREV =
  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
const CHEVRON_NEXT =
  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)] ?? d);
}

//note: making sure the toPersianDigits function wont be called on everything in the HTML file like the CSS or script tags.
function convertPage(): void {
  const elements: NodeListOf<Element> =
    document.body.querySelectorAll("*");

  elements.forEach((element: Element) => {
    element.childNodes.forEach((child: ChildNode) => {
      if (child.nodeType === Node.TEXT_NODE) {
        child.nodeValue = toPersianDigits(child.nodeValue ?? "");
      }
    });
  });
}

function setupCategoryDropdown(): void {
  const categoryToggle =
    document.querySelector<HTMLInputElement>("#category-toggle");

  if (!categoryToggle) return;

  const closeCategories = (): void => {
    categoryToggle.checked = false;
  };

  document
    .querySelectorAll<HTMLAnchorElement>(".category-dropdown a")
    .forEach((link: HTMLAnchorElement) => {
      link.addEventListener("click", closeCategories);
    });

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && categoryToggle.checked) {
      closeCategories();
      categoryToggle.focus();
    }
  });
}

convertPage();
setupCategoryDropdown();

const formatPrice = (n: number): string =>
  toPersianDigits(Math.round(n).toLocaleString("en-US")).replace(/,/g, "٬");

//note: helps creating HTML elements with shorter syntax
//instead of:
//            const title = document.createElement("h1");
//            title.className = "title";
//            title.textContent = "Hello";
//we can write:
//            const title = el("h1", "title", "Hello");   

//K : Type Parameter
//<K extends keyof HTMLElementTagNameMap> : K can be a valid HTML tag
function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string | null,
  text?: string | null
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

//T : the type of the data we expect to receive from the API
async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  return (await res.json()) as T;
}

async function loadCatalog(): Promise<Catalog> {
  const [products, offers, stock, categories] = await Promise.all([
    fetchJson<Product[]>(API.products),
    fetchJson<Offer[]>(API.offers),
    fetchJson<Stock>(API.stock),
    fetchJson<Category[]>(API.categories),
  ]);

  const offerByProduct = new Map(offers.map((o) => [o.productId, o]));
  const categoryById = new Map(categories.map((c) => [c.id, c]));

  const items: CatalogItem[] = products.map((p) => {
    const offer = offerByProduct.get(p.id);
    return {
      ...p,     //note: Spread Operator: copies all properties from p to the new object

      price: offer ? Math.round((p.price * (100 - offer.percent)) / 100) : p.price,
      oldPrice: offer ? p.price : undefined,
      percent: offer?.percent,
      label: offer?.label,
      stock: stock.items[p.id] ?? 0,
      color: categoryById.get(p.categoryId)?.color,
    };
  });

  const itemById = new Map(items.map((i) => [i.id, i]));
  const specials = offers
    .map((o) => itemById.get(o.productId))
    //note: Type Predicate: tells TypeScript that the filter will only keep items that are not undefined
    .filter((i): i is CatalogItem => i !== undefined);

  return { items, specials, categories };
}

let catalogPromise: Promise<Catalog> | null = null;

//note: getCatalog function caches the catalog data in catalogPromise variable,
//so that subsequent calls to getCatalog will return the cached data instead of making another API request. 
function getCatalog(): Promise<Catalog> {
  catalogPromise ??= loadCatalog().catch((err) => {
    catalogPromise = null;
    throw err;
  });
  return catalogPromise;
}

const inStockFirst = (a: CatalogItem, b: CatalogItem): number =>
  Number(b.stock > 0) - Number(a.stock > 0);

//note: one comparator per Sort value; Record<Sort, ...> makes TypeScript complain if we forget one
const SORT_COMPARATORS: SortComparators = {
  default: inStockFirst,
  "price-asc": (a, b) => inStockFirst(a, b) || a.price - b.price,
  "price-desc": (a, b) => inStockFirst(a, b) || b.price - a.price,
  discount: (a, b) => inStockFirst(a, b) || (b.percent ?? 0) - (a.percent ?? 0),
};

const sortItems = (list: CatalogItem[], sort: Sort = "default"): CatalogItem[] =>
  [...list].sort(SORT_COMPARATORS[sort]);

const cart = new Map<number, CartLine>();

function updateCartCount(): void {
  const total = [...cart.values()].reduce((sum, line) => sum + line.quantity, 0);
  const badge = document.querySelector<HTMLElement>(".cart-count");
  if (badge) badge.textContent = toPersianDigits(total);
}

function addToCart(item: CatalogItem, button: HTMLButtonElement): void {
  const qty = cart.get(item.id)?.quantity ?? 0;
  if (qty >= item.stock) return;

  cart.set(item.id, {
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: qty + 1,
  });
  updateCartCount();
  document.dispatchEvent(
    new CustomEvent<CartAddDetail>("cart:add", {
      detail: { product: item, quantity: qty + 1 },
    })
  );

  button.classList.remove("is-added");
  void button.offsetWidth;
  button.classList.add("is-added");

  if (qty + 1 >= item.stock) {
    button.disabled = true;
    button.setAttribute("aria-label", `${item.name}: حداکثر موجودی در سبد خرید است`);
  }
}

function createCard(item: CatalogItem): HTMLElement {
  const soldOut = item.stock <= 0;
  const card = el("article", "offer-card" + (soldOut ? " is-sold-out" : ""));

  const media = el("div", "offer-media");
  if (item.color) media.style.setProperty("--media-bg", item.color);

  const addBtn = el("button", "offer-add");
  addBtn.type = "button";
  addBtn.innerHTML = PLUS_ICON;
  addBtn.disabled = soldOut;
  addBtn.setAttribute(
    "aria-label",
    soldOut ? `${item.name} ناموجود است` : `افزودن ${item.name} به سبد خرید`
  );
  addBtn.addEventListener("click", () => addToCart(item, addBtn));

  const emoji = el("span", "offer-emoji", item.emoji);
  emoji.setAttribute("aria-hidden", "true");

  media.append(emoji, addBtn);

  const tag = item.tags[0];
  if (tag) media.append(el("span", "offer-tag", tag));
  if (item.percent != null) {
    media.append(el("span", "offer-badge", `${toPersianDigits(item.percent)}٪`));
  }

  const body = el("div", "offer-body");
  body.append(el("h3", "offer-name", item.name), el("p", "offer-unit", item.unit));

  if (soldOut) {
    body.append(el("p", "offer-stock", "ناموجود"));
  } else if (item.stock <= LOW_STOCK) {
    body.append(
      el("p", "offer-stock", `تنها ${toPersianDigits(item.stock)} عدد باقی مانده`)
    );
  }

  const prices = el("div", "offer-prices");
  const price = el("span", "offer-price", formatPrice(item.price));
  price.append(el("small", null, "تومان"));
  prices.append(price);
  if (item.oldPrice != null) {
    prices.append(el("del", "offer-old-price", formatPrice(item.oldPrice)));
  }
  body.append(prices);

  card.append(media, body);
  return card;
}

function createArrow(kind: "prev" | "next"): HTMLButtonElement {
  const btn = el("button", `carousel-arrow carousel-${kind}`);
  btn.type = "button";
  btn.setAttribute("aria-label", kind === "prev" ? "قبلی" : "بعدی");
  btn.innerHTML = kind === "prev" ? CHEVRON_PREV : CHEVRON_NEXT;
  return btn;
}

function setupArrows(wrap: HTMLElement): void {
  const track = wrap.querySelector<HTMLElement>(".carousel");
  const prev = wrap.querySelector<HTMLButtonElement>(".carousel-prev");
  const next = wrap.querySelector<HTMLButtonElement>(".carousel-next");
  if (!track || !prev || !next) return;

  const step = (): number => track.clientWidth * 0.8;
  const dir = (): number => (getComputedStyle(track).direction === "rtl" ? -1 : 1);

  prev.addEventListener("click", () =>
    track.scrollBy({ left: -dir() * step(), behavior: "smooth" })
  );
  next.addEventListener("click", () =>
    track.scrollBy({ left: dir() * step(), behavior: "smooth" })
  );

  const update = (): void => {
    const max = track.scrollWidth - track.clientWidth;
    const pos = Math.abs(track.scrollLeft);
    prev.disabled = pos <= 2;
    next.disabled = pos >= max - 2;
  };

  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function showMessage(target: HTMLElement, text: string, onRetry?: () => void): void {
  const box = el("div", "offer-message");
  box.append(el("p", null, text));
  if (onRetry) {
    const btn = el("button", "offer-retry", "تلاش دوباره");
    btn.type = "button";
    btn.addEventListener("click", onRetry);
    box.append(btn);
  }
  target.replaceChildren(box);
}

async function renderSpecialOffers(section: HTMLElement): Promise<void> {
  const track = section.querySelector<HTMLElement>(".carousel");
  if (!track) return;

  track.setAttribute("aria-busy", "true");
  track.replaceChildren(
    ...Array.from({ length: 5 }, () => el("div", "offer-skeleton"))
  );

  try {
    const { specials } = await getCatalog();
    if (specials.length === 0) {
      showMessage(track, "فعلاً پیشنهاد ویژه‌ای نداریم.");
    } else {
      track.replaceChildren(...sortItems(specials).map(createCard));
    }
  } catch (err) {
    console.error(err);
    showMessage(track, "بارگذاری پیشنهادها انجام نشد.", () =>
      void renderSpecialOffers(section)
    );
  } finally {
    track.setAttribute("aria-busy", "false");
    track.scrollTo({ left: 0 });
    track.dispatchEvent(new Event("scroll"));
  }
}

function createCategorySection(category: Category, items: CatalogItem[]): HTMLElement {
  const section = el("section", "category-carousel");
  section.id = category.slug;
  section.setAttribute("aria-labelledby", `${category.slug}-title`);

  const icon = el("span", "category-carousel-icon", category.emoji);
  icon.style.setProperty("--category-color", category.color);
  icon.setAttribute("aria-hidden", "true");

  const title = el("h2", "category-carousel-title", category.name);
  title.id = `${category.slug}-title`;

  const count = el("span", "category-carousel-count", `${toPersianDigits(items.length)} کالا`);

  const head = el("div", "category-carousel-head");
  head.append(icon, title, count);

  const track = el("div", "carousel");
  track.tabIndex = 0;
  track.setAttribute("aria-label", category.name);
  track.append(...items.map(createCard));

  const wrap = el("div", "carousel-wrap");
  wrap.append(createArrow("prev"), track, createArrow("next"));
  setupArrows(wrap);

  section.append(head, wrap);
  return section;
}

async function renderCategoryCarousels(container: HTMLElement): Promise<void> {
  container.setAttribute("aria-busy", "true");

  try {
    const { items, categories } = await getCatalog();
    const sections = categories
      .map((category) => ({
        category,
        list: sortItems(items.filter((i) => i.categoryId === category.id)),
      }))
      .filter(({ list }) => list.length > 0)
      .map(({ category, list }) => createCategorySection(category, list));

    container.replaceChildren(...sections);
    container
      .querySelectorAll<HTMLElement>(".carousel")
      .forEach((t) => t.dispatchEvent(new Event("scroll")));
  } catch (err) {
    console.error(err);
    showMessage(container, "بارگذاری دسته‌بندی‌ها انجام نشد.", () =>
      void renderCategoryCarousels(container)
    );
  } finally {
    container.setAttribute("aria-busy", "false");
  }
}

const specialSection = document.querySelector<HTMLElement>(".special-offer");
if (specialSection) {
  const wrap = specialSection.querySelector<HTMLElement>(".carousel-wrap");
  if (wrap) setupArrows(wrap);
  void renderSpecialOffers(specialSection);
}

const categoryContainer = document.querySelector<HTMLElement>("#category-carousels");
if (categoryContainer) void renderCategoryCarousels(categoryContainer);

export { };