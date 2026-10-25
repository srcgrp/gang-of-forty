// Fetches one JSON file and returns its parsed data.
// Throws if the request fails or the response is not ok (e.g. 404),
// so the caller can show an error message.
// url: path to the JSON file, objectName: used in the error message.
async function getDataObjects(url, objectName) {
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
function getCategoryID(name, categories) {
    const categoryItem = categories.find(element => element.name === name);
    return categoryItem.id;
}


// Returns only the products that belong to the given category.
// id: category id (a number), products: array from products.json.
function filterProductsByCategoryID(id, products) {
    const filteredProducts = products.filter(item => item.categoryId === id);
    return filteredProducts;
}


// Returns only the products that have a discount and are in stock.
// offers: array from offers.json, products: array from products.json,
// stock: object from stock.json (stock.items[id] is the quantity).
function filterSpecialProducts(offers, products, stock) {
    const specialProducts = products.filter(item => offers.some(offer => item.id === offer.productId) && stock.items[item.id] > 0);
    return specialProducts;
}


// Builds one product card (an li element) from a product and returns it.
// product: an item from products.json.
// cardInfo: { percent, label, inStock }
//   percent/label: discount from offers.json (undefined if no discount),
//   inStock: false shows the "ناموجود" badge instead of the discount badge.
function createProductCard(product, cardInfo = {}) {
    const carouselItem = document.createElement("li");
    const { percent, label, inStock = true } = cardInfo;

    const card = document.createElement("article");
    card.classList.add("product-card");

    const img = document.createElement("span");
    img.textContent = product.emoji;
    img.classList.add("product-img");
    img.setAttribute("aria-hidden", "true");


    const title = document.createElement("h3");
    title.textContent = product.name;
    title.id = `product-${product.id}`;

    const unit = document.createElement("p");
    unit.textContent = product.unit;

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");

    const priceBox = document.createElement("div");
    priceBox.classList.add("price");



    if (percent) {
        const price = document.createElement("del");
        price.textContent = `${new Intl.NumberFormat('fa-IR').format(product.price)} تومان`;

        const offeredPrice = document.createElement("strong");
        offeredPrice.textContent = `${new Intl.NumberFormat('fa-IR').format(Math.round(product.price - (percent * product.price) / 100))} تومان`;
        priceBox.append(price, offeredPrice);

    }
    else {
        const price = document.createElement("strong");
        price.textContent = `${new Intl.NumberFormat('fa-IR').format(product.price)} تومان`;
        priceBox.append(price);
    }




    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-describedby", title.id);
    cardFooter.append(priceBox, button);

    const plus = document.createElement("span");
    plus.textContent = "+";
    plus.setAttribute("aria-hidden", "true");
    const plusContent = document.createElement("span");
    plusContent.textContent = "افزودن به سبد خرید";
    plusContent.classList.add("visually-hidden");
    button.append(plus, plusContent);

    if (label || !inStock) {
        const badge = document.createElement("span");
        const badgeReader = document.createElement("span");
        badgeReader.classList.add("visually-hidden");

        if (!inStock) {
            badge.textContent = "ناموجود";
            badgeReader.textContent = "ناموجود";
            card.classList.add("out-of-stock");
            badge.classList.add("stock-badge");
            button.disabled = true;
        }
        else if (label) {
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
function renderProducts(data, queryId, offeredProducts, stock) {
    const productList = data.map((item, index) => {
        const offered = offeredProducts.find(offered => offered.productId === item.id);
        let label;
        let percent;
        const inStock = stock.items[item.id] > 0;
        if (offered) {
            label = offered.label;
            percent = offered.percent;
        }

        const cardInfo = { inStock, label, percent };

        const productCard = createProductCard(item, cardInfo);
        if (index === 0) {
            productCard.id = `first-${queryId}`;
        }
        if (index === data.length - 1) {
            productCard.id = `last-${queryId}`;
        }
        return productCard;

    });
    const htmlTag = document.querySelector(`#${queryId}`);
    htmlTag.querySelector("ul").append(...productList);
}


// Show message for loading data and errors
// container: html tag which message be shown in that, text : the content of message, type: load or error
function showMessage(container, text, type) {
    const content = document.createElement("p");
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
    document.querySelector(container).append(content);
}

// Removes the message (loading or error) shown by showMessage.
// container: CSS selector of the section that holds it (e.g. "#dairy").
// Does nothing if there is no message.
function clearMessage(container) {
    const box = document.querySelector(container);
    const message = box.querySelector(".msg");
    message?.remove();
}

// Renders the category list from the template in the HTML.
// categoryData: array from categories.json.
// Each category gets an emoji, a name and a link to #<slug>.
function renderCategories(categoryData) {
    const categoryList = document.querySelector(".categories ul");
    const template = document.querySelector("#category-template");
    categoryData.forEach(category => {
        const clone = template.content.cloneNode(true);
        clone.querySelector("a").setAttribute("href", `#${category.slug}`);
        clone.querySelector("a span").textContent = category.emoji;
        clone.querySelector("a h3").textContent = category.name;
        categoryList.append(clone);
    });
}


// Builds an li with a link inside it.
// item: { label, href }
function createLinkItem(item) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = item.label;
    a.href = item.href;
    li.append(a);
    return li;
}


// Fills the "all categories" submenu and the footer category list from categories.json.
// categoryData: array from categories.json.
function renderCategoryLinks(categoryData) {
    const links = categoryData.map(category =>
        createLinkItem({ label: category.name, href: `#${category.slug}` }));
    document.querySelector(".mega-menu").replaceChildren(...links);
    document.querySelector("#quick-links + ul").replaceChildren(
        ...categoryData.map(category =>
            createLinkItem({ label: category.name, href: `#${category.slug}` })));
}

// Converts Latin digits in a string to Persian digits.
function toPersianDigits(text) {
    return text.replace(/\d/g, digit => "۰۱۲۳۴۵۶۷۸۹"[digit]);
}

// Fills the notice bar, tagline, phone and opening hours from shop.json.
// shop: object from shop.json.
function renderShop(shop) {
    const formatter = new Intl.NumberFormat('fa-IR');

    document.querySelector(".announcement p").textContent =
        `ارسال رایگان برای خریدهای بالای ${formatter.format(shop.freeDeliveryOver)} ${shop.currency}`;

    document.querySelector(".title p").textContent = shop.slogan;

    const phoneLink = document.querySelector("address a");
    phoneLink.querySelector("bdi").textContent = toPersianDigits(shop.phone).replace("-", "\u2011");
    phoneLink.href = `tel:${shop.phone.replace(/[^\d+]/g, "")}`;
    
    const hours = document.createElement("p");
    hours.textContent = `هر روز ${toPersianDigits(shop.hours.open)} تا ${toPersianDigits(shop.hours.close)}`;
    
    document.querySelector(".info").append(hours);
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
