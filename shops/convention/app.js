
const carousel = document.querySelector(".products-carousel");

const categoryId = 2;

const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price);
};

function showMessage(message) {
    const messageElement = document.createElement("p");

    messageElement.className = "carousel-message";
    messageElement.textContent = message;

    carousel.replaceChildren(messageElement);
}

function createProductCard(product) {
    // کارت اصلی
    const card = document.createElement("article");
    card.className = "product-card";

    // بخش تصویر و ایموجی محصول
    const imageContainer = document.createElement("div");
    imageContainer.className = "product-image";

    const emoji = document.createElement("span");
    emoji.className = "product-emoji";
    emoji.textContent = product.emoji;
    emoji.setAttribute("aria-hidden", "true");

    imageContainer.append(emoji);

    // اطلاعات محصول
    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("h3");
    name.textContent = product.name;

    const unit = document.createElement("p");
    unit.className = "product-size";
    unit.textContent = product.unit;

    // قیمت
    const priceContainer = document.createElement("div");
    priceContainer.className = "product-price";

    const price = document.createElement("strong");
    price.textContent = `${formatPrice(product.price)} تومان`;

    priceContainer.append(price);

    // دکمه افزودن به سبد
    const button = document.createElement("button");
    button.className = "add-to-cart";
    button.type = "button";
    button.textContent = "افزودن به سبد";

    // اتصال بخش‌های کارت
    info.append(name, unit, priceContainer, button);
    card.append(imageContainer, info);

    return card;
}

async function loadProducts() {
    showMessage("در حال بارگذاری محصولات...");

    try {
        const response = await fetch("../../api/products.json");

        if (!response.ok) {
            throw new Error(`خطای HTTP: ${response.status}`);
        }

        const products = await response.json();

        const filteredProducts = products.filter(
            (product) => product.categoryId === categoryId
        );

        if (filteredProducts.length === 0) {
            showMessage("محصولی در این دسته‌بندی پیدا نشد.");
            return;
        }

        const fragment = document.createDocumentFragment();

        filteredProducts.forEach((product) => {
            const card = createProductCard(product);
            fragment.append(card);
        });

        carousel.replaceChildren(fragment);

    } catch (error) {
        console.error("خطا در دریافت محصولات:", error);
        showMessage("دریافت محصولات ناموفق بود. لطفاً صفحه را دوباره بارگذاری کنید.");
    }
}

loadProducts();
