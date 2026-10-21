const API_BASE = "../../../api";

const CART_KEY = "sabdak_cart";

function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    const el = document.getElementById("cart-count");
    if (el) el.textContent = total.toLocaleString("fa-IR");
}

function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) existing.qty += 1;
    else cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
    saveCart(cart);
}

function showLoading(container) {
    if (!container) return;
    container.innerHTML = '<div class="loading-message">در حال بارگذاری...</div>';
}

function showError(container, msg) {
    if (!container) return;
    container.innerHTML = '<div class="error-message">خطا: ' + msg + '</div>';
}

function createProductCard(product, offerMap, stockMap) {
    const article = document.createElement("article");
    article.className = "product-card";

    const offer = offerMap[product.id];
    const stock = stockMap[product.id] ?? 1;
    const isOut = stock === 0;

    if (isOut) article.classList.add("out-of-stock");

    // فقط ایموجی
    const imageDiv = document.createElement("div");
    imageDiv.className = "product-image";
    
    const emoji = document.createElement("span");
    emoji.textContent = product.emoji || "🛒";
    emoji.style.fontSize = "60px";
    emoji.setAttribute("aria-hidden", "true");
    imageDiv.appendChild(emoji);

    if (offer) {
        const badge = document.createElement("span");
        badge.className = "discount-badge";
        badge.textContent = offer.label || (offer.percent + "٪");
        imageDiv.appendChild(badge);
    }
    if (isOut) {
        const outBadge = document.createElement("span");
        outBadge.className = "out-badge";
        outBadge.textContent = "ناموجود";
        imageDiv.appendChild(outBadge);
    }
    article.appendChild(imageDiv);

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name;
    article.appendChild(name);

    const weight = document.createElement("p");
    weight.className = "product-weight";
    weight.textContent = product.unit;
    article.appendChild(weight);

    const footer = document.createElement("div");
    footer.className = "product-footer";
    const priceDiv = document.createElement("div");
    priceDiv.className = "product-price";

    if (offer) {
        const oldP = document.createElement("del");
        oldP.className = "old-price";
        oldP.textContent = product.price.toLocaleString("fa-IR");
        priceDiv.appendChild(oldP);

        const newP = document.createElement("span");
        newP.className = "current-price";
        const disc = Math.round(product.price * (1 - offer.percent / 100));
        newP.textContent = disc.toLocaleString("fa-IR") + " تومان";
        priceDiv.appendChild(newP);
    } else {
        const p = document.createElement("span");
        p.className = "current-price";
        p.textContent = product.price.toLocaleString("fa-IR") + " تومان";
        priceDiv.appendChild(p);
    }
    footer.appendChild(priceDiv);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "add-btn";
    btn.textContent = "+";
    btn.setAttribute("aria-label", "افزودن " + product.name + " به سبد خرید");
    if (isOut) {
        btn.disabled = true;
        btn.setAttribute("aria-disabled", "true");
    } else {
        btn.addEventListener("click", () => addToCart(product));
    }
    footer.appendChild(btn);

    article.appendChild(footer);
    return article;
}

function createCategoryCard(cat) {
    const a = document.createElement("a");
    a.href = "#" + cat.slug;
    a.className = "category-card";
    a.innerHTML = `<span class="category-icon">${cat.emoji}</span><span class="category-name">${cat.name}</span>`;
    return a;
}

async function loadAll() {
    const els = {
        products: document.getElementById("products-carousel"),
        categories: document.getElementById("categories-grid"),
        popular: document.getElementById("popular-grid"),
        best: document.getElementById("best-sellers-carousel"),
        discounts: document.getElementById("discounts-carousel"),
        dairy: document.getElementById("dairy-carousel")
    };
    
    Object.values(els).forEach(showLoading);

    try {
        const [pRes, cRes, oRes, sRes] = await Promise.all([
            fetch(API_BASE + "/products.json"),
            fetch(API_BASE + "/categories.json"),
            fetch(API_BASE + "/offers.json"),
            fetch(API_BASE + "/stock.json").catch(() => ({ json: () => ({ items: {} }) }))
        ]);

        const products = await pRes.json();
        const categories = await cRes.json();
        const offers = await oRes.json();
        const stockData = await sRes.json();

        const allStock = stockData.items || {};
        const offerMap = {};
        offers.forEach(o => offerMap[o.productId] = o);

        const renderList = (el, list) => {
            if (!el) return;
            el.innerHTML = "";
            list.forEach(item => el.appendChild(createProductCard(item, offerMap, allStock)));
        };

        renderList(els.products, products.slice(0, 6));
        
        if (els.categories) {
            els.categories.innerHTML = "";
            categories.slice(0, 6).forEach(c => els.categories.appendChild(createCategoryCard(c)));
        }

        const offerItems = offers.map(o => products.find(p => p.id === o.productId)).filter(Boolean);
        renderList(els.popular, offerItems.slice(0, 3));
        renderList(els.best, products.slice(6, 12));
        renderList(els.discounts, offerItems);
        renderList(els.dairy, products.filter(p => p.categoryId === 2));

        const footerCats = document.getElementById("footer-categories");
        if (footerCats && categories) {
            footerCats.innerHTML = "";
            categories.slice(0, 6).forEach(c => {
                const a = document.createElement("a");
                a.href = "#" + c.slug;
                a.textContent = (c.emoji || "") + " " + c.name;
                footerCats.appendChild(a);
            });
        }

        updateCartUI();

    } catch (error) {
        Object.values(els).forEach(el => showError(el, error.message));
    }
}

loadAll();