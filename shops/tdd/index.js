const PRODUCTS_URL = "../../api/products.json"
const STOCK_URL = "../../api/stock.json";
const OFFERS_URL = "../../api/offers.json";
const CATEGORIES_URL = "../../api/categories.json";
const SHOP_URL = "../../api/shop.json";

const priceFormatter = new Intl.NumberFormat("fa-IR")

const HOME_URL = "../../api/home.json";
const CART_KEY = "tdd:w2:cart-count";
let cartCount = 0;
const brandStory = {"paragraphs": ["سام مارکت، سوپرمارکت سام در پروژه بوتکمپ است؛ با یک سبد برای نیازهای روزمره و یک داستان از دنیای برنامه‌نویسی. نام پروژه، TDD، یادآور هدف سام است: تسلط بر توسعه آزمون‌محور تا پایان بوتکمپ.", "در توسعه آزمون‌محور، اول یک تست ناموفق می‌نویسیم، بعد کد لازم برای پاس‌شدن آن را می‌سازیم و در پایان ساختار کد را بهبود می‌دهیم. سام از این نگاه برای ایده ارزیابی تازگی الهام گرفته: اول معیار مشخص، بعد بررسی محصول و در ادامه بهبود شیوه انتخاب. این فرایند، طرح پیشنهادی برند در پروژه بوتکمپ فرانت اند است؛ چرخه نرم‌افزاری TDD الهام آن است."], "steps": [{"title": "قرمز؛ اول معیار، بعد انتخاب", "text": "در TDD، تست پیش از راه‌حل نوشته می‌شود. در ایده سام، معیار تازگی را پیش از انتخاب مشخص می‌کنیم؛ محصولی که با معیار هماهنگ نیست، نیاز به بررسی دارد."}, {"title": "سبز؛ انتخاب پس از ارزیابی", "text": "همان‌طور که کد باید تست را پاس کند، در فرایند پیشنهادی سام هم انتخاب محصول باید با معیارهای تعریف‌شده هماهنگ باشد؛ تازگی، پشتوانه انتخاب است."}, {"title": "آبی؛ بهترشدن فرایند", "text": "در بازآرایی، ساختار کد بهتر می‌شود و تست‌ها همچنان موفق می‌مانند. در ایده فروشگاه هم بازخوردها به بهترشدن ارزیابی و نگهداری کمک می‌کنند؛ با حفظ معیار تازگی."}]};

