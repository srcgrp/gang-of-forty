import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import confetti from "canvas-confetti";
import { getJSON, isProduct, isStock, isOffer} from "./api/api";
import { render} from "./ui/render";
import{keepValid} from "./api/validation"
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
      const pantryProducts = validProducts.filter((n) => n.categoryId === 4);
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
loadProducts();
