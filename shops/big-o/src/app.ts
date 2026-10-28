import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { CountUp } from 'countup.js';
import type {Product, Offer, Stock,CardInfo} from './types';
import { getData } from './api/getData';
import { loadCartCount, saveCartCount } from './storage/cart';
import { getCategoryID, filterProductsByCategoryID, filterSpecialProducts } from './catalog/filters';
import { renderStatus } from './ui/status';
import { getHtmlElement } from './ui/getHtmlElement';
import { renderCategories, renderCategoryLinks } from './ui/categories';
import { renderShop } from './ui/shop';

let cartCount: number = loadCartCount();

const notyf = new Notyf({
    position: { x: "center", y: "top" },
});






// Builds one product card (an li element) from a product and returns it.
// product: an item from products.json.
// cardInfo: { percent, label, inStock }
//   percent/label: discount from offers.json (undefined if no discount),
//   inStock: false shows the "ناموجود" badge instead of the discount badge.
function createProductCard(product: Product, cardInfo : CardInfo = {}) {
    const carouselItem: HTMLLIElement = document.createElement("li");
    const { percent, label, inStock = true } = cardInfo;

    const card: HTMLElement = document.createElement("article");
    card.classList.add("product-card");

    const img: HTMLElement = document.createElement("span");
    img.textContent = product.emoji;
    img.classList.add("product-img");
    img.setAttribute("aria-hidden", "true");


    const title: HTMLHeadingElement = document.createElement("h3");
    title.textContent = product.name;
    title.id = `product-${product.id}`;

    const unit: HTMLParagraphElement = document.createElement("p");
    unit.textContent = product.unit;

    const cardFooter: HTMLDivElement = document.createElement("div");
    cardFooter.classList.add("card-footer");

    const priceBox: HTMLDivElement = document.createElement("div");
    priceBox.classList.add("price");



    if (percent) {
        const price: HTMLModElement = document.createElement("del");
        price.textContent = `${new Intl.NumberFormat('fa-IR').format(product.price)} تومان`;

        const offeredPrice: HTMLElement = document.createElement("strong");
        offeredPrice.textContent = `${new Intl.NumberFormat('fa-IR').format(Math.round(product.price - (percent * product.price) / 100))} تومان`;
        priceBox.append(price, offeredPrice);

    }
    else {
        const price: HTMLElement = document.createElement("strong");
        price.textContent = `${new Intl.NumberFormat('fa-IR').format(product.price)} تومان`;
        priceBox.append(price);
    }




    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-describedby", title.id);
    cardFooter.append(priceBox, button);

    button.addEventListener("click", () => addToCart(product.name));
    

    const plus: HTMLElement = document.createElement("span");
    plus.textContent = "+";
    plus.setAttribute("aria-hidden", "true");
    const plusContent: HTMLElement = document.createElement("span");
    plusContent.textContent = "افزودن به سبد خرید";
    plusContent.classList.add("visually-hidden");
    button.append(plus, plusContent);

    if (label || !inStock) {
        const badge: HTMLElement = document.createElement("span");
        const badgeReader: HTMLElement = document.createElement("span");
        badgeReader.classList.add("visually-hidden");

        if (!inStock) {
            badge.textContent = "ناموجود";
            badgeReader.textContent = "ناموجود";
            card.classList.add("out-of-stock");
            badge.classList.add("stock-badge");
            button.disabled = true;
        }
        else if (label !== undefined && percent !== undefined) {
            badge.textContent = `${new Intl.NumberFormat('fa-IR').format(percent)} ٪`;
            badgeReader.textContent = label;
            badge.classList.add("discount-badge");
        }

        badge.append(badgeReader);

        card.append(img, badge, title, unit, cardFooter);
    }
    else {
        card.append(img, title, unit, cardFooter);
    }

    carouselItem.append(card);

    return carouselItem;
}


