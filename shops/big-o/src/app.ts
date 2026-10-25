import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { CountUp } from 'countup.js';


type Category = {
    id: number,
    slug: string,
    name: string,
    emoji: string
};

type Product = { 
    id: number,
    categoryId: number,
    name: string,
    emoji: string,
    unit: string,
    price: number,
    tags: string[]
};

type Offer = {
    productId: number,
    percent: number,
    label: string
};

type Stock = {
    updatedAt: string,
    items: Record<string,number>
};

type Shop = {
    name: string,
    slogan: string,
    owner: string,
    city: string,
    phone: string,
    hours: { open: string, close: string },
    deliveryFee: number,
    freeDeliveryOver: number,
    currency: string
}


const notyf = new Notyf({
    position: { x: "center", y: "top" },
});
let cartCount: number = Number(localStorage.getItem("big-o-cart"));
if(Number.isNaN(cartCount)) {
    cartCount = 0;
}

// Fetches one JSON file and returns its parsed data.
// Throws if the request fails or the response is not ok (e.g. 404),
// so the caller can show an error message.
// url: path to the JSON file, objectName: used in the error message.
async function getDataObjects(url: string, objectName: string) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Failed to fetch ${objectName}`);
    }

    const resData = await res.json();
    return resData;
}


// Loads categories, products, offers and stock in parallel with Promise.all,
// so total wait time is the slowest request, not the sum.
// Returns { categories, products, offeredProducts, stock, shop }.
// Any failure is rethrown to the caller.
async function getData() {
    const [categories, products, offeredProducts, stock, shop] = await Promise.all([
        getDataObjects('../../api/categories.json', "categories"),
        getDataObjects('../../api/products.json', "products"),
        getDataObjects('../../api/offers.json', "offeredProducts"),
        getDataObjects('../../api/stock.json', "stock"),
        getDataObjects('../../api/shop.json', "shop")]);
    return { categories, products, offeredProducts, stock, shop };
}

// Finds a category by its name and returns its id.
// categories: array from categories.json, name: the category to look for.
// Note: find() returns undefined if nothing matches.
function getCategoryID(name: string, categories: Category[]) {
    const categoryItem = categories.find(element => element.name === name);
    if(categoryItem === undefined) {
        throw new Error(`There isn't any category with ${name} name`);
    }
    return categoryItem.id;
    
}


// Returns only the products that belong to the given category.
// id: category id (a number), products: array from products.json.
function filterProductsByCategoryID(id: number, products: Product[]) {
    const filteredProducts = products.filter(item => item.categoryId === id);
    return filteredProducts;
}


// Returns only the products that have a discount and are in stock.
// offers: array from offers.json, products: array from products.json,
// stock: object from stock.json (stock.items[id] is the quantity).
function filterSpecialProducts(offers: Offer[], products: Product[], stock: Stock) {
    const specialProducts = products.filter(item => offers.some(offer => item.id === offer.productId) && stock.items[item.id] > 0);
    return specialProducts;
}

// Define object for keeping inStock : Remain number of products, label: Name of offer, percent: the percentage of offer on product.
type CardInfo = {
    inStock?: boolean,
    label? : string,
    percent? : number
};

// Get html element and return error if it doesn't exist.
function getHtmlElement<Type extends Element>(selector: string, parent: ParentNode = document): Type {
    const element = parent.querySelector<Type>(selector);
    if (element === null) throw new Error(`The ${selector} selector doesn't exist.`)
    return element;
}

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

type MessageType = "load" | "error"
// Show message for loading data and errors
// container: html tag which message be shown in that, text : the content of message, type: load or error
function showMessage(container: string, text: string, type: MessageType ) {
    const content: HTMLParagraphElement = document.createElement("p");
    content.textContent = text;
    content.classList.add("msg");

    if (type === "load") {
        content.classList.add("load-msg");
        content.setAttribute("role", "status");
    }
    else {
        content.classList.add("error-msg");
        content.setAttribute("role", "alert");
    }
    const box = document.querySelector<HTMLElement>(container);
    if ( box === null) {
        console.error(`index.html is missing ${container} element`)
    }
    else{
        box.append(content);
    }
}

