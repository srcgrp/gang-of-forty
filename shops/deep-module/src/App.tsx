import { useState } from "react";
import type { StockData } from "./types";
import { useShopData } from "./hooks/useShopData";
import { useCart } from "./hooks/useCart";
import { useSearch } from "./hooks/useSearch";
import { useFilters, applyFilters } from "./hooks/useFilters";
import { useConsumedStock } from "./hooks/useConsumedStock";
import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { HeroCards } from "./components/HeroCards";
import { CategoriesSection } from "./components/CategoriesSection";
import { SaleCountdown } from "./components/SaleCountdown";
import { SpecialOffers } from "./components/SpecialOffers";
import { BannersSection } from "./components/BannersSection";
import { CategorySections } from "./components/CategorySections";
import { ProductGrid } from "./components/ProductGrid";
import { CartPanel } from "./components/CartPanel";
import { SiteFooter } from "./components/SiteFooter";
import { FilterModal } from "./components/FilterModal";

export default function App() {
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const state = useShopData(attempt);
  const { cart, addToCart, increase, decrease, removeItem, checkout } =
    useCart();
  const { filters, update, reset, activeCount } = useFilters();
  const { consumed, consume } = useConsumedStock();

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

  const effectiveStock: StockData = { items: {} };
  for (const [k, v] of Object.entries(stock.items)) {
    const id = Number(k);
    effectiveStock.items[id] = Math.max(0, v - (consumed[id] ?? 0));
  }

  const filtered = applyFilters(
    products,
    filters,
    offers,
    effectiveStock,
    query,
  );
  const hasActiveFilter = activeCount > 0 || query.length > 0;

  const handleCheckout = () => {
    consume(cart);
    checkout();
    setCartOpen(false);
  };

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
        <SaleCountdown />
        <CategoriesSection categories={categories} />
        <SpecialOffers
          products={products}
          cart={cart}
          offers={offers}
          stock={effectiveStock}
          onAdd={addToCart}
        />
        <BannersSection home={home} />

        {!hasActiveFilter && (
          <CategorySections
            products={products}
            categories={categories}
            cart={cart}
            offers={offers}
            stock={effectiveStock}
            onAdd={addToCart}
          />
        )}

        <section id="all-products" className="products-section">
          <div className="products-section__head">
            <h2 className="section-head__title">
              <span aria-hidden="true">🛒</span> تمام محصولات
            </h2>
            <div className="products-section__actions">
              <span className="section-head__count">
                {filtered.length.toLocaleString("fa-IR")} محصول از{" "}
                {products.length.toLocaleString("fa-IR")}
              </span>
              <button
                type="button"
                className="filter-btn"
                onClick={() => setFilterOpen(true)}
                aria-haspopup="dialog"
                aria-label="باز کردن فیلتر"
              >
                <span aria-hidden="true">🎯</span> فیلتر
                {activeCount > 0 && (
                  <span className="filter-btn__badge">
                    {activeCount.toLocaleString("fa-IR")}
                  </span>
                )}
              </button>
            </div>
          </div>
          <ProductGrid
            products={filtered}
            cart={cart}
            offers={offers}
            stock={effectiveStock}
            onAdd={addToCart}
          />
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
              <CartPanel
                cart={cart}
                onIncrease={increase}
                onDecrease={decrease}
                onRemove={removeItem}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      )}

      <FilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        categories={categories}
        filters={filters}
        onChange={update}
        onReset={reset}
      />
    </>
  );
}
