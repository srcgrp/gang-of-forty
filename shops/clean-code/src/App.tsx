import { useState } from "react";
import Banner from "./components/Banner.tsx";
import CartPanel from "./components/CartPanel.tsx";
import CategoryNav from "./components/CategoryNav.tsx";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import ProductGrid from "./components/ProductGrid.tsx";
import { addToCart, cartCount, removeFromCart } from "./features/cart/count.ts";
import { cartRows, cartTotal } from "./features/cart/rows.ts";
import {
  SAMPLE,
  SAMPLE_CATEGORIES,
  SAMPLE_HELP,
  SAMPLE_MENU,
  SAMPLE_OFFERS,
  SAMPLE_STOCK,
} from "./sample.ts";
import type { CartLine } from "./types/product.ts";

export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);

  const visibleProducts =
    categoryId === null
      ? SAMPLE
      : SAMPLE.filter(function (p) {
          return p.categoryId === categoryId;
        });
  const rows = cartRows(cart, SAMPLE);
  const total = cartTotal(rows, SAMPLE_OFFERS);
  const count = cartCount(cart);

  function handlePick(id: number | null): void {
    setCategoryId(id);
  }

  function handleAdd(id: number): void {
    setCart(addToCart(cart, id, SAMPLE_STOCK[id] ?? 0));
  }

  function handleClear(): void {
    setCart(removeFromCart());
  }

  return (
    <>
      <Banner />
      <Header cartCount={count} menu={SAMPLE_MENU} />
      <main id="content">
        <div className="box">
          <CategoryNav
            categories={SAMPLE_CATEGORIES}
            selectedId={categoryId}
            onPick={handlePick}
          />
          <ProductGrid
            products={visibleProducts}
            stock={SAMPLE_STOCK}
            offers={SAMPLE_OFFERS}
            onAdd={handleAdd}
          />
          <CartPanel rows={rows} total={total} onClear={handleClear} />
        </div>
      </main>
      <Footer categories={SAMPLE_CATEGORIES} help={SAMPLE_HELP} />
    </>
  );
}