// Removes the message (loading or error) shown by showMessage.
// container: CSS selector of the section that holds it (e.g. "#dairy").
// Does nothing if there is no message.
function clearMessage(container: string) {
    const box = document.querySelector<HTMLElement>(container);
    if ( box === null) {
        console.error(`index.html is missing ${container} element`)
    }else {
        const message = box.querySelector(".msg");
        message?.remove(); 
    }  
}

// Renders the category list from the template in the HTML.
// categoryData: array from categories.json.
// Each category gets an emoji, a name and a link to #<slug>.
function renderCategories(categoryData: Category[]) {
    const categoryList = getHtmlElement<HTMLUListElement>(".categories ul");
    const template = getHtmlElement<HTMLTemplateElement>("#category-template");
    categoryData.forEach(category => {
        const clone = document.importNode(template.content, true);
        getHtmlElement<HTMLAnchorElement>("a", clone).setAttribute("href", `#${category.slug}`);
        getHtmlElement<HTMLSpanElement>("a span", clone).textContent = category.emoji;
        getHtmlElement<HTMLHeadingElement>("a h3", clone).textContent = category.name;
        categoryList.append(clone);
        
    });
}

type LinkItem = {
    label: string,
    href: string
};

// Builds an li with a link inside it.
// item: { label, href }
function createLinkItem(item: LinkItem) {
    const li: HTMLLIElement = document.createElement("li");
    const a: HTMLAnchorElement = document.createElement("a");
    a.textContent = item.label;
    a.href = item.href;
    li.append(a);
    return li;
}


// Fills the "all categories" submenu and the footer category list from categories.json.
// categoryData: array from categories.json.
function renderCategoryLinks(categoryData: Category[]) {
    const links = categoryData.map(category => createLinkItem({ label: category.name, href: `#${category.slug}` }));
    getHtmlElement<HTMLUListElement>(".mega-menu").replaceChildren(...links);
    getHtmlElement<HTMLUListElement>("#quick-links + ul").replaceChildren(
        ...categoryData.map(category =>
            createLinkItem({ label: category.name, href: `#${category.slug}` })));
}

// Converts Latin digits in a string to Persian digits.
function toPersianDigits(text: string) {
    return text.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}

// Fills the notice bar, tagline, phone and opening hours from shop.json.
// shop: object from shop.json.
function renderShop(shop: Shop) {
    const formatter = new Intl.NumberFormat('fa-IR');

    getHtmlElement<HTMLParagraphElement>(".announcement p").textContent =
        `ارسال رایگان برای خریدهای بالای ${formatter.format(shop.freeDeliveryOver)} ${shop.currency}`;

    getHtmlElement<HTMLParagraphElement>(".title p").textContent = shop.slogan;

    const phoneLink = getHtmlElement<HTMLAnchorElement>("address a");
    getHtmlElement<HTMLElement>("bdi", phoneLink).textContent = toPersianDigits(shop.phone).replace("-", "\u2011");
    phoneLink.href = `tel:${shop.phone.replace(/[^\d+]/g, "")}`;
    
    const hours: HTMLParagraphElement = document.createElement("p");
    hours.textContent = `هر روز ${toPersianDigits(shop.hours.open)} تا ${toPersianDigits(shop.hours.close)}`;
    
    getHtmlElement<HTMLElement>(".info").append(hours);
}

// Adds one product to the cart: shows a success toast, increases cartCount,
// saves it in localStorage and refreshes the counter in the header.
// productName: name of the product shown in the toast.
function addToCart(productName: string) {
    notyf.success(`محصول ${productName} با موفقیت به سبد خرید اضافه شد.`);
    const previousCount = cartCount;
    cartCount += 1;
    localStorage.setItem("big-o-cart", String(cartCount));
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
            showMessage(container, "در حال بارگذاری…", "load");
        });

        const { categories, products, offeredProducts, stock, shop } = await getData();

        containers.forEach(container => {
            clearMessage(container);
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
        renderProducts(filteredProducts, "dairy", offeredProducts, stock);
        renderProducts(specialProducts, "special-products", offeredProducts, stock);

    } catch (error) {
        containers.forEach(container => {
            clearMessage(container);
        });
        containers.forEach(container => {
            showMessage(container, "بارگذاری اطلاعات ممکن نشد. اینترنت را بررسی کنید.", "error");
        });
        console.error(error);
    }
}

init();
