import { useState } from "react";
import { useShopData } from "./hooks/useShopData";
import { useCart } from "./hooks/useCart";
import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { HeroCards } from "./components/HeroCards";
import { CategoriesSection } from "./components/CategoriesSection";
import { SaleCountdown } from "./components/SaleCountdown";
import { CategoryNav } from "./components/CategoryNav";
import { SpecialOffers } from "./components/SpecialOffers";
import { BannersSection } from "./components/BannersSection";
import { ProductGrid } from "./components/ProductGrid";
import { CartPanel } from "./components/CartPanel";
import { SiteFooter } from "./components/SiteFooter";

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

  const { products, categories, shop, home, offers, stock } = state.data;
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
      <main>
        <Hero home={home} />
        <HeroCards home={home} />
        <CategoriesSection categories={categories} />
        <SaleCountdown />
        <CategoryNav
          categories={categories}
          activeId={categoryId}
          onPick={setCategoryId}
        />
        <SpecialOffers
          products={products}
          offers={offers}
          stock={stock}
          onAdd={addToCart}
        />
        <BannersSection home={home} />
        <ProductGrid products={filtered} onAdd={addToCart} />
      </main>
      <CartPanel cart={cart} />
      <SiteFooter shop={shop} categories={categories} />
    </>
  );
}
