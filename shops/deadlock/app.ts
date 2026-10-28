import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import confetti from "canvas-confetti";
import type { ApiFile, Offer, Product, ProductCard, Stock ,Category} from "./src/types";
function isProduct(p: unknown): p is Product {
  return(typeof p === "object" &&
    p !== null &&
    "id" in p &&
    typeof p.id === "number" &&
    "categoryId" in p &&
    typeof p.categoryId === "number" &&
    "name" in p &&
    typeof p.name === "string" &&
    "emoji" in p &&
    typeof p.emoji === "string" &&
    "unit" in p &&
    typeof p.unit === "string" &&
    "price" in p &&
    typeof p.price === "number" &&
    "tags" in p &&
    Array.isArray(p.tags)&&
    p.tags.every((tag) => typeof tag === "string"))
}
function isStock(s: unknown): s is Stock {
  return(typeof s === "object" &&
    s !== null &&
    "updatedAt" in s &&
    typeof s.updatedAt === "string" &&
    "items" in s &&
    typeof s.items === "object" &&
    s.items !== null &&
    Object.values(s.items).every((count) => typeof count === "number"))
}
function isOffer(o: unknown): o is Offer {
  return(typeof o === "object" &&
    o !== null &&
    "productId" in o &&
    typeof o.productId === "number" &&
    "percent" in o &&
    typeof o.percent === "number" &&
    "label" in o &&
    typeof o.label === "string")
}
export function isCategory(c: unknown): c is Category {
  return(typeof c === "object" &&
    c !== null &&
    "id" in c &&
    typeof c.id === "number" &&
    "slug" in c &&
    typeof c.slug === "string" &&
    "name" in c &&
    typeof c.name === "string" &&
    "emoji" in c &&
    typeof c.emoji === "string" &&
    "color" in c &&
    typeof c.color === "string")
}

const notyf = new Notyf();
let cartCount = 0;
const counter = document.querySelector<HTMLSpanElement>(".cart-count");
if (!counter) throw new Error("Missing cart counter");
const handleClick = (e: MouseEvent): void => {
  if (!(e.target instanceof Element)) return;
  const button = e.target.closest<HTMLButtonElement>("button");
  if (button && !button.disabled) {
    cartCount += 1;
    counter.textContent = cartCount.toLocaleString("fa-IR");
    notyf.success(button.dataset.title + " به سبد خرید اضافه شد");
    confetti({ particleCount: 60, spread: 70 });
  }
};
function createProductCard(
  product: ProductCard,
  offer: Offer | undefined,
  stockCount: number,
): HTMLElement {
  const article = document.createElement("article");
  const span = document.createElement("span");
  span.setAttribute("aria-hidden", "true");
  span.classList.add("product-emoji");
  span.textContent = product.emoji;
  const div = document.createElement("div");
  const btn = document.createElement("button");
  btn.textContent = "+";
  btn.classList.add("add-to-cart");
  btn.dataset.title = product.name;

  btn.setAttribute("type", "button");
  btn.setAttribute("aria-label", "افزودن به سبد خرید");
  const p = document.createElement("p");
  p.textContent = product.unit;
  const price = document.createElement("p");

  price.textContent =
    new Intl.NumberFormat("fa-IR").format(product.price) + " تومان";
  article.classList.add("tent-article");
  const h3Item = document.createElement("h3");
  h3Item.textContent = product.name;

  article.append(span);
  article.append(h3Item);
  article.append(p);
  // if product has discount we use this condition
  if (offer) {
    const discountSpan = document.createElement("span");
    discountSpan.classList.add("discount-badge");
    discountSpan.textContent =
      new Intl.NumberFormat("fa-IR").format(offer.percent) + "٪";

    article.append(discountSpan);

    const discountPrice = document.createElement("p");
    discountPrice.classList.add("discount-price");
    discountPrice.textContent =
      new Intl.NumberFormat("fa-IR").format(product.price) + " تومان";
    article.append(discountPrice);

    const newPrice = Math.round(((100 - offer.percent) * product.price) / 100);
    price.textContent =
      new Intl.NumberFormat("fa-IR").format(newPrice) + " تومان";
  }
  if (stockCount === 0) {
    article.classList.add("out-of-stock");
    const outOfstock = document.createElement("p");
    outOfstock.classList.add("stock-label");
    outOfstock.textContent = "ناموجود";
    article.append(outOfstock);
    btn.setAttribute("disabled", "true");
    btn.setAttribute("aria-label", "ناموجود");
  }
  article.append(div);
  div.append(price);
  div.append(btn);
  return article;
}
async function getJSON(fileName: ApiFile): Promise<unknown> {
  const res = await fetch(`../../api/${fileName}.json`);
  if (!res.ok) {
    throw new Error(`${fileName}: HTTP ${res.status}`);
  }
  return await res.json();
}
function renderProducts(
  container: HTMLDivElement,
  productList: Product[],
  stock: Readonly<Stock>,
  offers: Offer[],
): void {
  for (let i = 0; i < productList.length; i++) {
    const product = productList[i];
    const stockCount = stock.items[product.id];
    const offer = offers.find((o) => o.productId === product.id);

    const card = createProductCard(product, offer, stockCount);
    container.append(card);
  }
}
function showMessage(
  container: HTMLDivElement,
  text: string,
): HTMLParagraphElement {
  const message = document.createElement("p");
  message.classList.add("carousel-message");
  message.textContent = text;
  container.append(message);
  return message;
}
const textmsg = "در حال بارگذاری...";

