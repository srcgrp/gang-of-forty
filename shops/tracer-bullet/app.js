function formatNumber(n) {
    return new Intl.NumberFormat('fa-IR').format(n);
}
function formatPrice(price) {
    return `${formatNumber(price)} تومان`;
}
function renderSchedule(section, schedule) {
    schedule.forEach(row => {
        const p = document.createElement("p");
        p.textContent = `${row.days}: ${row.time}`;
        section.append(p);
    });
}

/* land on the right section */
function scrollToHash() {
    if (!location.hash) {
        return;
    }
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
        target.scrollIntoView();
    }
}

function createCard(product) {
    const outOfStock = product.stock === 0;
    const li = document.createElement("li");

    if (outOfStock) {
        li.classList.add("out-of-stock");
    }

    const icon = document.createElement("span");
    icon.classList.add("emoji");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = product.emoji;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const meta = document.createElement("p");
    meta.classList.add("meta")
    meta.textContent = product.unit;

    const price = document.createElement("p");
    price.classList.add("price")

    if (product.newPrice) {
        const del = document.createElement("del");
        const oldPriceLabel = document.createElement("span");
        oldPriceLabel.classList.add("visually-hidden");
        oldPriceLabel.textContent = "قیمت قبلی";
        del.append(oldPriceLabel, " ", formatNumber(product.price))

        const newPriceLabel = document.createElement("span");
        newPriceLabel.classList.add("visually-hidden");
        newPriceLabel.textContent = "قیمت با تخفیف";
        price.append(del, newPriceLabel, " ", formatPrice(product.newPrice))
    } else {
        price.textContent = formatPrice(product.price);
    }

    const button = document.createElement("button")
    button.type = "button";
    button.textContent = "+";
    button.disabled = outOfStock;
    button.setAttribute("aria-label", outOfStock ? `${product.name}: ناموجود` : `افزودن ${product.name} به سبد خرید`);
    button.addEventListener("click", addToCart);

    li.append(icon);

    if (outOfStock) {
        const stockBadge = document.createElement("p");
        stockBadge.classList.add("badge");
        stockBadge.textContent = "ناموجود";
        li.append(stockBadge);
    } else if (product.percent) {
        const badge = document.createElement("p");
        badge.classList.add("badge");

        const hidden = document.createElement("span");
        hidden.classList.add("visually-hidden");
        hidden.textContent = "تخفیف";
        badge.append(hidden, " ", `${formatNumber(product.percent)}٪`);
        li.append(badge);
    }

    li.append(name, meta, price, button);
    return li;
}

/* replace everything in the carousel with one message */
function showMessage(carousel, text) {
    carousel.replaceChildren();
    const li = document.createElement("li");
    li.textContent = text;
    li.classList.add("message");
    carousel.append(li);
}

/* drawing functions */
function renderCategoryCarousel(carousel, data, categoryId, idPrefix) {
    const { products, offers, stock } = data;
    const items = products
        .filter(p => p.categoryId === categoryId)
        .map(p => withOfferAndStock(p, offers, stock));
    carousel.replaceChildren();
    items.forEach((product, index) => {
        const card = createCard(product);
        if (index === 0) {
            card.id = `${idPrefix}-first`;
        }
        if (index === items.length - 1) {
            card.id = `${idPrefix}-last`;
        }
        carousel.append(card);
    });
}

function renderSpecialOffers(carousel, data, idPrefix) {
    const { products, offers, stock } = data;
    const specialProducts = offers.map(offer => {
        const product = products.find(p => p.id === offer.productId);
        if (!product) {
            return null;
        }
        const productStock = stock.items[product.id];
        const newPrice = Math.round(product.price * (100 - offer.percent) / 100);

        return {
            name: product.name,
            emoji: product.emoji,
            unit: product.unit,
            id: product.id,
            price: product.price,
            newPrice: newPrice,
            percent: offer.percent,
            label: offer.label,
            stock: productStock,
        };
    }) .filter(Boolean);
     
    carousel.replaceChildren();
    specialProducts.forEach((item, index) => {
        const card = createCard(item);
        if (index === 0) {
            card.id = `${idPrefix}-first`;
        }
        if (index === specialProducts.length - 1) {
            card.id = `${idPrefix}-last`;
        }
        carousel.append(card);
    });
}

