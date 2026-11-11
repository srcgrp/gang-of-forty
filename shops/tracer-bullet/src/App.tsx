import type { CardProduct, Category, CartLine } from "./types.ts";
import Footer from "./components/Footer.tsx";
import ProductGrid from "./components/ProductGrid.tsx";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import CategoryNav from "./components/CategoryNav.tsx";
import CartPanel from "./components/CartPanel.tsx";
import { useState } from "react";
import {
  addToCart,
  cartCount,
  cartTotal,
  removeFromCart,
} from "./cart/cart-lines.ts";

type SampleProduct = CardProduct & { categoryId: number };

const SAMPLE: SampleProduct[] = [
  {
    id: 1,
    categoryId: 1,
    name: "سیب",
    emoji: "🍎",
    unit: "هر کیلو",
    price: 120000,
    stock: 5,
  },
  {
    id: 2,
    categoryId: 2,
    name: "کره",
    emoji: "🧈",
    unit: "هر کیلو",
    price: 120000,
    stock: 0,
  },
  {
    id: 3,
    categoryId: 3,
    name: "کروسان",
    emoji: "🥐",
    unit: "هر کیلو",
    price: 120000,
    percent: 18,
    newPrice: 99000,
    stock: 5,
  },
];
const SAMPLE_CATEGORIES: Category[] = [
  { id: 1, slug: "fruit", name: "میوه", emoji: "🍎", color: "pink" },
  { id: 2, slug: "dairy", name: "لبنیات", emoji: "🧀", color: "blue" },
  { id: 3, slug: "bread", name: "نان", emoji: "🥨", color: "yellow" },
];

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const shown =
    selectedId === null
      ? SAMPLE
      : SAMPLE.filter((x) => x.categoryId === selectedId);
  const [cart, setCart] = useState<CartLine[]>([]);

  function handleAdd(id: number) {
    const product = SAMPLE.find((p) => p.id === id);
    if (product) setCart((current) => addToCart(current, product));
  }

  function handleRemove(id: number) {
    setCart((current) => removeFromCart(current, id));
  }

  const count = cartCount(cart);
  const total = cartTotal(cart);
  return (
    <>
      <a href="#main" className="skip-link">
        پرش به محتوای اصلی
      </a>
      <Header count={count} />
      <main id="main">
        <Hero />
        <CategoryNav
          categories={SAMPLE_CATEGORIES}
          selectedId={selectedId}
          onPick={setSelectedId}
        />
        <ProductGrid products={shown} onAdd={handleAdd} />
        <CartPanel lines={cart} total={total} onRemove={handleRemove} />
      </main>
      <Footer />
    </>
  );
}
