import { useEffect, useMemo, useState } from "react";
import type {
  Cart,
  Categories,
  Home,
  LoadState,
  Offers,
  ProductCardData,
  Shop,
  Stock,
} from "./types";
import { fetchSuggestions } from "./api/products";
import { fetchShop } from "./api/shop";
import { fetchHome } from "./api/home";
import {
  addProduct,
  countCartItems,
  removeFromCart,
  totalCartPrice,
} from "./cart/cart-logic";
import { toCard, visibleProducts } from "./catalog/catalog-logic";
import { readCart, writeCart } from "./storage/cart-storage";
import Banner from "./components/Banner";
import CartPanel from "./components/CartPanel";
import CategoryGrid from "./components/CategoryGrid";
import CategoryNav from "./components/CategoryNav";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import StoreFooter from "./components/StoreFooter";
import StoreSupport from "./components/StoreSupport";

export default function App() {
  const [cart, setCart] = useState<Cart>(() => readCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [categories, setCategories] = useState<Categories>([]);
  const [offers, setOffers] = useState<Offers>([]);
  const [stock, setStock] = useState<Stock>({ updatedAt: "", items: {} });
  const [home, setHome] = useState<Home | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  useEffect(() => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.title = `🛒 ${count} نام فروشگاه`;
  }, [cart]);
  useEffect(() => {
    let ignore = false;

    Promise.all([fetchSuggestions(), fetchShop(), fetchHome()])
      .then(([suggestionsData, shopData, homeData]) => {
        if (ignore) return;

        setCategories(shopData.categories);
        setShop(shopData.shop);
        setOffers(suggestionsData.offers);
        setStock(suggestionsData.stock);
        setHome(homeData);
        setLoadState(
          suggestionsData.products.length > 0
            ? { status: "success", products: suggestionsData.products }
            : { status: "empty" },
        );
      })
      .catch(() => {
        if (ignore) return;
        setLoadState({
          status: "error",
          message:
            "دریافت اطلاعات فروشگاه با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
        });
      });

    return () => {
      ignore = true;
    };
  }, []);

  const products = loadState.status === "success" ? loadState.products : [];
  const filteredProducts = useMemo(
    () => visibleProducts(products, searchQuery),
    [products, searchQuery],
  );
  const cards: ProductCardData[] = useMemo(
    () =>
      filteredProducts.map((product) => toCard(product, offers, stock.items)),
    [filteredProducts, offers, stock],
  );

  function saveCart(nextCart: Cart) {
    setCart(nextCart);
    if (!writeCart(nextCart)) {
      window.alert("ذخیره سبد خرید در این مرورگر امکان‌پذیر نیست");
    }
  }

  function handleAdd(data: ProductCardData) {
    saveCart(addProduct(cart, data.product, data.price));
  }

  function handleUpdateQuantity(productId: number, delta: number) {
    const item = cart.find((cartItem) => cartItem.productId === productId);
    if (!item) return;
    if (item.quantity + delta <= 0) {
      saveCart(removeFromCart(cart, productId));
      return;
    }
    saveCart(
      cart.map((cartItem) =>
        cartItem.productId === productId
          ? { ...cartItem, quantity: cartItem.quantity + delta }
          : cartItem,
      ),
    );
  }

  function renderCatalog() {
    switch (loadState.status) {
      case "loading":
        return (
          <section
            className="carousel-container"
            aria-live="polite"
            aria-label="در حال بارگذاری محصولات"
          >
            <div className="carousel-header">
              <h2 className="section-title">در حال دریافت محصولات...</h2>
            </div>
            <div className="carousel-track">
              {Array.from({ length: 5 }, (_, index) => (
                <div className="product-skeleton" key={index} />
              ))}
            </div>
          </section>
        );
      case "success": {
        const offerCards = cards.filter(
          (card) => card.discountPercent !== undefined,
        );
        return (
          <>
            <ProductGrid
              id="offers"
              title="پیشنهاد ویژه امروز"
              emoji="🔥"
              products={offerCards}
              onAdd={handleAdd}
            />
            {categories.map((category) => (
              <ProductGrid
                key={category.id}
                id={category.slug}
                title={category.name}
                emoji={category.emoji}
                products={cards.filter(
                  (card) => card.product.categoryId === category.id,
                )}
                onAdd={handleAdd}
              />
            ))}
          </>
        );
      }
      case "empty":
        return (
          <p className="product-empty" role="status">
            در حال حاضر محصولی برای نمایش وجود ندارد.
          </p>
        );
      case "error":
        return (
          <div className="product-error" role="alert">
            <span className="product-error__icon" aria-hidden="true">
              !
            </span>
            <p className="product-error__message">{loadState.message}</p>
            <button
              className="product-error__retry"
              type="button"
              onClick={() => window.location.reload()}
            >
              تلاش مجدد
            </button>
          </div>
        );
      default: {
        const exhaustiveCheck: never = loadState;
        return exhaustiveCheck;
      }
    }
  }

  return (
    <>
      <Header
        cartCount={countCartItems(cart)}
        totalPrice={totalCartPrice(cart)}
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />
      <CategoryNav categories={categories} />
      {home && <Banner slides={[home.hero, home.side]} />}
      <main>
        {categories.length > 0 && <CategoryGrid categories={categories} />}
        {renderCatalog()}
        {home?.promos.map((promo, index) => (
          <section
            className="advertisement anchor-section"
            id={`advertisement-${index + 1}`}
            key={`${promo.href}-${index}`}
          >
            <a href={promo.href} style={{ backgroundColor: promo.color }}>
              <span className="advertisement__emoji" aria-hidden="true">
                {promo.emoji}
              </span>
              <span className="advertisement__text">{promo.text}</span>
            </a>
          </section>
        ))}
      </main>
      <StoreSupport />
      {shop && <StoreFooter shop={shop} categories={categories} />}
      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </>
  );
}
