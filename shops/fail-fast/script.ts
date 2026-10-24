// Type definitions
interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  unit: string;
  emoji: string;
}

interface Offer {
  productId: number;
  percent: number;
}

interface Stock {
  items: Record<number, number>;
}

interface OfferProduct extends Product {
  percent: number;
  quantity: number;
  discountedPrice: number;
}

// API URLs
const API_PRODUCTS_URL = "../../api/products.json";
const API_OFFERS_URL = "../../api/offers.json";
const API_STOCK_URL = "../../api/stock.json";

// Load dairy products
async function loadDairyProducts(): Promise<void> {
  const container = document.querySelector<HTMLElement>("#dairy-products");

  if (!container) {
    console.error("Container #dairy-products not found");
    return;
  }

  try {
    const response = await fetch(API_PRODUCTS_URL);

    if (!response.ok) {
      throw new Error("لطفا چند لحظه منتظر بمانید");
    }

    const products: Product[] = await response.json();

    const dairyProducts = products.filter((product: Product): boolean => {
      return product.categoryId === 2;
    });

    const template = container.querySelector<HTMLElement>("#dairy-template");

    if (!template) {
      console.error("Template #dairy-template not found");
      return;
    }

    template.remove();

    dairyProducts.forEach((product: Product, index: number): void => {
      const card = template.cloneNode(true) as HTMLElement;

      card.removeAttribute("id");

      if (index === 0) {
        card.id = "dairy-first";
      }

      if (index === dairyProducts.length - 1) {
        card.id = "dairy-last";
      }

      const emojiElement = card.querySelector(".product-emoji") as HTMLElement;
      const headingElement = card.querySelector("h3") as HTMLElement;
      const unitElement = card.querySelector(".product-info p") as HTMLElement;
      const priceElement = card.querySelector(".product-price") as HTMLElement;
      const button = card.querySelector("button") as HTMLButtonElement;

      if (emojiElement) emojiElement.textContent = product.emoji;
      if (headingElement) headingElement.textContent = product.name;
      if (unitElement) unitElement.textContent = product.unit;

      if (priceElement) {
        priceElement.textContent = `${new Intl.NumberFormat("fa-IR").format(product.price)} تومان`;
      }

      if (button) {
        button.setAttribute("aria-label", `افزودن ${product.name} به سبد خرید`);
      }

      container.appendChild(card);
    });
  } catch (error) {
    console.error("خطا در دریافت محصولات لبنی:", error);

    const message = document.createElement("p") as HTMLParagraphElement;
    message.textContent = "دریافت محصولات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.";
    container.replaceChildren(message);
  }
}

// Load daily offers
async function loadDailyOffers(): Promise<void> {
  const container = document.querySelector<HTMLElement>("#dailyOffers");

  if (!container) {
    console.error("Container #dailyOffers not found");
    return;
  }

  try {
    const [productsResponse, offersResponse, stockResponse] = await Promise.all([
      fetch(API_PRODUCTS_URL),
      fetch(API_OFFERS_URL),
      fetch(API_STOCK_URL)
    ]);

    if (!productsResponse.ok || !offersResponse.ok || !stockResponse.ok) {
      throw new Error("دریافت اطلاعات با خطا مواجه شد");
    }

    const [products, offers, stock]: [Product[], Offer[], Stock] = await Promise.all([
      productsResponse.json(),
      offersResponse.json(),
      stockResponse.json()
    ]);

    // Filter products that have offers
    const offerProducts: OfferProduct[] = products
      .map((product: Product): OfferProduct | null => {
        const offer = offers.find((item: Offer): boolean => item.productId === product.id);

        if (!offer) {
          return null;
        }

        return {
          ...product,
          percent: offer.percent,
          quantity: stock.items[product.id] ?? 0,
          discountedPrice: Math.round(product.price * (1 - offer.percent / 100))
        };
      })
      .filter((product: OfferProduct | null): product is OfferProduct => product !== null);

    const template = container.querySelector<HTMLElement>("#offer-template");

    if (!template) {
      console.error("Template #offer-template not found");
      return;
    }

    template.remove();
    container.replaceChildren();

    offerProducts.forEach((product: OfferProduct, index: number): void => {
      const card = template.cloneNode(true) as HTMLElement;

      card.removeAttribute("id");

      if (index === 0) {
        card.id = "offer-first";
      }

      if (index === offerProducts.length - 1) {
        card.id = "offer-last";
      }

      const emojiElement = card.querySelector(".product-emoji") as HTMLElement;
      const headingElement = card.querySelector("h3") as HTMLElement;
      const unitElement = card.querySelector(".product-info p") as HTMLElement;
      const discountBadge = card.querySelector(".discount-badge") as HTMLElement;
      const unavailableBadge = card.querySelector(".unavailable-badge") as HTMLElement;
      const oldPrice = card.querySelector(".old-price") as HTMLElement;
      const newPrice = card.querySelector(".new-price") as HTMLElement;
      const button = card.querySelector("button") as HTMLButtonElement;

      if (emojiElement) emojiElement.textContent = product.emoji;
      if (headingElement) headingElement.textContent = product.name;
      if (unitElement) unitElement.textContent = product.unit;

      if (discountBadge) {
        discountBadge.textContent = `${product.percent}٪ تخفیف`;
        discountBadge.hidden = false;
      }

      if (oldPrice) {
        oldPrice.textContent = `${new Intl.NumberFormat("fa-IR").format(product.price)} تومان`;
      }

      if (newPrice) {
        newPrice.textContent = `${new Intl.NumberFormat("fa-IR").format(product.discountedPrice)} تومان`;
      }

      if (button) {
        button.setAttribute("aria-label", `افزودن ${product.name} به سبد خرید`);
      }

      if (product.quantity === 0) {
        card.classList.add("out-of-stock");

        if (unavailableBadge) {
          unavailableBadge.textContent = "ناموجود";
          unavailableBadge.hidden = false;
        }

        if (button) button.disabled = true;
      } else {
        if (unavailableBadge) unavailableBadge.hidden = true;
        if (button) button.disabled = false;
      }

      container.appendChild(card);
    });

    if (offerProducts.length === 0) {
      const message = document.createElement("p") as HTMLParagraphElement;
      message.textContent = "فعلاً پیشنهادی برای نمایش وجود ندارد.";
      container.appendChild(message);
    }
  } catch (error) {
    console.error("خطا در دریافت محصولات پیشنهادی:", error);

    const message = document.createElement("p") as HTMLParagraphElement;
    message.textContent = "دریافت محصولات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.";
    container.replaceChildren(message);
  }
}

// Initialize
loadDairyProducts();
loadDailyOffers();