/* cart */
let cartCount = Number(localStorage.getItem("cartCount")) || 0;

function renderCartCount() {
    document.querySelector(".cartCount").textContent = formatNumber(cartCount);
    document.querySelector(".cartCountText").textContent = `${formatNumber(cartCount)} کالا در سبد`;
}

function addToCart() {
    cartCount++;
    localStorage.setItem("cartCount", cartCount);
    renderCartCount();
}

/* loading, show the messages, call drawing functions */
async function init() {

    const categoryList = document.querySelector("#categories .category-list")
    const dropDown = document.querySelector(".dropdown-menu")
    const footerCategories = document.querySelector("footer .footer-categories")
    const mainMenu = document.querySelector(".main-nav > ul");
    const helpList = document.querySelector(".footer-help");
    const hoursSection = document.querySelector("#working-hours");
    const hero = document.querySelector('#hero');
    const promo = document.querySelector('#promo')
    const banners = document.querySelector('#banners')
    const carouselsContainer = document.querySelector("#carousels");
    const searchInput = document.querySelector("#search");
    const errorText = "دسترسی به اینترنت را بررسی و صفحه را دوباره بارگذاری کنید";
    showMessage(categoryList, "در حال بارگذاری");
    showBlockMessage(carouselsContainer, "در حال بارگذاری");

    try {
        const data = await loadData();
        renderSearchPlaceholder(searchInput, data.products.length);
        renderCartCount();
        renderCarousels(carouselsContainer, data);
        renderCategories(categoryList, data.categories);
        renderCategoryLinks(dropDown, data.categories);
        renderCategoryLinks(footerCategories, data.categories);
        renderShopTexts(data.shop);
        renderLinks(mainMenu, data.shop.menu);
        renderLinks(helpList, data.shop.help);
        renderSchedule(hoursSection, data.shop.schedule);
        renderBanner(hero, data.home.hero);
        renderBanner(promo, data.home.side);
        renderPromos(banners, data.home.promos);
        scrollToHash();
    } catch (error) {
        console.error(error);
        showMessage(categoryList, "دسترسی به اینترنت را بررسی و صفحه را دوباره بارگذاری کنید");
        showBlockMessage(carouselsContainer, "دسترسی به اینترنت را برسی و صفحه را دوباره بارگذاری کنید");
    }
}
init();

function showBlockMessage(container, text) {
    container.replaceChildren();
    const p = document.createElement("p");
    p.textContent = text;
    p.classList.add("message")
    container.append(p);
}

/* share the data */

async function loadData() {
    const [productsRes, offersRes, stockRes, categoriesRes, shopRes, homeRes] = await Promise.all([
        fetch("../../api/products.json"),
        fetch("../../api/offers.json"),
        fetch("../../api/stock.json"),
        fetch("../../api/categories.json"),
        fetch("../../api/shop.json"),
        fetch("../../api/home.json"),
    ]);
    if (!productsRes.ok || !offersRes.ok || !stockRes.ok || !categoriesRes.ok || !shopRes.ok || !homeRes.ok) {
        throw new Error("Request failed")
    }
    const [products, offers, stock, categories, shop, home] = await Promise.all([
        productsRes.json(),
        offersRes.json(),
        stockRes.json(),
        categoriesRes.json(),
        shopRes.json(),
        homeRes.json(),
    ]);

    return { products, offers, stock, categories, shop, home };
}


function withOfferAndStock(product, offers, stock) {
    const offer = offers.find(o => o.productId === product.id);
    const result = { ...product, stock: stock.items[product.id] };
    if (offer) {
        result.percent = offer.percent
        result.label = offer.label
        result.newPrice = Math.round(product.price * (100 - offer.percent) / 100)
    }
    return result;
}

/* categories */

function createCategoryItem(category) {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = `#${category.slug}`;

    const icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = category.emoji;
    icon.style.background = category.color;

    link.append(icon, " ", category.name);
    li.append(link);
    return li;
}

function renderCategories(list, categories) {
    list.replaceChildren();
    categories.forEach(category => {
        list.append(createCategoryItem(category));
    })
}