// Renders product cards inside the carousel with the given id.
// The first and last cards get ids (first-<id>, last-<id>) so the arrows can jump to them.
// data: array of products, queryId: id of the section (a string),
// offeredProducts: array from offers.json, stock: object from stock.json.
function renderProducts(data: Product[], queryId: string, offeredProducts: Offer[], stock: Stock) {
    const productList = data.map((item, index) => {
        const offer = offeredProducts.find(offered => offered.productId === item.id);
        let label: string | undefined;
        let percent: number | undefined;
        const inStock = stock.items[item.id] > 0;
        if (offer) {
            label = offer.label;
            percent = offer.percent;
        }

        const cardInfo: CardInfo = { inStock, label, percent };
        

        const productCard = createProductCard(item, cardInfo);
        if (index === 0) {
            productCard.id = `first-${queryId}`;
        }
        else if (index === data.length - 1) {
            productCard.id = `last-${queryId}`;
        }
        return productCard;

    });
    getHtmlElement<HTMLUListElement>(`#${queryId} ul`).append(...productList);
}

// Adds one product to the cart: shows a success toast, increases cartCount,
// saves it in localStorage and refreshes the counter in the header.
// productName: name of the product shown in the toast.
function addToCart(productName: string) {
    notyf.success(`محصول ${productName} با موفقیت به سبد خرید اضافه شد.`);
    const previousCount = cartCount;
    cartCount += 1;
    saveCartCount(cartCount);
    updateCartNumber(previousCount,cartCount);
}

// Shows the cart count in the header counter with Persian digits.
// startNumber/endNumber: the counter animates from the first to the second
// (equal numbers mean no animation). Animation is skipped if the user prefers reduced motion.
function updateCartNumber(startNumber : number ,endNumber : number) {
    const counter = getHtmlElement<HTMLElement>(".product-counter");
    const reduceMotion: boolean = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const countUp = new CountUp(counter, endNumber, {
        startVal: startNumber ,
        duration: reduceMotion ? 0 : 0.5,
        formattingFn: (n: number) => new Intl.NumberFormat('fa-IR').format(n),
    });
    countUp.start();
}

// Entry point: loads the data, then renders the carousels.
// Errors are caught here, because this is the one place that knows about the page.
async function init() {
    const containers = ["#dairy", "#special-products", ".categories"];
    try {
        containers.forEach(container => {
            renderStatus({status: 'loading'}, container)
        });

        const { categories, products, offeredProducts, stock, shop } = await getData();

        containers.forEach(container => {
            renderStatus({ status: 'success', products }, container)
        });
        updateCartNumber(cartCount,cartCount);
        renderCategories(categories);
        renderCategoryLinks(categories);
        renderShop(shop);

        //Get "لبنیات" products
        const categoryId = getCategoryID("لبنیات", categories);
        const filteredProducts = filterProductsByCategoryID(categoryId, products);

        //Get "پیشنهاد امروز" products
        const specialProducts = filterSpecialProducts(offeredProducts, products, stock);

        // Render the dairy and special products carousel
        if (filteredProducts.length === 0) {
            renderStatus({ status: 'empty' }, "#dairy");
        } 
        else {
            renderStatus({ status: 'success', products: filteredProducts }, "#dairy");
            renderProducts(filteredProducts, "dairy", offeredProducts, stock);
        }
        
        if (specialProducts.length === 0) {
            renderStatus({ status: 'empty' }, "#special-products");
        } 
        else {
            renderStatus({ status: 'success', products: specialProducts }, "#special-products");
            renderProducts(specialProducts, "special-products", offeredProducts, stock);
        }

    } catch (error) {
        const reason = error instanceof Error ? error.message : "خطای ناشناخته";
        containers.forEach(container => {
            renderStatus({status : 'error', message: `بارگذاری اطلاعات ممکن نشد. ${reason}`}, container)
        });
        console.error(error);
    }
}

init();
