import { useMemo, useState } from "react";
import type { Cart, Categories, HomeSlide, Offer, Product, ProductCardData } from "./types";
import { addProduct, countCartItems, removeFromCart, totalCartPrice } from "./cart/cart-logic";
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

const SAMPLE_CATEGORIES: Categories = [
  { id: 1, slug: "fruits", name: "میوه و سبزی", emoji: "🍎", color: "#fce7e7" },
  { id: 2, slug: "dairy", name: "لبنیات", emoji: "🥛", color: "#e4f2ff" },
  { id: 3, slug: "bakery", name: "نان و شیرینی", emoji: "🥐", color: "#fff0d8" },
  { id: 4, slug: "pantry", name: "خواربار", emoji: "🍚", color: "#e8f5e9" },
];

const SAMPLE: Product[] = [
  { id: 101, categoryId: 1, name: "سیب قرمز دماوند", emoji: "🍎", unit: "هر کیلوگرم", price: 85000, tags: ["تازه"] },
  { id: 201, categoryId: 2, name: "شیر پرچرب تازه", emoji: "🥛", unit: "بطری ۱ لیتری", price: 38000, tags: ["روزانه"] },
  { id: 301, categoryId: 3, name: "نان کروسان", emoji: "🥐", unit: "بسته ۲ عددی", price: 62000, tags: ["تازه پخت"] },
  { id: 401, categoryId: 4, name: "برنج ایرانی", emoji: "🍚", unit: "هر کیلوگرم", price: 145000, tags: ["محبوب"] },
];

const SAMPLE_OFFERS: Offer[] = [
  { productId: 101, percent: 10, label: "پیشنهاد ویژه" },
  { productId: 301, percent: 15, label: "تخفیف امروز" },
];

const SAMPLE_SLIDES: HomeSlide[] = [
  { emoji: "🥬", title: "تازگی را به خانه ببرید", text: "محصولات تازه و باکیفیت را هر روز از فروشگاه مینا تهیه کنید.", cta: { href: "#fruits", label: "مشاهده محصولات" } },
  { emoji: "🛒", title: "خریدی آسان و دلپذیر", text: "نیازهای روزانه‌تان را به‌سادگی از یک‌جا تهیه کنید.", cta: { href: "#products", label: "شروع خرید" } },
];

export default function App() {
  const [cart, setCart] = useState<Cart>(() => readCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(
    () => visibleProducts(SAMPLE, searchQuery),
    [searchQuery],
  );
  const cards: ProductCardData[] = useMemo(
    () => filteredProducts.map((product) => toCard(product, SAMPLE_OFFERS)),
    [filteredProducts],
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
    saveCart(cart.map((cartItem) =>
      cartItem.productId === productId
        ? { ...cartItem, quantity: cartItem.quantity + delta }
        : cartItem,
    ));
  }

  const offerCards = cards.filter((card) => card.discountPercent !== undefined);

  return (
    <>
      <Header
        cartCount={countCartItems(cart)}
        totalPrice={totalCartPrice(cart)}
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />
      <CategoryNav categories={SAMPLE_CATEGORIES} />
      <Banner slides={SAMPLE_SLIDES} />
      <main>
        <CategoryGrid categories={SAMPLE_CATEGORIES} />
        <ProductGrid
          id="offers"
          title="پیشنهاد ویژه امروز"
          emoji="🔥"
          products={offerCards}
          onAdd={handleAdd}
        />
        {SAMPLE_CATEGORIES.map((category) => (
          <ProductGrid
            key={category.id}
            id={category.slug}
            title={category.name}
            emoji={category.emoji}
            products={cards.filter((card) => card.product.categoryId === category.id)}
            onAdd={handleAdd}
          />
        ))}
      </main>
      <StoreSupport />
      <StoreFooter />
      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </>
  );
}