async function loadJSON(url) {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${url}`)
    }
    return response.json()
}


function showStatus(carousel, message, isError = false) {
    carousel.status.textContent = message;
    carousel.status.classList.toggle("is-error", isError);
}

function createProductCard(product, cardId, quantity, offer) {
    const titleId = `${cardId}-name`
    const statusId = `${cardId}-status`;

    const isUnavailable = quantity === 0

    let finalPrice = product.price
    if (offer) {
        finalPrice = Math.round(product.price * (1 - offer.percent / 100))
    }

    const card = document.createElement("article")
    card.className = "product-card"
    card.id = cardId
    card.setAttribute("aria-labelledby", titleId)
    card.classList.toggle("is-unavailable", isUnavailable);

    const imageContainer = document.createElement("div")
    imageContainer.className = "product-image"

    const icon = document.createElement("span")
    icon.className = "product-icon"
    icon.setAttribute("aria-hidden", "true")
    icon.textContent = product.emoji

    imageContainer.append(icon)

    //discount badge
    if (offer) {
        const discountBadge = document.createElement("span")
        discountBadge.className = "discount-badge"
        discountBadge.textContent = `${priceFormatter.format(offer.percent)}٪ تخفیف`
        imageContainer.append(discountBadge)
    }

    //unavailable badge
    if (isUnavailable) {
        const stockBadge = document.createElement("span")
        stockBadge.className = "stock-badge"
        stockBadge.textContent = "ناموجود"
        stockBadge.setAttribute("aria-hidden", "true");
        imageContainer.append(stockBadge)
    }

    const title = document.createElement("h3")
    title.id = titleId
    title.textContent = product.name
    
    //price
    const prices = document.createElement("div")
    prices.className = "product-prices"

    if(offer) {
        const previousPrice = document.createElement("p")
        previousPrice.className = "previous-price";

        const oldPriceValue = document.createElement("del");
        oldPriceValue.textContent =`${priceFormatter.format(product.price)} تومان`;

        previousPrice.append("قیمت قبلی: ", oldPriceValue);
        prices.append(previousPrice);
    }
    const currentPrice = document.createElement("p")
    currentPrice.className = "current-price"

    const priceValue = document.createElement("strong")
    priceValue.textContent = priceFormatter.format(finalPrice)
    
    const priceLabel = offer ? "قیمت با تخفیف: " : "قیمت: ";

    currentPrice.append(priceLabel, priceValue, " تومان")
    prices.append(currentPrice)


    //amount
    const amount = document.createElement("p")
    amount.className = "product-amount"
    amount.textContent = product.unit

    if(isUnavailable) {
        const stockStatus = document.createElement("p")
        stockStatus.className = "stock-status"
        stockStatus.id = statusId
        stockStatus.textContent = "ناموجود"

        prices.append(stockStatus);
        card.setAttribute("aria-describedby", statusId);
    }

    const addButton = document.createElement("button")
    addButton.className = "add-button"
    addButton.type = "button"
    addButton.setAttribute("aria-label", `افزودن ${product.name} به سبد خرید`)
    addButton.disabled = isUnavailable;
    addButton.addEventListener("click", () => {
        if (!isUnavailable) addToCart();
    });

    const buttonIcon = document.createElement("span");
    buttonIcon.setAttribute("aria-hidden", "true");
    buttonIcon.textContent = isUnavailable ? "×" : "+";

    addButton.append("افزودن به سبد ", buttonIcon);


    card.append(imageContainer, title, amount, prices, addButton)
    
    return card
}

function renderProducts(carousel, products, stock, offers) {
    carousel.track.replaceChildren()
    carousel.controls.hidden = true

    if (products.length === 0) {
        showStatus(carousel, "محصولی برای نمایش وجود ندارد.")
        return
    }

    products.forEach((product, index) => {
        let cardId = `${carousel.prefix}-product-${product.id}`

        if(index === 0)
            cardId = `${carousel.prefix}-first`
        else if (index === products.length - 1)
            cardId = `${carousel.prefix}-last`

        const quantity = stock.items[product.id]

        if (!Number.isInteger(quantity) || quantity < 0){
            throw new Error(`Invalid stock for product ${product.id}`)
        }

        const offer = offers.find(item => item.productId === product.id)

        const card = createProductCard(product, cardId, quantity, offer)

        carousel.track.append(card)

    })

    const firstLink =
        carousel.controls.querySelector("a:first-child");

    const lastLink =
        carousel.controls.querySelector("a:last-child");

    firstLink.setAttribute(
        "href",
        `#${carousel.prefix}-first`
    );

    lastLink.setAttribute(
        "href",
        products.length === 1
        ? `#${carousel.prefix}-first`
        : `#${carousel.prefix}-last`
    );

    showStatus(carousel, "");
    carousel.controls.hidden = false;
}

// Level 3: one category dataset supplies all navigation and destinations.
function createTextElement(tag, text, className) {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
}

function createLink(label, href) {
    const link = createTextElement("a", label);
    link.setAttribute("href", href);
    return link;
}

function renderCategories(categories, products = []) {
    const grid = document.querySelector("#category-grid");
    const sections = document.querySelector("#category-sections");
    const menus = [
        document.querySelector("#desktop-categories"),
        document.querySelector("#mobile-categories"),
        document.querySelector("#footer-categories")
    ];

    grid.replaceChildren();
    sections.replaceChildren();
    menus.forEach(menu => menu.replaceChildren());

    categories.forEach(category => {
        const href = `#${category.slug}`;
        const link = createLink("", href);
        const icon = createTextElement("span", category.emoji);
        icon.setAttribute("aria-hidden", "true");
        icon.style.background = category.color;
        link.append(icon, createTextElement("strong", category.name));
        grid.append(link);

        menus.forEach(menu => menu.append(createLink(category.name, href)));

        if (document.getElementById(category.slug)) return;
        // Categories without a configured carousel retain their own destination.
        const section = document.createElement("article");
        section.id = category.slug;
        section.setAttribute("aria-labelledby", `category-${category.id}-title`);
        const sectionIcon = createTextElement("span", category.emoji);
        sectionIcon.setAttribute("aria-hidden", "true");
        sectionIcon.style.background = category.color;
        const copy = document.createElement("div");
        const heading = createTextElement("h2", category.name);
        heading.id = `category-${category.id}-title`;
        const categoryProducts = products.filter(product => product.categoryId === category.id);
        copy.append(heading);
        if (categoryProducts.length) {
            copy.append(createTextElement("p", categoryProducts.map(product => product.name).join("، ")));
        }
        section.append(sectionIcon, copy);
        sections.append(section);
    });
}

