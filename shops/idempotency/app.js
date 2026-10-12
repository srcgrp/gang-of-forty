const todayContainer = document.querySelector("#today-products");

const priceFormatter = new Intl.NumberFormat("fa-IR");

const categoryImages = {
    1: "./asset/products/fruits-and-vegetables.png",
    2: "./asset/products/breakfast-and-dairy.png",
    3: "./asset/products/bakery.webp",
    4: "./asset/products/pantry.webp",
    5: "./asset/products/drinks.png",
    6: "./asset/products/proteins.png",
    7: "./asset/products/snacks.webp"
};

const productImages = {

    // Fruits & Vegetables
    101: "./asset/products/apple.webp",
    102: "./asset/products/oranges.png",
    103: "./asset/products/bananas.png",
    104: "./asset/products/tomatos.webp",
    105: "./asset/products/cucumber.webp",
    106: "./asset/products/grapes.webp",
    107: "./asset/products/watermelon.png",

    // Dairy & Breakfast
    201: "./asset/products/milk.png",
    202: "./asset/products/cheese.png",
    203: "./asset/products/yogurt.png",
    204: "./asset/products/butter.png",
    205: "./asset/products/ice-cream.webp",
    206: "./asset/products/eggs.png",

    // Bakery
    301: "./asset/products/sangak.webp",
    302: "./asset/products/buget.webp",
    303: "./asset/products/cake.png",
    304: "./asset/products/croissant.webp",
    305: "./asset/products/toast.webp",
    306: "./asset/products/fooman-cookie.webp",

    // Pantry
    401: "./asset/products/rice.webp",
    402: "./asset/products/honey.png",
    403: "./asset/products/saffaron.webp",
    404: "./asset/products/oil.webp",
    405: "./asset/products/pasta.webp",
    406: "./asset/products/lentils.webp",

    // Drinks
    501: "./asset/products/tea.png",
    502: "./asset/products/doogh.png",
    503: "./asset/products/water.webp",
    504: "./asset/products/orange-juice.png",
    505: "./asset/products/coffee.png",
    506: "./asset/products/cherry-juice.webp",

    // Protein
    601: "./asset/products/chicken.png",
    602: "./asset/products/meat.png",
    603: "./asset/products/fish.png",
    604: "./asset/products/shrimp.png",
    605: "./asset/products/chicken-fillet.webp",
    606: "./asset/products/tuna.webp",

    // Snacks & Sweets
    701: "./asset/products/popcorn.webp",
    702: "./asset/products/chips.webp",
    703: "./asset/products/chocolate.png",
    704: "./asset/products/cookie.png",
    705: "./asset/products/nuts.png",
    706: "./asset/products/gaz.webp"
};

const productSections = [
    { categoryId: 1, sectionId: "fruits" },
    { categoryId: 2, sectionId: "dairy" },
    { categoryId: 3, sectionId: "bakery" },
    { categoryId: 4, sectionId: "pantry" },
    { categoryId: 5, sectionId: "drinks" },
    { categoryId: 6, sectionId: "protein" },
    { categoryId: 7, sectionId: "snacks" }
];
const specialDiscountProductIds = [204, 402];

function getSectionContainer(sectionId) {
    return document.querySelector(`#${sectionId}-products`);
}

