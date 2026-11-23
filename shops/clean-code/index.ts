import confetti from "canvas-confetti";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { getJSON } from "./api";
import type {
  Category,
  Home,
  MakeItem,
  Offer,
  Product,
  Shop,
  Stock,
} from "./types";
const notyf = new Notyf();

const API = import.meta.env.VITE_API_URL;

function findOffer(offers: Offer[], productId: number): Offer | null {
  const found = offers.find(function (item) {
    return item.productId === productId;
  });
  if (found) {
    return found;
  }
  return null;
}

function productLine(
  product: Product,
  qty: number,
  offer: Offer | null,
  faNumber: Intl.NumberFormat,
): string {
  let line = product.unit;

  if (qty === 0) {
    line += " — ناموجود";
  } else {
    line += " — مانده: " + faNumber.format(qty);
  }

  if (offer) {
    line += " — " + offer.label;
  }

  if (product.tags.length > 0) {
    line += " — " + product.tags.join("، ");
  }

  return line;
}

function addCatLinks(ul: HTMLUListElement, categories: Category[]): void {
  for (const cat of categories) {
    const li: HTMLLIElement = document.createElement("li");
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = "#" + cat.slug;
    a.textContent = cat.name;
    li.appendChild(a);
    ul.appendChild(li);
  }
}

function fillShop(shop: Shop): void {
  const notice = document.querySelector<HTMLParagraphElement>(".banner p");
  const slogan = document.querySelector<HTMLParagraphElement>(".slogan");
  const about = document.querySelector<HTMLParagraphElement>("#about");
  const address = document.querySelector<HTMLParagraphElement>("#address");
  const hoursWeek = document.querySelector<HTMLParagraphElement>("#hours-week");
  const hoursFri = document.querySelector<HTMLParagraphElement>("#hours-fri");
  const phone = document.querySelector<HTMLAnchorElement>("#phone");
  const copyRight = document.querySelector<HTMLParagraphElement>("#copyright");

  if (
    !notice ||
    !slogan ||
    !about ||
    !address ||
    !hoursWeek ||
    !hoursFri ||
    !phone ||
    !copyRight
  )
    throw new Error("index.html is missing an element");

  notice.textContent = shop.notice;
  slogan.textContent = shop.slogan;
  about.textContent = shop.about;
  address.textContent = shop.address;
  hoursWeek.textContent = shop.schedule[0].days + ": " + shop.schedule[0].time;
  hoursFri.textContent = shop.schedule[1].days + ": " + shop.schedule[1].time;
  phone.textContent = shop.phone;
  phone.setAttribute("href", "tel:" + shop.phone);
  phone.setAttribute("dir", "ltr");
  copyRight.textContent = shop.copyright;
}

function fillMenu(shop: Shop, categories: Category[]): void {
  const list = document.querySelector<HTMLUListElement>("#menu-list");
  if (!list) throw new Error("index.html is missing an element");

  const all: HTMLLIElement = document.createElement("li");
  all.className = "all-cats";
  const allLink: HTMLAnchorElement = document.createElement("a");
  allLink.href = "#categories";
  allLink.textContent = "همه دسته‌ها";
  const sub: HTMLUListElement = document.createElement("ul");
  addCatLinks(sub, categories);
  all.appendChild(allLink);
  all.appendChild(sub);
  list.appendChild(all);

  for (const item of shop.menu) {
    const li: HTMLLIElement = document.createElement("li");
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = item.href;
    a.textContent = item.label;
    li.appendChild(a);
    list.appendChild(li);
  }

  const cartLi: HTMLLIElement = document.createElement("li");
  const cartA: HTMLAnchorElement = document.createElement("a");
  cartA.href = "#cart";
  cartA.textContent = "سبد خرید";
  cartLi.appendChild(cartA);
  list.appendChild(cartLi);
}

function fillFooter(shop: Shop, categories: Category[]): void {
  const footerCats = document.querySelector<HTMLUListElement>("#footer-cats");
  const helpList = document.querySelector<HTMLUListElement>("#footer-help");
  if (!helpList || !footerCats)
    throw new Error("index.html is missing an element");

  addCatLinks(footerCats, categories);

  for (const item of shop.help) {
    const li: HTMLLIElement = document.createElement("li");
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = item.href;
    a.textContent = item.label;
    li.appendChild(a);
    helpList.appendChild(li);
  }
}

