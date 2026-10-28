import type { Offer, Product, Stock, LoadState } from "../../types";
import { createProductCard } from "./productCard";
import { showMessage, textmsg } from "../../shared/messages";
export function renderProducts(
  container: HTMLDivElement,
  productList: Product[],
  stock: Readonly<Stock>,
  offers: Offer[],
): void {
  for (let i = 0; i < productList.length; i++) {
    const product = productList[i];
    if (!product) continue;

    const stockCount = stock.items[product.id] ?? 0;
    const offer = offers.find((o) => o.productId === product.id);

    const card = createProductCard(product, offer, stockCount);
    container.append(card);
    }
}
export function render(
  container: HTMLDivElement,
  offersContainer: HTMLDivElement,
  state: LoadState,
): void {
  container.replaceChildren();
  offersContainer.replaceChildren();

  switch (state.status) {
    case "loading":
      showMessage(container, textmsg);
      showMessage(offersContainer, textmsg);
      break;

    case "success": {
      renderProducts(
        container,
        state.pantryProducts,
        state.stock,
        state.offers,
      );

      renderProducts(
        offersContainer,
        state.offerProducts,
        state.stock,
        state.offers,
      );
      const firstOffer = offersContainer.firstElementChild;
      const lastOffer = offersContainer.lastElementChild;
      if (firstOffer && lastOffer) {
        firstOffer.id = "offer-first";
        lastOffer.id = "offer-last";
      }
      break;
    }
    case "empty":
      showMessage(container, "در حال حاضر محصولی برای نمایش نیست.");
      showMessage(offersContainer, "در حال حاضر محصولی برای نمایش نیست.");
      break;
    case "error": {
      const errorText =    `متأسفانه محصولات بارگذاری نشد. لطفاً دوباره تلاش کنید. (${state.message})`;
      showMessage(container, errorText);
      showMessage(offersContainer, errorText);
      break;
    }
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}