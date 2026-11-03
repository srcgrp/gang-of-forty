// The two npm packages: a small toast message and a confetti burst
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import confetti from "canvas-confetti";

// The elements this file works with, each with its exact type
const dairyList = document.querySelector<HTMLElement>("#dairy-list");
const cartCount = document.querySelector<HTMLElement>("#cart-count");
const main = document.querySelector<HTMLElement>("#main");

// Stop here if one of them is missing, so TypeScript knows they are not null below
if (!dairyList || !cartCount || !main) {
  throw new Error("index.html is missing an element");
}

// Address of the products file, relative to this page
// (the same path as in the Gang of Forty repo)
const apiUrl: string = "../../api/products.json";

// Category 2 is dairy (لبنیات)
const dairyCategoryId: number = 2;

// How many items are in the cart (starts from the ۰ in the header)
let cart: number = 0;

// The toast box, shown at the bottom left of the page
const notyf: Notyf = new Notyf({ duration: 2500, position: { x: "left", y: "bottom" } });

// Turns a number into Persian digits, for example 165000 becomes ۱۶۵٬۰۰۰
const toPersianNumber = (value: number): string => {
  return new Intl.NumberFormat("fa-IR").format(value);
};

// Shows a message inside the carousel (loading, error or empty)
const showMessage = (text: string, isError: boolean): void => {
  // remove everything that was in the carousel before
  dairyList.textContent = "";

  const message: HTMLParagraphElement = document.createElement("p");
  message.className = "carousel-message";
  if (isError) {
    message.classList.add("carousel-error");
  }
  message.textContent = text;
  dairyList.appendChild(message);
};

// Builds one product card, the same as the cards of week 1
const createCard = (product): HTMLElement => {
  const card: HTMLElement = document.createElement("article");
  card.className = "product-card";

  const image: HTMLDivElement = document.createElement("div");
  image.className = "product-image bg-dairy";
  image.setAttribute("aria-hidden", "true");
  image.textContent = product.emoji;
  card.appendChild(image);

  const body: HTMLDivElement = document.createElement("div");
  body.className = "card-body";

  const title: HTMLHeadingElement = document.createElement("h3");
  title.className = "product-name";
  title.textContent = product.name;
  body.appendChild(title);

  const unit: HTMLParagraphElement = document.createElement("p");
  unit.className = "product-unit";
  unit.textContent = product.unit;
  body.appendChild(unit);

  const priceRow: HTMLDivElement = document.createElement("div");
  priceRow.className = "price-row";

  const price: HTMLParagraphElement = document.createElement("p");
  price.className = "price";
  price.textContent = toPersianNumber(product.price) + " تومان";
  priceRow.appendChild(price);

  const add: HTMLButtonElement = document.createElement("button");
  add.type = "button";
  add.className = "add-button";
  // the click handler reads the product name from here
  add.dataset.name = product.name;

  const plus: HTMLSpanElement = document.createElement("span");
  plus.setAttribute("aria-hidden", "true");
  plus.textContent = "+";
  add.appendChild(plus);

  const hiddenText: HTMLSpanElement = document.createElement("span");
  hiddenText.className = "hidden-text";
  hiddenText.textContent = "افزودن " + product.name + " به سبد";
  add.appendChild(hiddenText);

  priceRow.appendChild(add);
  body.appendChild(priceRow);
  card.appendChild(body);

  return card;
};

// Reads products.json and fills the dairy carousel
const loadDairyProducts = async (): Promise<void> => {
  showMessage("در حال بارگذاری محصولات لبنی...", false);

  try {
    const response = await fetch(apiUrl);
    // fetch does not throw on a 404, so response.ok is what catches a missing file;
    // a network failure or broken JSON lands in the same catch
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    const products = await response.json();

    const dairyProducts = products.filter((product) => {
      return product.categoryId === dairyCategoryId;
    });

    if (dairyProducts.length === 0) {
      showMessage("فعلاً محصولی در این دسته نیست.", false);
      return;
    }

    dairyList.textContent = "";
    for (let i = 0; i < dairyProducts.length; i++) {
      const card: HTMLElement = createCard(dairyProducts[i]);

      // the → and ← buttons jump to the first and the last card
      if (i === 0) {
        card.id = "dairy-first";
      }
      if (i === dairyProducts.length - 1) {
        card.id = "dairy-last";
      }

      dairyList.appendChild(card);
    }
  } catch (error) {
    showMessage("بارگذاری محصولات لبنی انجام نشد. لطفاً اتصال اینترنت را بررسی کنید و صفحه را دوباره باز کنید.", true);
  }
};

// One click listener for every + button on the page, including the cards made above
main.addEventListener("click", (e: MouseEvent) => {
  if (!(e.target instanceof Element)) return;
  const button = e.target.closest<HTMLButtonElement>(".add-button");
  if (!button) return;

  cart = cart + 1;
  cartCount.textContent = toPersianNumber(cart);

  const productName: string = button.dataset.name || "کالا";
  notyf.success(productName + " به سبد اضافه شد");
  // no confetti for visitors who turned on «کاهش حرکت»
  confetti({ particleCount: 60, spread: 70, disableForReducedMotion: true });
});

loadDairyProducts();