function keepValid<T>(raw: unknown, isValid: (x: unknown) => x is T, name: string): T[] {
  if (!Array.isArray(raw)) {
  throw new Error(name + " is not a list");
  }
  const good = raw.filter(isValid);
  const dropped = raw.length - good.length
  if (dropped > 0) console.warn(dropped, name + " dropped")
  return good
}
async function loadProducts(): Promise<void> {
  const offersContainer = document.querySelector<HTMLDivElement>(
    "#special-offers .carousel",
  );
  const container = document.querySelector<HTMLDivElement>("#tents .carousel");
  if (!offersContainer || !container) {
    throw new Error("cannot find");
  }
  offersContainer.addEventListener("click", handleClick);
  container.addEventListener("click", handleClick);

  const pantryLoading = showMessage(container, textmsg);
  const offersLoading = showMessage(offersContainer, textmsg);
  try {
    const [products, stock, offers] = await Promise.all([
      getJSON("products"),
      getJSON("stock"),
      getJSON("offers"),
    ]);
    const validProducts = keepValid(products, isProduct, "products");
    const validOffers = keepValid(offers, isOffer, "offers")
    if (!isStock(stock)) {
      throw new Error("Invalid stock data");
    }
    const pantryProducts = validProducts.filter((n) => n.categoryId === 4);
   const offerProducts = validProducts.filter((product) =>
      validOffers.some((offer) => offer.productId === product.id)
    );
    pantryLoading.remove();
    offersLoading.remove();
    renderProducts(container, pantryProducts, stock, validOffers);
    renderProducts(offersContainer, offerProducts, stock, validOffers);
    const firstOffer = offersContainer.firstElementChild;
    const lastOffer = offersContainer.lastElementChild;
    if (firstOffer && lastOffer) {
      firstOffer.id = "offer-first";
      lastOffer.id = "offer-last";
    }
  } catch (error) {
    pantryLoading.remove();
    offersLoading.remove();
    const detail = error instanceof Error ? error.message : "خطای ناشناخته";
    const errorText = `متأسفانه محصولات بارگذاری نشد. لطفاً دوباره تلاش کنید. (${detail})`;
    showMessage(container, errorText);
    showMessage(offersContainer, errorText);
  }
}
loadProducts();