function createProductMedia(product) {
    const imagePath = productImages[product.id];

    if (imagePath) {
        const image = document.createElement("img");

        image.src = imagePath;
        image.alt = product.name;
        image.classList.add("product-image");
        image.loading = "lazy";

        return image;
    }

    const emoji = document.createElement("div");

    emoji.classList.add("product-emoji");
    emoji.textContent = product.emoji ?? "";
    emoji.setAttribute("aria-hidden", "true");

    return emoji;
}
function createProductCard(product, offers, stock) {
    const offer = offers.find(item => {
        return item.productId === product.id;
    });

    const quantity = stock.items[product.id] ?? 0;
    const isAvailable = quantity > 0;

    const card = document.createElement("article");
    card.classList.add("product-card");

    card.dataset.apiProduct = String(product.id);

    if (offer) {
        card.classList.add("product-card-discount");

        const badge = document.createElement("span");
        badge.classList.add("discount-badge");

        badge.textContent =
            `${priceFormatter.format(offer.percent)}٪`;

        badge.title = offer.label;

        card.append(badge);
    }

    if (!isAvailable) {
        card.classList.add("product-card-unavailable");

        const badge = document.createElement("span");
        badge.classList.add("unavailable-badge");
        badge.textContent = "ناموجود";

        card.append(badge);
    }

    const media = createProductMedia(product);

    const name = document.createElement("h3");
    name.textContent = product.name;

    const unit = document.createElement("p");
    unit.classList.add("product-meta");
    unit.textContent = product.unit;

    const priceBox = document.createElement("div");
    priceBox.classList.add("price-box");

    const price = document.createElement("p");
    price.classList.add("product-price");

    if (offer) {
        const oldPrice = document.createElement("p");
        oldPrice.classList.add("old-price");

        oldPrice.textContent =
            `${priceFormatter.format(product.price)} تومان`;

        const discountedPrice = Math.round(
            product.price * (1 - offer.percent / 100)
        );

        price.textContent =
            `${priceFormatter.format(discountedPrice)} تومان`;

        priceBox.append(oldPrice, price);
    } else {
        price.textContent =
            `${priceFormatter.format(product.price)} تومان`;

        priceBox.append(price);
    }

    const button = document.createElement("button");
    button.type = "button";

    button.textContent = isAvailable
        ? "افزودن به سبد"
        : "ناموجود";

    button.disabled = !isAvailable;

    card.append(media, name, unit, priceBox, button);

    return card;
}

function renderProductCarousel(
    container,
    products,
    offers,
    stock
) {
    if (!container) {
        return;
    }

    const cards = products.map(product => {
        return createProductCard(product, offers, stock);
    });

    container.replaceChildren(...cards);

    container.setAttribute("aria-busy", "false");
}

function getManualCards(container) {
    return Array.from(
        container.querySelectorAll(
            ":scope > .product-card:not([data-api-product])"
        )
    );
}

function renderHybridCarousel(
    container,
    products,
    offers,
    stock
) {
    if (!container) {
        return;
    }

    const manualCards = getManualCards(container);

    const apiCards = products.map(product => {
        return createProductCard(product, offers, stock);
    });

    container.replaceChildren(
        ...apiCards,
        ...manualCards
    );

    container.setAttribute("aria-busy", "false");
}

function renderAllCategoryProducts(
    products,
    offers,
    stock
) {
    productSections.forEach(section => {
        const container = getSectionContainer(
            section.sectionId
        );

        if (!container) {
            console.warn(
                `Missing product container: #${section.sectionId}-products`
            );
            return;
        }

        const categoryProducts = products.filter(product => {
            return product.categoryId === section.categoryId;
        });

        renderHybridCarousel(
            container,
            categoryProducts,
            offers,
            stock
        );
    });
}

function showHybridError(container) {
    if (!container) {
        return;
    }

    const manualCards = getManualCards(container);

    const message = document.createElement("p");

    message.classList.add("error-message");
    message.setAttribute("role", "alert");

    message.textContent =
        "دریافت محصولات API با مشکل مواجه شد.";

    container.replaceChildren(
        message,
        ...manualCards
    );

    container.setAttribute("aria-busy", "false");
}

function showError(container, messageText) {
    if (!container) {
        return;
    }

    const message = document.createElement("p");

    message.classList.add("error-message");
    message.setAttribute("role", "alert");
    message.textContent = messageText;

    container.replaceChildren(message);

    container.setAttribute("aria-busy", "false");
}

async function fetchJSON(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch ${url}: HTTP ${response.status}`
        );
    }

    return response.json();
}

function createCategoryCard(category) {
    const card = document.createElement("a");

    card.classList.add("category-card");
    card.href = `#${category.slug}`;

    const image = document.createElement("img");

    image.src = categoryImages[category.id];
    image.alt = "";
    image.setAttribute("aria-hidden", "true");

    const name = document.createElement("span");
    name.textContent = category.name;

    card.append(image, name);

    return card;
}

function renderCategories(categories) {
    const container = document.querySelector("#category-grid");

    if (!container) {
        return;
    }

    const cards = categories.map(category => {
        return createCategoryCard(category);
    });

    container.replaceChildren(...cards);

    container.setAttribute("aria-busy", "false");
}

