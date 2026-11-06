import { useState } from "react";
import { useShopData } from "./hooks/useShopData";
import { useCart } from "./hooks/useCart";
import { useSearch } from "./hooks/useSearch";
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
  const [cartOpen, setCartOpen] = useState(false);
  const state = useShopData(attempt);
  const { cart, addToCart } = useCart();

  const allProducts = state.status === "success" ? state.data.products : [];
  const suggestions = useSearch(allProducts, query);

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
        categories={categories}
        cartCount={cart.length}
        query={query}
        onQuery={setQuery}
        suggestions={suggestions}
        onPickProduct={addToCart}
        onOpenCart={() => setCartOpen(true)}
      />
      <main id="main" tabIndex={-1}>
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
        <section id="all-products" className="products-section">
          <ProductGrid products={filtered} onAdd={addToCart} />
        </section>
      </main>
      <SiteFooter shop={shop} categories={categories} />

      {cartOpen && (
        <div
          className="modal modal--open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-modal-title"
        >
          <div className="modal__overlay" onClick={() => setCartOpen(false)} />
          <div className="modal__content modal__content--cart">
            <header className="modal__header">
              <h2 className="modal__title" id="cart-modal-title">
                <span aria-hidden="true">🛒</span> سبد خرید
              </h2>
              <button
                type="button"
                className="modal__close"
                onClick={() => setCartOpen(false)}
                aria-label="بستن"
              >
                ✕
              </button>
            </header>
            <div className="modal__body">
              <CartPanel cart={cart} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
