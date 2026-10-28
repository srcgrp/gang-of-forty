import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import confetti from "canvas-confetti";
import { getJSON, isProduct, isStock, isOffer} from "./api/api";
import { render} from "./ui/render";
import{keepValid} from "./api/validation"
import { readUrlState, writeUrlState } from "./api/urlState";

const searchInput = document.querySelector<HTMLInputElement>("#search-box");
const searchButton = document.querySelector<HTMLButtonElement>(".search-btn");
const initialUrlState = readUrlState();
if (searchInput) {
  searchInput.value = initialUrlState.query;
}
function updateSearchUrl(): void {
  writeUrlState({
    ...readUrlState(),
    query: searchInput?.value ?? "",
  });
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

  render(container, offersContainer, { status: "loading" });
  try {
    const [products, stock, offers] = await Promise.all([
      getJSON("products"),
      getJSON("stock"),
      getJSON("offers"),
    ]);
    const validProducts = keepValid(products, isProduct, "products");
    const validOffers = keepValid(offers, isOffer, "offers");
    if (!isStock(stock)) {
      throw new Error("Invalid stock data");
    }
    if (validProducts.length === 0) {
      render(container, offersContainer, { status: "empty" });
    } else {
        const query = searchInput?.value.trim().toLocaleLowerCase() ?? "";
        const pantryProducts = validProducts.filter(
        (product) =>
            product.categoryId === 4 &&
            product.name.toLocaleLowerCase().includes(query),
        );
      const offerProducts = validProducts.filter((product) =>
        validOffers.some((offer) => offer.productId === product.id),
      );
      render(container, offersContainer, {
        status: "success",
        pantryProducts,
        offerProducts,
        stock,
        offers: validOffers,
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "خطای ناشناخته";
    render(container, offersContainer, { status: "error", message });
  }

}

searchButton?.addEventListener("click", () => {
  updateSearchUrl();
  loadProducts();
});

searchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    updateSearchUrl();
    loadProducts();
  }
});

window.addEventListener("popstate", () => {
  const state = readUrlState();
  if (searchInput) searchInput.value = state.query;
  loadProducts();
});

loadProducts();
