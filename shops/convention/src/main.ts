import "notyf/notyf.min.css";
import { renderProducts } from "./catalog/render-products";
import { updateCartCounter } from "./ui/cart-counter";

const carouselElement = document.querySelector<HTMLElement>(
    ".products-carousel"
);

if (!carouselElement) {
    throw new Error("عنصر products-carousel در HTML پیدا نشد.");
}
updateCartCounter();
void renderProducts(carouselElement);