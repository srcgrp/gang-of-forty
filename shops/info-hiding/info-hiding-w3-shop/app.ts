import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import confetti from "canvas-confetti";

const cartCount = document.querySelector<HTMLSpanElement>(".cart span");
const cartButton = document.querySelector<HTMLButtonElement>(".cart");
const dairyCarousel = document.querySelector<HTMLElement>("#dairy-carousel");
const offersCarousel = document.querySelector<HTMLElement>("#offers-carousel");

if (!cartCount || !cartButton || !dairyCarousel || !offersCarousel) {
    throw new Error("A required page element is missing");
}

let cart: number = 0;
const notyf = new Notyf({
    duration: 3000,
    ripple: false,
    position: { x: "center", y: "bottom" },
    types: [{ type: "success", background: "#590d22", icon: false }]
});

const priceFormat = new Intl.NumberFormat("fa-IR");

async function readJson(file: string) {
    const response: Response = await fetch("../../api/" + file);
    if (!response.ok) {
        throw new Error("Request failed: " + file);
    }
    return await response.json();
}

const createProductCard = (product, index: number, section: string, stock, offers): HTMLElement => {
    const card: HTMLElement = document.createElement("article");
    card.className = "product";
    card.id = section + "-" + (index + 1);

    const offer = offers.find(function (item) {
        return item.productId === product.id;
    });

    if (offer) {
        const badge: HTMLSpanElement = document.createElement("span");
        badge.className = "discount";
        badge.textContent = priceFormat.format(offer.percent) + "٪ تخفیف";
        badge.title = offer.label;
        card.append(badge);
    }

    const icon: HTMLSpanElement = document.createElement("span");
    icon.className = "product-icon";
    icon.textContent = product.emoji;
    icon.setAttribute("role", "img");
    icon.setAttribute("aria-label", product.name);

    const name: HTMLHeadingElement = document.createElement("h3");
    name.textContent = product.name;

    const unit: HTMLParagraphElement = document.createElement("p");
    unit.textContent = product.unit;

    const price: HTMLDivElement = document.createElement("div");
    price.className = "price";
    let finalPrice = product.price;
    if (offer) {
        const oldPrice: HTMLModElement = document.createElement("del");
        oldPrice.textContent = priceFormat.format(product.price) + " تومان";
        price.append(oldPrice);
        finalPrice = Math.round(product.price * (100 - offer.percent) / 100);
    }
    const amount: HTMLElement = document.createElement("strong");
    amount.textContent = priceFormat.format(finalPrice) + " تومان";
    price.append(amount);

    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.textContent = "افزودن +";
    button.setAttribute("aria-label", "افزودن " + product.name + " به سبد خرید");

    button.addEventListener("click", (event: MouseEvent) => {
        if (!(event.currentTarget instanceof HTMLButtonElement)) {
            return;
        }
        cart += 1;
        cartCount.textContent = priceFormat.format(cart);
        cartButton.setAttribute("aria-label", "سبد خرید، " + priceFormat.format(cart) + " کالا");
        notyf.success("کالا به سبد خرید اضافه شد");
        confetti({ particleCount: 60, spread: 70, disableForReducedMotion: true });
    });

    card.append(icon, name, unit);
    if (stock.items[product.id] === 0) {
        card.classList.add("unavailable");
        const label: HTMLParagraphElement = document.createElement("p");
        label.className = "stock-label";
        label.textContent = "ناموجود";
        card.append(label);
        button.disabled = true;
        button.textContent = "ناموجود";
    }
    card.append(price, button);
    return card;
};

const renderCarousel = (section: string, products, stock, offers): void => {
    const carousel = document.querySelector<HTMLElement>("#" + section + "-carousel");
    const statusMessage = document.querySelector<HTMLParagraphElement>("#" + section + "-status");
    const controls = document.querySelector<HTMLDivElement>("#" + section + " .carousel-controls");
    if (!carousel || !statusMessage || !controls) {
        throw new Error("A carousel element is missing");
    }
    carousel.replaceChildren();

    if (products.length === 0) {
        statusMessage.textContent = "در حال حاضر محصولی برای نمایش وجود ندارد.";
        return;
    }

    products.forEach(function (product, index) {
        carousel.append(createProductCard(product, index, section, stock, offers));
    });
    const end: HTMLSpanElement = document.createElement("span");
    end.id = section + "-end";
    end.className = "carousel-end";
    end.setAttribute("aria-hidden", "true");
    carousel.append(end);
    statusMessage.textContent = "";
    controls.hidden = false;
};

const loadProducts = async (): Promise<void> => {
    const messages = document.querySelectorAll<HTMLParagraphElement>(".load-status");
    messages.forEach(function (message) {
        message.textContent = "در حال بارگذاری محصولات…";
    });

    try {
        const [products, stock, offers] = await Promise.all([
            readJson("products.json"),
            readJson("stock.json"),
            readJson("offers.json")
        ]);

        const dairyProducts = products.filter(function (product) {
            return product.categoryId === 2;
        });
        const specialProducts = products.filter(function (product) {
            return offers.find(function (offer) {
                return offer.productId === product.id;
            });
        });

        renderCarousel("dairy", dairyProducts, stock, offers);
        renderCarousel("offers", specialProducts, stock, offers);

        const target: HTMLElement | null = document.getElementById(location.hash.slice(1));
        if (target) {
            target.scrollIntoView();
        }
    } catch (error) {
        dairyCarousel.replaceChildren();
        offersCarousel.replaceChildren();
        messages.forEach(function (message) {
            message.textContent = "دریافت محصولات انجام نشد. اتصال اینترنت را بررسی کنید و صفحه را دوباره بارگذاری کنید.";
        });
    } finally {
        dairyCarousel.setAttribute("aria-busy", "false");
        offersCarousel.setAttribute("aria-busy", "false");
    }
};

loadProducts();