// Links use the API fragment IDs.
function shopHref(href) {
    return href;
}

function renderShop(shop) {
    document.querySelector("#shop-notice").textContent = shop.notice;
    document.querySelector("#shop-slogan").textContent = shop.slogan;
    renderAbout(shop.about);
    document.querySelector("#footer-about-text").textContent = shop.about;

    const address = document.querySelector("#shop-address");
    const phone = createLink(shop.phone, `tel:${shop.phone.replace(/[^+0-9]/g, "")}`);
    phone.dir = "ltr";
    address.replaceChildren(
        document.createTextNode(shop.address),
        document.createElement("br"),
        phone
    );

    const schedule = document.querySelector("#shop-schedule");
    schedule.replaceChildren(createTextElement("h3", "ساعت کاری"));
    shop.schedule.forEach(entry => {
        schedule.append(createTextElement("p", `${entry.days}: ${entry.time}`));
    });

    // Keep our own brand while using the API's copyright text.
    const shopName = document.querySelector(".brand strong").textContent;
    document.querySelector("#shop-copyright").textContent =
        shop.copyright.replaceAll(shop.name, shopName);

    [".desktop-navigation", ".mobile-navigation"].forEach(selector => {
        const menu = document.querySelector(selector);
        menu.querySelectorAll("[data-shop-link]").forEach(link => link.remove());
        shop.menu.forEach(item => {
            const link = createLink(item.label, shopHref(item.href));
            link.dataset.shopLink = "";
            menu.append(link);
        });
    });
}

// Measure the actual sticky header rather than adding two fixed CSS offsets.
function fragmentTarget(hash) {
    let id;
    try {
        id = decodeURIComponent(hash.slice(1));
    } catch {
        return null;
    }
    const aliases = {
        "special-offers": "offers",
        "dairy-products": "dairy",
        fruit: "fruits",
        herbs: "fruits",
        proteins: "protein",
        sweets: "bakery",
        "daily-essentials": "dairy"
    };
    return document.getElementById(aliases[id] || id);
}

function scrollToFragment(animate = true) {
    const target = fragmentTarget(location.hash);
    document.querySelectorAll(".is-fragment-target").forEach(element => {
        element.classList.remove("is-fragment-target");
    });
    if (!target) return;
    target.classList.add("is-fragment-target");
    const behavior = animate && !matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "smooth" : "instant";
    const headerHeight = document.querySelector(".site-header").getBoundingClientRect().height;
    const track = target.closest(".product-track");
    const section = track ? target.closest(".product-carousel") : target;

    if (track) {
        // Move the RTL track horizontally without letting it move the page vertically.
        const padding = parseFloat(getComputedStyle(track).scrollPaddingInlineStart) || 0;
        track.scrollBy({
            left: target.getBoundingClientRect().right - track.getBoundingClientRect().right + padding,
            behavior
        });
    }

    window.scrollTo({
        top: Math.max(0, scrollY + section.getBoundingClientRect().top - headerHeight - 12),
        behavior
    });
}

document.addEventListener("click", event => {
    if (event.defaultPrevented || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest("a[href]");
    if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname ||
        url.search !== location.search || !url.hash || !fragmentTarget(url.hash)) return;

    event.preventDefault();
    document.querySelector(".mobile-menu").open = false;
    if (location.hash !== url.hash) history.pushState(null, "", url.hash);
    requestAnimationFrame(() => scrollToFragment());
});

window.addEventListener("hashchange", () => scrollToFragment());

// Keep native fragment offsets correct too, including when the viewport changes.
const headerObserver = new ResizeObserver(() => {
    const height = document.querySelector(".site-header").getBoundingClientRect().height;
    document.documentElement.style.setProperty("--header-offset", `${height + 12}px`);
});
headerObserver.observe(document.querySelector(".site-header"));

function renderCartCount() {
    const formatted = priceFormatter.format(cartCount);
    document.querySelector("#cart-count").textContent = formatted;
    document.querySelector(".cart").setAttribute("aria-label", `سبد خرید، ${formatted} کالا`);
}

