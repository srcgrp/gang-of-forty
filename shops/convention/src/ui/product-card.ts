import confetti from "canvas-confetti";
import { Notyf } from "notyf";
import type { Product } from "../types";
import { formatPrice } from "../catalog/products";
import { addToCart } from "../cart/cart";
import { updateCartCounter } from "./cart-counter";

const notyf = new Notyf({
    duration: 2500,
    position: {
        x: "left",
        y: "top"
    }
});

export function createProductCard(product: Product): HTMLElement {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageContainer = document.createElement("div");
    imageContainer.className = "product-image";

    const emoji = document.createElement("span");
    emoji.className = "product-emoji";
    emoji.textContent = product.emoji;
    emoji.setAttribute("aria-hidden", "true");
    imageContainer.append(emoji);

    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("h3");
    name.textContent = product.name;

    const unit = document.createElement("p");
    unit.className = "product-size";
    unit.textContent = product.unit;

    const priceContainer = document.createElement("div");
    priceContainer.className = "product-price";

    const price = document.createElement("strong");
    price.textContent = `${formatPrice(product.price)} تومان`;
    priceContainer.append(price);

    const button = document.createElement("button");
    button.className = "add-to-cart";
    button.type = "button";
    button.textContent = "افزودن به سبد";

   button.addEventListener("click", () => {
    addToCart(product.id);
    updateCartCounter();

    notyf.success(`${product.name} به سبد خرید اضافه شد`);

    confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 }
    });
    });

    info.append(name, unit, priceContainer, button);
    card.append(imageContainer, info);

    return card;
}