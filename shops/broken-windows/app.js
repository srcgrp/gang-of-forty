const offerContainer = document.querySelectorAll(".special-offer-items")[0];
const snacksContainer = document.querySelectorAll(".special-offer-items")[1];
const snacksHeading = snacksContainer.closest("article").querySelector(".items-header");
const noticeBar = document.getElementById("notice");
const phoneLink = document.querySelector("#phonenumber");
const menuList = document.querySelector("#menu-categories");
const footerList = document.querySelector("#footer-categories");
const categoriesGrid = document.querySelector("#categories-grid");
function showMessage(container, text) {
    const p = document.createElement("p");
    p.textContent = text;
    container.replaceChildren(p);
}
function formatNumber(number) {
    return new Intl.NumberFormat("fa-IR").format(number);
}
function formatPrice(number) {
    return formatNumber(number) + " تومان";
}
async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("خطای سرور: " + response.status);
    }
    return await response.json();
}

function createProductCard(product, offer, stockCount) {
    const isUnavailable = stockCount === 0;

    const card = document.createElement("div");
    card.className = "special-offer-item";
    if (isUnavailable) {
        card.classList.add("unavailable");
    }

    const imageBox = document.createElement("div");
    imageBox.className = "special-offer-image";

    const emoji = document.createElement("span");
    emoji.className = "special-offer-emoji";
    emoji.textContent = product.emoji;
    imageBox.append(emoji);

    if (isUnavailable) {
        const badge = document.createElement("span");
        badge.className = "unavailable-badge";
        badge.textContent = "ناموجود";
        imageBox.append(badge);
    } else if (offer) {
        const badge = document.createElement("span");
        badge.className = "discount-badge";
        badge.textContent = formatNumber(offer.percent) + "٪";
        imageBox.append(badge);
    }

    const name = document.createElement("h3");
    name.className = "special-offer-name";
    name.textContent = product.name;

    const unit = document.createElement("p");
    unit.className = "special-offer-unit";
    unit.textContent = product.unit;

    const details = document.createElement("div");
    details.className = "special-offer-item-details";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "add-button";
    button.textContent = "+";

    if (isUnavailable) {
        button.disabled = true;
        button.setAttribute("aria-label", product.name + " ناموجود است");
    } else {
        button.setAttribute("aria-label", "افزودن " + product.name + " به سبد خرید");
    }

    if (offer) {
        const prices = document.createElement("div");
        prices.className = "special-offer-item-prices";

        const oldPrice = document.createElement("p");
        oldPrice.className = "price-old";
        oldPrice.textContent = formatNumber(product.price);

        const newPrice = document.createElement("p");
        newPrice.className = "special-offer-price";
        newPrice.textContent = formatPrice(Math.round(product.price * (100 - offer.percent) / 100));

        prices.append(oldPrice, newPrice);
        details.append(prices, button);
    } else {
        const price = document.createElement("p");
        price.className = "special-offer-price";
        price.textContent = formatPrice(product.price);
        details.append(price, button);
    }

    card.append(imageBox, name, unit, details);
    return card;
}
function createCategoryTile(category) {
    const tile = document.createElement("div");
    tile.className = "items";

    const link = document.createElement("a");
    link.className = "items-link";
    link.href = "#" + category.slug;

    const icon = document.createElement("span");
    icon.className = "items-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = category.emoji;
    icon.style.backgroundColor = category.color;

    const title = document.createElement("p");
    title.className = "items-title";
    title.textContent = category.name;

    link.append(icon, title);
    tile.append(link);
    return tile;
}
function createCategoryListItem(category, withEmoji, className) {
    const item = document.createElement("li");
    if (className) {
        item.className = className;
    }

    const link = document.createElement("a");
    link.href = "#" + category.slug;

    if (withEmoji) {
        const emoji = document.createElement("span");
        emoji.className = "dropdown-emoji";
        emoji.textContent = category.emoji;
        link.append(emoji, " " + category.name);
    } else {
        link.textContent = category.name;
    }

    item.append(link);
    return item;
}
function renderCategories(categories) {
    categoriesGrid.replaceChildren(...categories.map(createCategoryTile));
    menuList.replaceChildren(...categories.map((cat) => createCategoryListItem(cat, true)));
    footerList.replaceChildren(
        ...categories.map((cat) => createCategoryListItem(cat, false, "footer-top-categories-list-item"))
    );
}
function scrollToHash() {
    if (!location.hash) return;
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
        target.scrollIntoView();
    }
}
async function loadProducts() {
    showMessage(offerContainer, "در حال بارگذاری...");
    showMessage(snacksContainer, "در حال بارگذاری...");
    showMessage(categoriesGrid, "در حال بارگذاری...");

    try {
      
        const [products, stockData, offersData, categories, shop] = await Promise.all([
            fetchJson("../../api/products.json"),
            fetchJson("../../api/stock.json"),
            fetchJson("../../api/offers.json"),
            fetchJson("../../api/categories.json"),
            fetchJson("../../api/shop.json")
        ]);

        const stockItems = stockData.items;
        const offers = Array.isArray(offersData) ? offersData : offersData.offers;
        const offerByProductId = new Map(offers.map((offer) => [offer.productId, offer]));

        const makeCard = (product) =>
            createProductCard(product, offerByProductId.get(product.id), stockItems[product.id]);

        const offerProducts = products.filter((product) => offerByProductId.has(product.id));
        offerContainer.replaceChildren(...offerProducts.map(makeCard));
               const snacks = categories.find((category) => category.name.includes("تنقلات"));
        if (!snacks) {
            throw new Error("دسته‌ی تنقلات پیدا نشد");
        }
        const snackProducts = products.filter((product) => product.categoryId === snacks.id);
        snacksContainer.replaceChildren(...snackProducts.map(makeCard));
        snacksHeading.textContent = "خشکبار و تنقلات";
        snacksHeading.closest("article").id = snacks.slug;

        renderCategories(categories);


        noticeBar.textContent = shop.notice;
        phoneLink.textContent = shop.phone;

        scrollToHash();

    } catch (error) {
        console.error("خطا در بارگذاری:", error.message);
        showMessage(offerContainer, "متأسفیم، محصولات بارگذاری نشدند. لطفاً دوباره تلاش کنید.");
        showMessage(snacksContainer, "متأسفیم، محصولات بارگذاری نشدند. لطفاً دوباره تلاش کنید.");
        showMessage(categoriesGrid, "متأسفیم، دسته‌بندی‌ها بارگذاری نشدند.");
    }
}


function setupViewAll() {
    document.querySelectorAll(".items-header-link").forEach((link) => {
        const label = link.querySelector("span");
        const items = link.closest("article").querySelector(".special-offer-items");
        const isRtl = getComputedStyle(items).direction === "rtl";

        function atEnd() {
            return Math.abs(items.scrollLeft) + items.clientWidth >= items.scrollWidth - 2;
        }

        function updateLabel() {
            label.textContent = atEnd() ? "بازگشت به ابتدا" : "مشاهده همه";
        }

        link.addEventListener("click", (event) => {
            event.preventDefault();

            if (atEnd()) {
                items.scrollTo({ left: 0, behavior: "smooth" });
                return;
            }

            const gap = parseFloat(getComputedStyle(items).columnGap) || 0;
            const page = items.clientWidth + gap;
            items.scrollBy({ left: isRtl ? -page : page, behavior: "smooth" });
        });

        items.addEventListener("scroll", updateLabel, { passive: true });
    });
}

setupViewAll();
loadProducts();