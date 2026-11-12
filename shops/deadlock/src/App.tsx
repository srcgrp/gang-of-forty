import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import ProductGrid from "./components/ProductGrid";
import CartPanel from "./components/CartPanel";
import type { CartLine, Product } from "./types";
import { addToCart, cartTotal, removeFromCart } from "./features/cart/cartState";
import { useState } from "react";


const SAMPLE: Product[] = [
  {
    id: 1,
    categoryId: 1,
    name: "سیب",
    emoji: "🍎",
    unit: "یک کیلو",
    price: 120000,
    tags: ["میوه"],
  },
  {
    id: 2,
    categoryId: 2,
    name: "شیر",
    emoji: "🥛",
    unit: "یک بطری",
    price: 45000,
    tags: ["لبنیات"],
  },
  {
    id: 3,
    categoryId: 3,
    name: "نان",
    emoji: "🍞",
    unit: "یک عدد",
    price: 30000,
    tags: ["نان"],
  },
];

export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const visibleProducts =
    categoryId === null
      ? SAMPLE
      : SAMPLE.filter((product) => product.categoryId === categoryId);
  const cartCount = cart.reduce((count, line) => count + line.quantity, 0);

  return (
    <>
      <Header cartCount={cartCount} />
      <main id="main-content">
        <CategoryNav selectedId={categoryId} onPick={setCategoryId} />
        <ProductGrid
          products={visibleProducts}
          onAdd={(id) => setCart((current) => addToCart(current, id))}
        />
        <CartPanel
          cart={cart}
          products={SAMPLE}
          total={cartTotal(cart, SAMPLE)}
          onRemove={(id) => setCart((current) => removeFromCart(current, id))}
        />
      </main>
    </>
  );
}