function fillCategories(categories: Category[]): void {
  const list = document.querySelector<HTMLUListElement>("#cat-list");
  if (!list) throw new Error("index.html is missing an element");

  for (const cat of categories) {
    const li: HTMLLIElement = document.createElement("li");
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = "#" + cat.slug;

    const icon: HTMLSpanElement = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = cat.emoji;
    icon.style.backgroundColor = cat.color;

    a.appendChild(icon);
    a.appendChild(document.createTextNode(cat.name));
    li.appendChild(a);
    list.appendChild(li);
  }
}

function fillHero(home: Home): void {
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

function fillPromos(home: Home): void {
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

function makeCarousel(
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

function addCards(
  row: HTMLUListElement,
  products: Product[],
  makeItem: MakeItem,
  startId: string,
  endId: string,
): void {
  for (let i = 0; i < products.length; i++) {
    const li = makeItem(products[i]);
    if (i === 0) {
      li.id = startId;
    }
    if (i === products.length - 1) {
      li.id = endId;
    }
    row.appendChild(li);
  }
}

function fillCarousels(
  home: Home,
  categories: Category[],
  products: Product[],
  offers: Offer[],
  makeItem: MakeItem,
): void {
  const featured = document.querySelector<HTMLDivElement>("#featured");
  const more = document.querySelector<HTMLDivElement>("#carousels");
  const used: Record<string, boolean> = {};

  if (!featured || !more) throw new Error("index.html is missing an element");

  for (const item of home.carousels) {
    let list;
    if ("categoryId" in item) {
      list = products.filter(function (product) {
        return product.categoryId === item.categoryId;
      });
    } else {
      list = products.filter(function (product) {
        return findOffer(offers, product.id);
      });
    }

    const parts = makeCarousel(item.id, item.emoji + " " + item.title);
    addCards(parts.row, list, makeItem, item.id + "-start", item.id + "-end");
    featured.appendChild(parts.section);
    used[item.id] = true;
  }

  for (const cat of categories) {
    if (used[cat.slug]) {
      continue;
    }
    const list = products.filter(function (product) {
      return product.categoryId === cat.id;
    });
    const parts = makeCarousel(cat.slug, cat.emoji + " " + cat.name);
    addCards(parts.row, list, makeItem, cat.slug + "-start", cat.slug + "-end");
    more.appendChild(parts.section);
  }
}

function filterProducts(q: string): void {
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

function makePic(
  product: Product,
  qty: number,
  offer: Offer | null,
  faNumber: Intl.NumberFormat,
): HTMLDivElement {
  const pic: HTMLDivElement = document.createElement("div");
  pic.className = "pic";

  const emoji: HTMLSpanElement = document.createElement("span");
  emoji.textContent = product.emoji;
  pic.appendChild(emoji);

  if (qty === 0) {
    const badge: HTMLSpanElement = document.createElement("span");
    badge.className = "off sold";
    badge.textContent = "ناموجود";
    pic.appendChild(badge);
  } else if (offer) {
    const badge: HTMLSpanElement = document.createElement("span");
    badge.className = "off";
    badge.textContent = faNumber.format(offer.percent) + "٪";
    pic.appendChild(badge);
  }

  return pic;
}

function makeAmount(
  product: Product,
  qty: number,
  faNumber: Intl.NumberFormat,
): HTMLParagraphElement {
  const amount: HTMLParagraphElement = document.createElement("p");
  amount.className = "amount";
  if (qty === 0) {
    amount.textContent = product.unit;
  } else {
    amount.textContent = product.unit + " · مانده " + faNumber.format(qty);
  }
  return amount;
}

function makePrice(
  product: Product,
  qty: number,
  offer: Offer | null,
  faNumber: Intl.NumberFormat,
): HTMLParagraphElement {
  const price: HTMLParagraphElement = document.createElement("p");
  price.className = "price";

  if (offer && qty !== 0) {
    const oldPrice: HTMLSpanElement = document.createElement("span");
    oldPrice.textContent = faNumber.format(product.price) + " تومان";
    price.appendChild(oldPrice);

    const newPrice = (product.price * (100 - offer.percent)) / 100;
    const now: HTMLSpanElement = document.createElement("span");
    now.textContent = faNumber.format(newPrice) + " تومان";
    price.appendChild(now);
  } else {
    price.textContent = faNumber.format(product.price) + " تومان";
  }

  return price;
}

function makeButton(qty: number, onAdd: () => void): HTMLButtonElement {
  const btn: HTMLButtonElement = document.createElement("button");
  btn.type = "button";
  if (qty === 0) {
    btn.textContent = "ناموجود";
    btn.disabled = true;
  } else {
    btn.textContent = "افزودن به سبد";
    btn.addEventListener("click", onAdd);
  }
  return btn;
}

async function loadPage(): Promise<void> {
  const status = document.querySelector<HTMLParagraphElement>("#status");
  if (!status) throw new Error("index.html is missing an element");

  try {
    const faNumber = new Intl.NumberFormat("fa-IR");

    const [products, stock, offers, categories, shop, home] = await Promise.all(
      [
        getJSON<Product[]>(API + "products.json"),
        getJSON<Stock>(API + "stock.json"),
        getJSON<Offer[]>(API + "offers.json"),
        getJSON<Category[]>(API + "categories.json"),
        getJSON<Shop>(API + "shop.json"),
        getJSON<Home>(API + "home.json"),
      ],
    );

    fillShop(shop);
    fillMenu(shop, categories);
    fillFooter(shop, categories);
    fillCategories(categories);
    fillHero(home);
    fillPromos(home);

    const searchBoxInput = document.querySelector<HTMLInputElement>("#q");
    const countEl = document.querySelector<HTMLSpanElement>(".cart-count");
    const cartText = document.querySelector<HTMLParagraphElement>("#cart-text");
    let count: number = Number(localStorage.getItem("cartCount")) || 0;

    if (!searchBoxInput) throw new Error("index.html is missing an element");

    searchBoxInput.placeholder =
      "جستجو در میان " + faNumber.format(products.length) + " کالا…";

    function updateCart(): void {
      if (!countEl || !cartText)
        throw new Error("index.html is missing an element");
      countEl.textContent = faNumber.format(count);
      if (count === 0) {
        cartText.textContent = "سبد خالی است.";
      } else {
        cartText.textContent = "تعداد کالا در سبد: " + faNumber.format(count);
      }
    }

    function makeProductItem(product: Product): HTMLLIElement {
      const li: HTMLLIElement = document.createElement("li");
      const qty = stock.items[product.id];
      const offer = findOffer(offers, product.id);

      if (qty === 0) {
        li.className = "product out-of-stock";
      } else {
        li.className = "product";
      }

      const name: HTMLHeadingElement = document.createElement("h3");
      name.textContent = product.name;

      const extra: HTMLSpanElement = document.createElement("span");
      extra.hidden = true;
      extra.textContent = productLine(product, qty, offer, faNumber);

      li.appendChild(makePic(product, qty, offer, faNumber));
      li.appendChild(name);
      li.appendChild(makeAmount(product, qty, faNumber));
      li.appendChild(extra);
      li.appendChild(makePrice(product, qty, offer, faNumber));
      li.appendChild(
        makeButton(qty, function () {
          count = count + 1;
          localStorage.setItem("cartCount", String(count));
          updateCart();
          notyf.success(`${product.name} به سبد اضافه شد`);
          confetti({ particleCount: 60, spread: 70 });
        }),
      );

      return li;
    }

    fillCarousels(home, categories, products, offers, makeProductItem);
    updateCart();

    const clearCartButton =
      document.querySelector<HTMLButtonElement>("#clear-cart");
    const submitButton = document.querySelector<HTMLFormElement>(".search");

    if (!clearCartButton || !submitButton)
      throw new Error("index.html is missing an element");

    clearCartButton.addEventListener("click", function () {
      count = 0;
      localStorage.setItem("cartCount", String(count));
      updateCart();
    });

    searchBoxInput.addEventListener("input", function () {
      filterProducts(this.value);
    });

    submitButton.addEventListener("submit", function (e) {
      e.preventDefault();
    });

    status.textContent = "";
    status.hidden = true;
  } catch (err: unknown) {
    status.hidden = false;
    status.className = "status error";
    status.textContent = "بارگذاری نشد. صفحه را رفرش کن.";
  }
}

loadPage();
