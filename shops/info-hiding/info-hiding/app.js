const priceFormat = new Intl.NumberFormat ("fa-IR");

async function readJson(file) {
    const response = await fetch("../../../api/" + file);
    if (!response.ok) {
        throw new Error("Request failed: " + file);
    }
    return await response.json();
}

function createProductCard(product, index, section, stock, offers) {
    const card = document.createElement("article");
    card.className = "product";
    card.id = section + "-" + (index + 1);

    const offer = offers.find(function (item) {
        return item.productId === product.id;
    });

    if (offer) {
        const badge = document.createElement("span");
        badge.className = "discount";
        badge.textContent = priceFormat.format(offer.percent) + "٪ تخفیف";
        badge.title = offer.label;
        card.append(badge);
    }

    const icon = document.createElement("span");
    icon.className = "product-icon";
    icon.textContent = product.emoji;
    icon.setAttribute("role", "img");
    icon.setAttribute("aria-label", product.name);

    const name = document.createElement("h3");
    name.textContent = product.name;

    const unit = document.createElement("p");
    unit.textContent = product.unit;

    const price = document.createElement("div");
    price.className = "price";
    let finalPrice = product.price;
    if (offer) {
        const oldPrice = document.createElement("del");
        oldPrice.textContent = priceFormat.format(product.price) + " تومان";
        price.append(oldPrice);
        finalPrice = Math.round(product.price * (100 - offer.percent) / 100);
    }
    const amount = document.createElement("strong");
    amount.textContent = priceFormat.format(finalPrice) + " تومان";
    price.append(amount);

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "افزودن +";
    button.setAttribute("aria-label", "افزودن " + product.name + " به سبد خرید");

    card.append(icon, name, unit);
    if (stock.items[product.id] === 0) {
        card.classList.add("unavailable");
        const label = document.createElement("p");
        label.className = "stock-label";
        label.textContent = "ناموجود";
        card.append(label);
        button.disabled = true;
        button.textContent = "ناموجود";
    }
    card.append(price, button);
    return card;
}

function renderCarousel(section, products, stock, offers) {
    const carousel = document.querySelector("#" + section + "-carousel");
    const statusMessage = document.querySelector("#" + section + "-status");
    carousel.replaceChildren();

    if (products.length === 0) {
        statusMessage.textContent = "در حال حاضر محصولی برای نمایش وجود ندارد.";
        return;
    }

    products.forEach(function (product, index) {
        carousel.append(createProductCard(product, index, section, stock, offers));
    });
    const end = document.createElement("span");
    end.id = section + "-end";
    end.className = "carousel-end";
    end.setAttribute("aria-hidden", "true");
    carousel.append(end);
    statusMessage.textContent = "";
    document.querySelector("#" + section + " .carousel-controls").hidden = false;
}

async function loadProducts() {
    const messages = document.querySelectorAll(".load-status");
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

        const target = document.getElementById(location.hash.slice(1));
        if (target) {
            target.scrollIntoView();
        }
    } catch (error) {
        document.querySelector("#dairy-carousel").replaceChildren();
        document.querySelector("#offers-carousel").replaceChildren();
        messages.forEach(function (message) {
            message.textContent = "دریافت محصولات انجام نشد. اتصال اینترنت را بررسی کنید و صفحه را دوباره بارگذاری کنید.";
        });
    } finally {
        document.querySelector("#dairy-carousel").setAttribute("aria-busy", "false");
        document.querySelector("#offers-carousel").setAttribute("aria-busy", "false");
    }
}

loadProducts();