function renderCategoryDropdown(categories) {
    const dropdown = document.querySelector("#category-dropdown");

    if (!dropdown) {
        return;
    }

    const apiLinks = categories.map(category => {
        const link = document.createElement("a");

        link.classList.add("dropdown-item");
        link.href = `#${category.slug}`;
        link.textContent = category.name;

        return link;
    });
    const customLinks = Array.from(
        dropdown.querySelectorAll(":scope > a")
    );

    dropdown.replaceChildren(
        ...apiLinks,
        ...customLinks
    );
}


function renderFooterCategories(categories) {
    const container = document.querySelector("#footer-categories");

    if (!container) {
        return;
    }

    const apiLinks = categories.map(category => {
        const link = document.createElement("a");

        link.href = `#${category.slug}`;
        link.textContent = category.name;

        return link;
    });

    const customLinks = Array.from(
        container.querySelectorAll(":scope > a:not([data-api-category])")
    );

    apiLinks.forEach(link => {
        link.dataset.apiCategory = "true";
    });

    container.replaceChildren(...apiLinks, ...customLinks);
}

function renderShopHelp(shop) {
    const container = document.querySelector("#footer-help");

    if (!container) {
        return;
    }

    const links = shop.help.map(item => {
        const link = document.createElement("a");

        link.href = item.href;
        link.textContent = item.label;

        return link;
    });

    container.replaceChildren(...links);
}





function renderShopMenu(container, menuItems) {
    if (!container) {
        return;
    }

    // Categories are shown in the category dropdown
    const categoryHrefs = new Set([
        "#fruits",
        "#dairy",
        "#bakery",
        "#pantry",
        "#drinks",
        "#protein",
        "#snacks"
    ]);

    const mainMenuItems = menuItems.filter(item => {
        return !categoryHrefs.has(item.href);
    });

    const links = mainMenuItems.map(item => {
        const link = document.createElement("a");

        link.href = item.href;
        link.textContent = item.label;

        return link;
    });

    const customLinks = [
        { label: "تخفیف‌های ویژه", href: "#special-discounts" },
        { label: "پرفروش‌ها", href: "#best-sellers" },
        { label: "درباره ما", href: "#about" }
    ];

    customLinks.forEach(item => {
        const link = document.createElement("a");

        link.href = item.href;
        link.textContent = item.label;

        links.push(link);
    });

    container.replaceChildren(...links);
}


function renderShopMenus(shop) {
    const desktopMenu = document.querySelector(
        "#shop-desktop-menu"
    );

    const mobileMenu = document.querySelector(
        "#shop-mobile-menu"
    );

    renderShopMenu(desktopMenu, shop.menu);
    renderShopMenu(mobileMenu, shop.menu);
}


function renderShopAbout(shop) {
    const aboutElement = document.querySelector("#shop-about");

    if (!aboutElement) {
        return;
    }

    aboutElement.textContent = shop.about;
}


function renderShopSchedule(shop) {
    const container = document.querySelector("#shop-schedule");

    if (!container) {
        return;
    }

    const title = document.createElement("p");
    title.textContent = "ساعات کاری:";

    const scheduleItems = shop.schedule.map(item => {
        const paragraph = document.createElement("p");

        paragraph.textContent = `${item.days}: ${item.time}`;

        return paragraph;
    });

    container.replaceChildren(title, ...scheduleItems);
}


function renderShopContact(shop) {
    const phoneElement = document.querySelector("#shop-phone");
    const addressElement = document.querySelector("#shop-address");

    if (phoneElement) {
        phoneElement.textContent = shop.phone;
    }

    if (addressElement) {
        addressElement.textContent = shop.address;
    }

    const phoneLink = document.querySelector(
        '.footer-social-link[aria-label="تماس تلفنی"]'
    );

    if (phoneLink) {
        const normalizedPhone = shop.phone.replace(/[^\d+]/g, "");

        phoneLink.href = `tel:${normalizedPhone}`;
    }
}


function renderShopCopyright(shop) {
    const copyrightElement = document.querySelector(
        "#shop-copyright"
    );

    if (!copyrightElement) {
        return;
    }

    copyrightElement.textContent = shop.copyright.replace(
        shop.name,
        "تازه‌خانه"
    );
}


function renderShopNotice(shop) {
    const noticeElement = document.querySelector("#shop-notice");

    if (!noticeElement) {
        return;
    }

    noticeElement.textContent = shop.notice;
}