function createCategoryLink(category) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${category.slug}`;
    link.textContent = category.name;
    li.append(link);
    return li;
}

function renderCategoryLinks(list, categories) {
    categories.forEach(category => {
        list.append(createCategoryLink(category));
    })
}

/* read shop.json */
function renderShopTexts(shop) {
    document.querySelector("header .notice").textContent = shop.notice;
    document.querySelector("footer .address").textContent = shop.address;
    const phoneLink = document.querySelector("footer .phone a");
    phoneLink.textContent = shop.phone;
    phoneLink.href = `tel:${shop.phone}`;
    document.querySelector("footer .about").textContent = shop.about;
    document.querySelector("header .logo-text .slogan").textContent = shop.slogan;
}

function createLinkItem(label, href) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    li.append(link);
    return li;
}

function renderLinks(list, items) {
    items.forEach(item => {
        list.append(createLinkItem(item.label, item.href));
    });
}

/* hero and side banner */
function renderBanner(section, banner) {
    const title = section.querySelector("h2");
    const text = section.querySelector("p");
    const link = section.querySelector("a");
    const emoji = section.querySelector("span")

    title.textContent = banner.title;
    emoji.textContent = banner.emoji
    emoji.append(title);
    text.textContent = banner.text;
    link.textContent = banner.cta.label;
    link.href = banner.cta.href;
}

/* promos */
function renderPromos(container, promos) {
    container.replaceChildren();
    promos.forEach(promo => {
        const link = document.createElement("a");
        link.href = promo.href;

        const emoji = document.createElement("span");
        emoji.setAttribute("aria-hidden", "true");
        emoji.textContent = promo.emoji;

        link.append(promo.text, " ", emoji);
        container.append(link);
    });
}

function renderBanner(section, banner) {
    const title = section.querySelector("h2");
    const text = section.querySelector("p");
    const link = section.querySelector("a");

    const emoji = document.createElement("span");
    emoji.setAttribute("aria-hidden", "true");
    emoji.textContent = banner.emoji;

    title.textContent = banner.title;
    title.append(" ", emoji);
    text.textContent = banner.text;
    link.textContent = banner.cta.label;
    link.href = banner.cta.href;
}

/* build carousels */
/* arrow link */
function createArrowLink(href, arrow, hiddenText) {
    const link = document.createElement("a");
    link.href = href;

    const arrowSpan = document.createElement("span");
    arrowSpan.setAttribute("aria-hidden", "true");
    arrowSpan.textContent = arrow;

    const textSpan = document.createElement("span");
    textSpan.classList.add("visually-hidden");
    textSpan.textContent = hiddenText;

    link.append(arrowSpan, " ", textSpan);
    return link;
}

function createCarouselSection(def) {
    const section = document.createElement("section");
    section.id = def.id;
    section.setAttribute("aria-labelledby", `${def.id}-title`);

    const head = document.createElement("div");
    head.classList.add("section-head");

    const heading = document.createElement("h2");
    heading.id = `${def.id}-title`;
    const emoji = document.createElement("span");
    emoji.setAttribute("aria-hidden", "true");
    emoji.textContent = def.emoji;
    heading.append(emoji, " ", def.title);

    const nav = document.createElement("div");
    nav.classList.add("carousel-nav");
    nav.append(
        createArrowLink(`#${def.id}-first`, "→", `رفتن به ابتدای ${def.title}`),
        createArrowLink(`#${def.id}-last`, "←", `رفتن به انتهای ${def.title}`)
    );
    const list = document.createElement("ul");
    list.classList.add("carousel");

    head.append(heading, nav);
    section.append(head, list);
    return { section, list };
}

function renderCarousels(container, data) {
    container.replaceChildren();
    data.home.carousels.forEach(def => {
        const { section, list } = createCarouselSection(def);
        container.append(section);

        if (def.source === "offers") {
            renderSpecialOffers(list, data, def.id);
        } else {
            renderCategoryCarousel(list, data, def.categoryId, def.id);
        }
    });
}

/* render search placeholder */
function renderSearchPlaceholder(input, count) {
    input.placeholder = `جستجو در میان ${formatNumber(count)} کالا…`;
}
