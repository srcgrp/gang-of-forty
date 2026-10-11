const CATEGORY_ID = 1;

function formatNumber(n) {
  return new Intl.NumberFormat('fa-IR').format(n);
}
function formatPrice(price) {
  return `${formatNumber(price)} تومان`;
}

function createCard(product) {
  const outOfStock = product.stock === 0; 
  const li = document.createElement("li");

  if (outOfStock){
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

  if (product.newPrice){
    const del = document.createElement("del");
    const oldPriceLable = document.createElement("span");
    oldPriceLable.classList.add("visually-hidden");
    oldPriceLable.textContent = "قیمت قبلی";
    del.append(oldPriceLable, " ", formatNumber(product.price))

    const newPriceLable = document.createElement("span");
    newPriceLable.classList.add("visually-hidden");
    newPriceLable.textContent = "قیمت با تخفیف";
    price.append(del,  newPriceLable, " ", formatPrice(product.newPrice))
  } else {
        price.textContent = formatPrice(product.price);  
    }

  const button = document.createElement("button")
  button.type = "button";
  button.textContent = "+";
  button.disabled = outOfStock;
  button.setAttribute("aria-label", `افزودن ${product.name} به سبد خرید`)
  
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
    carousel.append(li);
}

/* loadProducts */
async function loadProducts() {
  const carousel = document.querySelector("#new-items .carousel");
  showMessage(carousel, "لطفا کمی صبر کنید")
  try {
    const res = await fetch("../../api/products.json");
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    const products = await res.json();
    const items = products.filter(p => p.categoryId === CATEGORY_ID);
    carousel.replaceChildren();
    items.forEach((product, index) => {
        const card = createCard(product);
        if (index === 0){
            card.id = "new-items-first"
        }
        if (index === items.length - 1){
            card.id = "new-items-last"
        }

        carousel.append(card);
    });
  } catch (error) {
    console.error(error);
    showMessage(carousel,"دسترسی به اینترنت را بررسی و صفحه را دوباره بارگذاری کنید")
    }
}
loadProducts();

/* loadSpecialOffers */

async function loadSpecialOffers() {
    const specialCarousel = document.querySelector("#special-offer .carousel");
    try {
        const [productsRes, offersRes, stockRes] = await Promise.all([
            fetch("../../api/products.json"),
            fetch("../../api/offers.json"),
            fetch("../../api/stock.json"),
        ]);
        if (!productsRes.ok || !offersRes.ok || !stockRes.ok){
            throw new Error("Request failed")
        } 
        const [products, offers, stock] = await Promise.all([
            productsRes.json(),
            offersRes.json(),
            stockRes.json(),
        ]);
    
        const specialProducts = offers.map(offer => {
            const product = products.find(p => p.id === offer.productId);
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
        });
        specialProducts.forEach((item, index) => {
            const card = createCard(item);
            if (index === 0){
                card.id = "special-offer-first"
            }
            if (index === specialProducts.length - 1){
                card.id = "special-offer-last"
            }

            specialCarousel.append(card);
        });

    } catch (error) {
    console.error(error);
    }
}
loadSpecialOffers();