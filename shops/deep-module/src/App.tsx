import { useState } from "react";
import { useShopData } from "./hooks/useShopData";
import { useCart } from "./hooks/useCart";
import { SiteHeader } from "./components/SiteHeader";
import { SaleCountdown } from "./components/SaleCountdown";
import { CategoryNav } from "./components/CategoryNav";
import { ProductGrid } from "./components/ProductGrid";
import { CartPanel } from "./components/CartPanel";

export default function App() {
  const [attempt, setAttempt] = useState(0);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const state = useShopData(attempt);
  const { cart, addToCart } = useCart();

  if (state.status === "loading") {
    return <div className="global-loader">در حال بارگذاری...</div>;
  }

  if (state.status === "error") {
    return (
      <div className="state-error">
        <p>{state.message}</p>
        <button onClick={() => setAttempt((a) => a + 1)}>تلاش مجدد</button>
      </div>
    );
  }

  const { products, categories, shop } = state.data;
  const filtered = products.filter(
    (p) =>
      (categoryId === null || p.categoryId === categoryId) &&
      p.name.includes(query),
  );

  return (
    <>
      <SiteHeader
        shop={shop}
        cartCount={cart.length}
        query={query}
        onQuery={setQuery}
      />
      <SaleCountdown />
      <CategoryNav
        categories={categories}
        activeId={categoryId}
        onPick={setCategoryId}
      />
      <ProductGrid products={filtered} onAdd={addToCart} />
      <CartPanel cart={cart} />
    </>
  );
}
