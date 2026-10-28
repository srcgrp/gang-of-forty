import type { CardProduct } from "../types";
import { formatNumber, formatPrice } from "./formatting";
import { createProductBadge } from "./product-badge";

export function createCard(product: CardProduct): HTMLLIElement {
    const outOfStock = product.stock === 0;
    const li: HTMLLIElement = document.createElement("li");

    if (outOfStock) {
        li.classList.add("out-of-stock");
    }

    const icon: HTMLElement = document.createElement("span");
    icon.classList.add("emoji");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = product.emoji;

    const name: HTMLElement = document.createElement("h3");
    name.textContent = product.name;

    const meta: HTMLParagraphElement = document.createElement("p");
    meta.classList.add("meta");
    meta.textContent = product.unit;

    const price: HTMLParagraphElement = document.createElement("p");
    price.classList.add("price");

    if (product.newPrice) {
        const del: HTMLElement = document.createElement("del");
        const oldPriceLabel: HTMLElement = document.createElement("span");
        oldPriceLabel.classList.add("visually-hidden");
        oldPriceLabel.textContent = "قیمت قبلی";
        del.append(oldPriceLabel, " ", formatNumber(product.price));

        const newPriceLabel: HTMLElement = document.createElement("span");
        newPriceLabel.classList.add("visually-hidden");
        newPriceLabel.textContent = "قیمت با تخفیف";
        price.append(del, newPriceLabel, " ", formatPrice(product.newPrice));
    } else {
        price.textContent = formatPrice(product.price);
    }

    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.textContent = "+";
    button.dataset.name = product.name;
    button.dataset.action = "add-to-cart";
    button.disabled = outOfStock;
    button.setAttribute(
        "aria-label",
        outOfStock
            ? `${product.name}: ناموجود`
            : `افزودن ${product.name} به سبد خرید`
    );

    li.append(icon);

    if (outOfStock) {
        li.append(createProductBadge("ناموجود"));
    } else if (product.percent) {
        li.append(createProductBadge("تخفیف", product.percent));
    }

    li.append(name, meta, price, button);
    return li;
}