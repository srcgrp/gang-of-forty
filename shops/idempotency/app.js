const dairyContainer= document.querySelector("#dairy-products");
const todayContainer = document.querySelector("#today-products");
const priceFormatter=new Intl.NumberFormat("fa-IR");


const productImages = {
    // Category 1: Fruits & Vegetables
    101: "./asset/products/apple.webp",
    102: "./asset/products/oranges.png",
    103: "./asset/products/bananas.png",
    104: "./asset/products/tomatos.webp",
    105: "./asset/products/cucumber.webp",
    106: "./asset/products/grapes.webp",
    107: "./asset/products/watermelon.png",
    // Category 2: Dairy & Breakfast
    201: "./asset/products/milk.png",
    202: "./asset/products/cheese.png",
    203: "./asset/products/yogurt.png",
    204: "./asset/products/butter.png",
    205: "./asset/products/ice-cream.webp",
    206: "./asset/products/eggs.png",
    // Category 3: Bakery
    301: "./asset/products/sangak.webp",
    302: "./asset/products/buget.webp",
    303: "./asset/products/cake.png",
    304: "./asset/products/croissant.webp",
    305: "./asset/products/toast.webp",
    306: "./asset/products/fooman-cookie.webp",
    // Category 4: Pantry
    401: "./asset/products/rice.webp",
    402: "./asset/products/honey.png",
    403: "./asset/products/safaron.png",
    404: "./asset/products/oil.webp",
    405: "./asset/products/pasta.webp",
    406: "./asset/products/lentils.webp",
    // Category 5: Drinks
    501: "./asset/products/tea.png",
    502: "./asset/products/doogh.png",
    503: "./asset/products/water.webp",
    504: "./asset/products/orange-juice.png",
    505: "./asset/products/coffee.png",
    506: "./asset/products/cherry-juice.webp",
    // Category 6: Protein
    601: "./asset/products/chicken.png",
    602: "./asset/products/meat.png",
    603: "./asset/products/fish.png",
    604: "./asset/products/shrimp.png",
    605: "./asset/products/chicken-fillet.webp",
    606: "./asset/products/tuna.webp",
    // Category 7: Snacks & Sweets
    701: "./asset/products/popcorn.webp",
    702: "./asset/products/chips.webp",
    703: "./asset/products/chocolate.png",
    704: "./asset/products/cookie.png",
    705: "./asset/products/nuts.png",
    706: "./asset/products/gaz.webp"

};

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
    emoji.textContent = product.emoji;
    emoji.setAttribute("aria-hidden", "true");

    return emoji;
}

function createProductCard(product,offers,stock){
  const offer=offers.find(offer => {
    return offer.productId ===product.id;
  });
  const quantity=stock.items[product.id] ?? 0;
  const isAvailable=quantity>0;
  
  const card=document.createElement("article");
  card.classList.add("product-card");

  if(offer){
    card.classList.add("product-card-discount");
  }
  if(!isAvailable){
    card.classList.add("product-card-unavailable");
  }
  if(offer){
    const badge=document.createElement("span");
    badge.classList.add("discount-badge");
    badge.textContent = `${priceFormatter.format(offer.percent)}٪`;
    badge.title=offer.label;
    card.appendChild(badge);
  }
   if (!isAvailable) {
        const badge = document.createElement("span");
        badge.classList.add("unavailable-badge");
        badge.textContent = "ناموجود";
        card.appendChild(badge);
    }
    const media=createProductMedia(product);

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

card.append(media, name, unit, priceBox);

    const button = document.createElement("button");
    button.type = "button";
    if(!isAvailable){
      button.textContent="ناموجود"
      button.disabled=true;
    } else{
    button.textContent = "افزودن به سبد";
    }
    card.append(button);
    return card;
}

function renderProductCarousel(container, products, offers, stock){
  const cards=products.map(product =>{
    return createProductCard(product, offers, stock);
  });
  container.replaceChildren(...cards);
  container.setAttribute("aria-busy", "false");
}
async function loadProducts() {
  try{
    const urls=[
      "../../api/products.json",
      "../../api/offers.json",
      "../../api/stock.json"
    ];
  const responses=await Promise.all(urls.map(url => fetch(url)));
  responses.forEach((response,index) => {
    if(!response.ok){
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  });
  const [products, offers, stock]=await Promise.all(responses.map(response => response.json()));
  console.log("Products:", products.length);
  console.log("Offers:", offers.length);
  console.log("Stock:", stock);

  const dairyProducts=products.filter(products => {
    return products.categoryId===2;
  });

  const offeredProducts = products.filter(product => {
     return offers.some(offer => offer.productId === product.id);
  });

  
renderProductCarousel(dairyContainer, dairyProducts, offers, stock);

renderProductCarousel(todayContainer, offeredProducts, offers, stock);

}catch(error){
  console.error("Failed to load products:", error);
  dairyContainer.replaceChildren();
  const errorMessage=document.createElement("p");
  errorMessage.classList.add("error-message");
  errorMessage.textContent="دریافت محصولات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.";
  errorMessage.setAttribute("role","alert");
  dairyContainer.appendChild(errorMessage);

  todayContainer.replaceChildren();

  const todayError = document.createElement("p");
  todayError.classList.add("error-message");
  todayError.setAttribute("role", "alert");
  todayError.textContent = "دریافت پیشنهادهای امروز با مشکل مواجه شد.";

  todayContainer.appendChild(todayError);

}finally{
  dairyContainer.setAttribute("aria-busy","false");
  todayContainer.setAttribute("aria-busy", "false");
}
}

function setupCarouselControls(container, startButton, endButton) {
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

setupCarouselControls(
    dairyContainer,
    document.querySelector("#dairy-scroll-start"),
    document.querySelector("#dairy-scroll-end")
);

setupCarouselControls(
    todayContainer,
    document.querySelector("#today-scroll-start"),
    document.querySelector("#today-scroll-end")
);

loadProducts();
