import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryGrid from "./components/CategoryGrid";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";

import {
  SAMPLE,
  SAMPLE_CATEGORIES,
  SAMPLE_OFFERS,
  SAMPLE_STOCK,
} from "./sample-data";

import {
  addSampleProduct,
  changeSampleCart,
  getSampleCartSummary,
} from "./sample-cart";

import type { CartAction, CartItem } from "./shared/types/products";

export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const visibleProducts =
    categoryId === null
      ? SAMPLE
      : SAMPLE.filter((product) => product.categoryId === categoryId);

  const { rows, count, total } = getSampleCartSummary(cart);

  function handleAdd(id: number): void {
    setCart((current) => addSampleProduct(current, id));
  }

  function handleCartAction(action: CartAction, id: number): void {
    setCart((current) => changeSampleCart(current, action, id));
  }

  return (
    <>
      <Header
        categories={SAMPLE_CATEGORIES}
        activeCategoryId={categoryId}
        onPickCategory={setCategoryId}
        cartCount={count}
        cartRows={rows}
        cartTotal={total}
        onCartAction={handleCartAction}
        onClearCart={() => setCart([])}
      />
      <main id="main-content">
        <Hero />
        <CategoryGrid categories={SAMPLE_CATEGORIES} onPick={setCategoryId} />
        <ProductGrid
          products={visibleProducts}
          offers={SAMPLE_OFFERS}
          stock={SAMPLE_STOCK}
          onAdd={handleAdd}
        />
      </main>
      <Footer />
    </>
  );
}