function restoreCart() {
    try {
        const saved = Number(localStorage.getItem(CART_KEY));
        cartCount = Number.isSafeInteger(saved) && saved >= 0 ? saved : 0;
    } catch {
        cartCount = 0;
    }
    renderCartCount();
}

function addToCart() {
    if (cartCount >= Number.MAX_SAFE_INTEGER) return;
    cartCount += 1;
    renderCartCount();
    const status = document.querySelector("#cart-status");
    try {
        localStorage.setItem(CART_KEY, String(cartCount));
        status.textContent = "";
    } catch {
        status.textContent = "کالا اضافه شد؛ ذخیره سبد برای مراجعه بعدی در این مرورگر ممکن نیست.";
    }
}

window.addEventListener("storage", event => {
    if (event.key === CART_KEY || event.key === null) restoreCart();
});

function renderAbout(about) {
    const section = document.querySelector("#about");
    const heading = createTextElement("h2", "داستان سام مارکت");
    heading.id = "about-title";
    const prose = document.createElement("div");
    prose.className = "about-columns";
    const introduction = document.createElement("div");
    introduction.append(
        createTextElement("p", about),
        createTextElement("p", brandStory.paragraphs[0])
    );
    const explanation = document.createElement("div");
    brandStory.paragraphs.slice(1).forEach(text => {
        explanation.append(createTextElement("p", text));
    });
    prose.append(introduction, explanation);
    section.replaceChildren(heading, prose);
    const steps = document.createElement("div");
    steps.className = "store-sections";
    brandStory.steps.forEach((step, index) => {
        const article = document.createElement("article");
        const icon = createTextElement("span", ["🔴", "🟢", "🔵"][index]);
        icon.setAttribute("aria-hidden", "true");
        const copy = document.createElement("div");
        copy.append(createTextElement("h3", step.title), createTextElement("p", step.text));
        article.append(icon, copy);
        steps.append(article);
    });
    section.append(steps);
}

function renderBanners(home) {
    const banners = document.querySelector("#home-banners");
    const hero = document.createElement("section");
    hero.className = "hero";
    hero.setAttribute("aria-labelledby", "hero-title");
    const copy = document.createElement("div");
    copy.className = "hero-copy";
    const eyebrow = createTextElement("p", "تازگی، از ارزیابی تا انتخاب", "eyebrow");
    eyebrow.prepend(document.createElement("span"));
    const title = createTextElement("h1", home.hero.title);
    title.id = "hero-title";
    const actions = document.createElement("div");
    actions.className = "hero-actions";
    const primary = createLink(home.hero.cta.label, home.hero.cta.href);
    primary.className = "hero-primary-action";
    const secondary = createLink("داستان سام مارکت", "#about");
    secondary.className = "hero-secondary-action";
    actions.append(primary, secondary);
    const benefits = document.createElement("ul");
    benefits.className = "hero-benefits";
    ["قیمت‌های روشن", "انتخاب روز", "سبد به‌صرفه"].forEach(text => {
        benefits.append(createTextElement("li", text));
    });
    copy.append(eyebrow, title, createTextElement("p", home.hero.text), actions, benefits);

    const visual = document.createElement("div");
    visual.className = "hero-visual";
    const frame = document.createElement("div");
    frame.className = "hero-image-frame";
    const image = document.createElement("img");
    image.src = "1.jpg";
    image.alt = "نارنگی‌های تازه و رسیده در سبد محصول";
    frame.append(image);
    const freshness = createTextElement("p", "", "freshness-card");
    freshness.append(
        createTextElement("strong", "انتخاب امروز سام"),
        createTextElement("span", "تازه، خوش‌رنگ و آماده برای سبد تو")
    );
    const orbit = document.createElement("div");
    orbit.className = "tdd-orbit";
    orbit.setAttribute("aria-hidden", "true");
    [["معیار", "orbit-red"], ["انتخاب", "orbit-green"], ["بهبود", "orbit-blue"]]
        .forEach(([text, className]) => orbit.append(createTextElement("span", text, className)));
    visual.append(frame, freshness, orbit);
    hero.append(copy, visual);
    banners.replaceChildren(hero);

    const promos = document.querySelector("#home-promos");
    promos.replaceChildren();
    home.promos.forEach((promo, index) => {
        const article = document.createElement("article");
        article.className = index % 2 === 0 ? "promo promo-primary" : "promo promo-secondary";
        const content = document.createElement("div");
        content.append(
            createTextElement("h2", promo.text),
            createLink("مشاهده محصولات", promo.href)
        );
        const emoji = createTextElement("span", promo.emoji);
        emoji.setAttribute("aria-hidden", "true");
        article.append(content, emoji);
        promos.append(article);
    });

    // The second API banner uses the original photographic story design.
    const story = document.querySelector("#home-side");
    story.setAttribute("aria-labelledby", "side-title");
    const photo = document.createElement("div");
    photo.className = "story-image";
    const sideImage = document.createElement("img");
    sideImage.src = "labaniat.jpg";
    sideImage.alt = "لبنیات تازه";
    photo.append(sideImage, createTextElement("span", home.side.title));
    const sideCopy = document.createElement("div");
    const sideTitle = createTextElement("h2", home.side.title);
    sideTitle.id = "side-title";
    sideCopy.append(
        sideTitle,
        createTextElement("p", home.side.text),
        createLink(home.side.cta.label, home.side.cta.href)
    );
    story.replaceChildren(photo, sideCopy);
}

