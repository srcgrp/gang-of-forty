
const API_URL = "../../api/products.json";


async function loadDairyProducts() {
  const container = document.querySelector("#dairy-products");

  try {
    const response = await fetch("../../api/products.json");

    if (!response.ok) {
      throw new Error("لطفا چند لحظه منتظر بمانید");
    }

    const products = await response.json();

    const dairyProducts = products.filter(function (product) {
      return product.categoryId === 2;
    });

    const template = container.querySelector("#dairy-template");

    template.remove();

    dairyProducts.forEach(function (product, index) {
      const card = template.cloneNode(true);

      card.removeAttribute("id");

      if (index === 0) {
        card.id = "dairy-first";
      }

      if (index === dairyProducts.length - 1) {
        card.id = "dairy-last";
      }

      card.querySelector(".product-emoji").textContent = product.emoji;
      card.querySelector("h3").textContent = product.name;
      card.querySelector(".product-info p").textContent = product.unit;

      card.querySelector(".product-price").textContent =
        `${new Intl.NumberFormat("fa-IR").format(product.price)} تومان`;

      const button = card.querySelector("button");

      button.setAttribute(
        "aria-label",
        `افزودن ${product.name} به سبد خرید`
      );

      container.appendChild(card);
    });
  } catch (error) {
    console.error("خطا در دریافت محصولات لبنی:", error);

    const message = document.createElement("p");
    message.textContent =
      "دریافت محصولات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.";

    container.replaceChildren(message);
  }
}

loadDairyProducts();



// daily offers

async function loadDailyOffers() {
  const container = document.querySelector("#dailyOffers");
  

  try {
    const [productsResponse, offersResponse, stockResponse] =
      await Promise.all([
        fetch("../../api/products.json"),
        fetch("../../api/offers.json"),
        fetch("../../api/stock.json")
      ]);

    if (
      !productsResponse.ok ||
      !offersResponse.ok ||
      !stockResponse.ok
    ) {
      throw new Error("دریافت اطلاعات با خطا مواجه شد");
    }

    const [products, offers, stock] = await Promise.all([
      productsResponse.json(),
      offersResponse.json(),
      stockResponse.json()
    ]);

    // فقط محصولاتی که تخفیف دارند
    const offerProducts = products
      .map(function (product) {
        const offer = offers.find(function (item) {
          return item.productId === product.id;
        });

        if (!offer) {
          return null;
        }

        return {
          ...product,
          percent: offer.percent,
          quantity: stock.items[product.id],
          discountedPrice: Math.round(
            product.price * (1 - offer.percent / 100)
          )
        };
      })
      .filter(function (product) {
        return product !== null;
      });

    const template = container.querySelector("#offer-template");
    template.remove();
    container.replaceChildren();

    offerProducts.forEach(function (product, index) {
      const card = template.cloneNode(true);

      card.removeAttribute("id");

      if (index === 0) {
        card.id = "offer-first";
      }

      if (index === offerProducts.length - 1) {
        card.id = "offer-last";
      }

      card.querySelector(".product-emoji").textContent =
        product.emoji;

      card.querySelector("h3").textContent = product.name;

      card.querySelector(".product-info p").textContent =
        product.unit;

      const discountBadge =
        card.querySelector(".discount-badge");

      discountBadge.textContent = `${product.percent}٪ تخفیف`;
      discountBadge.hidden = false;

      const unavailableBadge =
        card.querySelector(".unavailable-badge");

      const oldPrice = card.querySelector(".old-price");
      const newPrice = card.querySelector(".new-price");

      oldPrice.textContent =
        `${new Intl.NumberFormat("fa-IR").format(product.price)} تومان`;

      newPrice.textContent =
        `${new Intl.NumberFormat("fa-IR").format(product.discountedPrice)} تومان`;

      const button = card.querySelector("button");

      button.setAttribute(
        "aria-label",
        `افزودن ${product.name} به سبد خرید`
      );

      if (product.quantity === 0) {
        card.classList.add("out-of-stock");

        unavailableBadge.textContent = "ناموجود";
        unavailableBadge.hidden = false;

        button.disabled = true;
      } else {
        unavailableBadge.hidden = true;
        button.disabled = false;
      }

      container.appendChild(card);
    });

    if (offerProducts.length === 0) {
      const message = document.createElement("p");
      message.textContent = "فعلاً پیشنهادی برای نمایش وجود ندارد.";
      container.appendChild(message);
    }
  } catch (error) {
    console.error("خطا در دریافت محصولات پیشنهادی:", error);

    const message = document.createElement("p");
    message.textContent =
      "دریافت محصولات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.";

    container.replaceChildren(message);
  }
}

loadDailyOffers();