async function loadShopData() {
    const results = await Promise.allSettled([
        fetchJSON("../../api/shop.json"),
        fetchJSON("../../api/categories.json")
    ]);

    const [shopResult, categoriesResult] = results;

    if (shopResult.status === "fulfilled") {
        const shop = shopResult.value;
        console.log("Shop:", shopResult.value);

        renderShopNotice(shop);
        renderShopMenus(shop);
        renderShopAbout(shop);
        renderShopSchedule(shop);
        renderShopContact(shop);
        renderShopCopyright(shop);
        renderShopHelp(shop);
    } else {
        console.error(
            "Failed to load shop:",
            shopResult.reason
        );
    }

    if (categoriesResult.status === "fulfilled") {
        console.log("Categories:", categoriesResult.value);

        renderCategories(categoriesResult.value);
        renderCategoryDropdown(categoriesResult.value);
        renderFooterCategories(categoriesResult.value);
    } else {
        console.error(
            "Failed to load categories:",
            categoriesResult.reason
        );

        showError(
            document.querySelector("#category-grid"),
            "دریافت دسته‌بندی‌ها با مشکل مواجه شد. لطفاً دوباره تلاش کنید."
        );
    }
}

async function loadProducts() {
    try {
        const [products, offers, stock] = await Promise.all([
            fetchJSON("../../api/products.json"),
            fetchJSON("../../api/offers.json"),
            fetchJSON("../../api/stock.json")
        ]);

        console.log("Products:", products.length);
        console.log("Offers:", offers.length);
        console.log("Stock:", stock);

        const offeredProducts = products.filter(product => {
            return offers.some(offer => {
                return offer.productId === product.id;
            });
        });

        const specialDiscountProducts = products.filter(product => {
            return specialDiscountProductIds.includes(product.id)
                && offers.some(offer => offer.productId === product.id);
        });

        renderHybridCarousel(
            document.querySelector("#special-discounts-products"),
            specialDiscountProducts,
            offers,
            stock
        );


        renderAllCategoryProducts(
            products,
            offers,
            stock
        );

        renderProductCarousel(
            todayContainer,
            offeredProducts,
            offers,
            stock
        );

    } catch (error) {
        console.error("Failed to load products:", error);

        productSections.forEach(section => {
            const container = getSectionContainer(
                section.sectionId
            );

            showHybridError(container);
        });

        showError(
            todayContainer,
            "دریافت پیشنهادهای امروز با مشکل مواجه شد."
        );
        showHybridError(
            document.querySelector("#special-discounts-products")
        );

    } finally {
        productSections.forEach(section => {
            getSectionContainer(
                section.sectionId
            )?.setAttribute("aria-busy", "false");
        });

        todayContainer?.setAttribute(
            "aria-busy",
            "false"
        );
        document.querySelector("#special-discounts-products")
            ?.setAttribute("aria-busy", "false");
    }
}

function setupCarouselControls(
    container,
    startButton,
    endButton
) {
    if (!container || !startButton || !endButton) {
        return;
    }

    startButton.addEventListener("click", () => {
        container.scrollTo({
            left: 0,
            behavior: "smooth"
        });
    });

    endButton.addEventListener("click", () => {
        container.scrollTo({
            left: -container.scrollWidth,
            behavior: "smooth"
        });
    });
}

function setupAllCategoryCarousels() {
    productSections.forEach(section => {
        const sectionId = section.sectionId;

        const container = getSectionContainer(sectionId);

        const startButton = document.querySelector(
            `#${sectionId}-scroll-start`
        );

        const endButton = document.querySelector(
            `#${sectionId}-scroll-end`
        );

        setupCarouselControls(
            container,
            startButton,
            endButton
        );
    });
}
setupAllCategoryCarousels();

setupCarouselControls(
    todayContainer,
    document.querySelector("#today-scroll-start"),
    document.querySelector("#today-scroll-end")
);

const additionalCarousels = [
    "special-discounts",
    "best-sellers",
    "nuts"
];

additionalCarousels.forEach(sectionId => {
    setupCarouselControls(
        document.querySelector(`#${sectionId}-products`),
        document.querySelector(`#${sectionId}-scroll-start`),
        document.querySelector(`#${sectionId}-scroll-end`)
    );
});


loadProducts();
loadShopData();