function renderHomeCarousels(configurations, products, stock, offers) {
    const container = document.querySelector("#home-carousels");
    container.replaceChildren();
    configurations.forEach(config => {
        const section = document.createElement("section");
        section.className = "product-carousel";
        section.id = config.id;
        const headingId = `${config.id}-title`;
        section.setAttribute("aria-labelledby", headingId);
        const header = document.createElement("header");
        header.className = "section-heading";
        const heading = createTextElement("h2", `${config.emoji} ${config.title}`);
        heading.id = headingId;
        header.append(heading);

        const controls = document.createElement("nav");
        controls.className = "carousel-controls";
        controls.id = `${config.id}-controls`;
        controls.setAttribute("aria-label", `کنترل‌های ${config.title}`);
        controls.append(
            createLink("اولین محصول →", `#${config.id}-first`),
            createLink("آخرین محصول ←", `#${config.id}-last`)
        );
        const status = createTextElement("p", "", "carousel-status");
        status.setAttribute("role", "status");
        const track = document.createElement("section");
        track.id = `${config.id}-track`;
        track.className = "product-track";
        track.tabIndex = 0;
        track.setAttribute("aria-label", `محصولات ${config.title}`);
        section.append(header, controls, status, track);
        container.append(section);

        const selected = config.source === "offers"
            ? products.filter(product => offers.some(offer => offer.productId === product.id))
            : products.filter(product => product.categoryId === config.categoryId);
        renderProducts({ prefix: config.id, track, controls, status }, selected, stock, offers);
    });
}

async function initPage() {
    restoreCart();
    const main = document.querySelector("main");
    const status = document.querySelector("#page-status");
    main.setAttribute("aria-busy", "true");
    status.textContent = "در حال بارگذاری فروشگاه...";

    try {
        // All six independent requests start together and are awaited once.
        const [products, stock, offers, categories, shop, home] = await Promise.all([
            loadJSON(PRODUCTS_URL),
            loadJSON(STOCK_URL),
            loadJSON(OFFERS_URL),
            loadJSON(CATEGORIES_URL),
            loadJSON(SHOP_URL),
            loadJSON(HOME_URL)
        ]);
        if (!Array.isArray(products) || !Array.isArray(offers) ||
            !Array.isArray(categories) || !stock?.items ||
            !Array.isArray(home?.carousels) || !Array.isArray(home?.promos)) {
            throw new Error("Unexpected API data structure.");
        }

        renderBanners(home);
        renderHomeCarousels(home.carousels, products, stock, offers);
        renderCategories(categories, products);
        renderShop(shop);
        document.querySelector("#site-search").placeholder =
            `جست‌وجو در میان ${priceFormatter.format(products.length)} کالا...`;
        status.textContent = "";
        // Images and fonts can move the section after API rendering finishes.
        await document.fonts.ready;
        if (document.readyState !== "complete") {
            await new Promise(resolve => window.addEventListener("load", resolve, { once: true }));
        }
        requestAnimationFrame(() => scrollToFragment(false));
    } catch {
        ["home-banners", "home-side", "home-promos", "home-carousels", "category-grid",
            "category-sections", "about"].forEach(id => {
            document.getElementById(id).replaceChildren();
        });
        status.textContent = "بارگذاری فروشگاه انجام نشد. اتصال را بررسی کنید و صفحه را دوباره بارگذاری کنید.";
        status.classList.add("is-error");
    } finally {
        main.setAttribute("aria-busy", "false");
    }
}

initPage();
