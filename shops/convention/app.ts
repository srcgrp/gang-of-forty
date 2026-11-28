
type Product = {
    id: number;
    categoryId: number;
    name: string;
    emoji: string;
    unit: string;
    price: number;
};

import confetti from "canvas-confetti";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
    duration: 2500,
    position: {
        x: "left",
        y: "top"
    }
});


const categoryId = 2;

const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fa-IR").format(price);
};

function showMessage(
    carousel: HTMLElement,
    message: string
): void {
    const messageElement = document.createElement("p");
    messageElement.className = "carousel-message";
    messageElement.textContent = message;
    carousel.replaceChildren(messageElement);
}

function createProductCard(product: Product): HTMLElement {
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

async function loadProducts(carousel: HTMLElement): Promise<void> {
    showMessage(carousel, "در حال بارگذاری محصولات...");

    try {
        const response = await fetch("../../api/products.json");

        if (!response.ok) {
            throw new Error(`خطای HTTP: ${response.status}`);
        }

        const products: Product[] = await response.json();

        const filteredProducts = products.filter(
            (product: Product) => product.categoryId === categoryId
        );

        if (filteredProducts.length === 0) {
            showMessage(carousel, "محصولی در این دسته‌بندی پیدا نشد.");
            return;
        }

        const fragment = document.createDocumentFragment();

        filteredProducts.forEach((product: Product) => {
            const card = createProductCard(product);
            fragment.append(card);
        });

        carousel.replaceChildren(fragment);
    } catch (error: unknown) {
        console.error("خطا در دریافت محصولات:", error);
        showMessage(
            carousel,
            "دریافت محصولات ناموفق بود. لطفاً صفحه را دوباره بارگذاری کنید."
        );
    }
}

const carouselElement = document.querySelector<HTMLElement>(
    ".products-carousel"
);

if (!carouselElement) {
    throw new Error("عنصر products-carousel در HTML پیدا نشد");
}

loadProducts(carouselElement);
