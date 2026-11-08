import { useState, useLayoutEffect, useRef } from "react";
import type { Product, StockData } from "./types";
import { useShopData } from "./hooks/useShopData";
import { useCart } from "./hooks/useCart";
import { useSearch } from "./hooks/useSearch";
import { useFilters, applyFilters } from "./hooks/useFilters";
import { useConsumedStock } from "./hooks/useConsumedStock";
import { toast } from "./shared/ui/toast";
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

  // ✅ ref برای ذخیره موقعیت اسکرول
  const scrollRef = useRef<number>(0);
  const prevQueryRef = useRef<string>("");

  const state = useShopData(attempt);
  const { cart, addToCart, increase, decrease, removeItem, checkout } =
    useCart();
  const { filters, update, reset } = useFilters();
  const { consumed, consume } = useConsumedStock();

  const allProducts = state.status === "success" ? state.data.products : [];
  const suggestions = useSearch(allProducts, query);

  // ✅ وقتی query تغییر می‌کند، موقعیت اسکرول را حفظ کن
  useLayoutEffect(() => {
    if (prevQueryRef.current !== query) {
      const saved = scrollRef.current;
      prevQueryRef.current = query;
      if (saved > 0) {
        window.scrollTo({ top: saved, behavior: "instant" });
      }
    }
  }, [query]);

  // ✅ قبل از هر تغییر query، موقعیت فعلی را ذخیره کن
  const handleQuery = (q: string) => {
    scrollRef.current = window.scrollY;
    setQuery(q);
  };

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

  const handleAddToCart = (product: Product): boolean => {
    const available = effectiveStock.items[product.id] ?? Infinity;
    const existing = cart.find((i) => i.id === product.id);
    const currentInCart = existing?.quantity ?? 0;

    if (available === 0) {
      toast.error(`${product.name} موجود نیست`);
      return false;
    }

    if (currentInCart >= available) {
      toast.error(`حداکثر ${available} عدد از ${product.name} موجوده`);
      return false;
    }

    addToCart(product);
    return true;
  };

  const filtered = applyFilters(products, filters, offers, effectiveStock, "");

  const hasRealFilters =
    filters.categoryId !== null ||
    filters.stock !== "all" ||
    filters.discount !== "all";

  const realActiveCount =
    (filters.categoryId !== null ? 1 : 0) +
    (filters.stock !== "all" ? 1 : 0) +
    (filters.discount !== "all" ? 1 : 0);

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
        onQuery={handleQuery}
        suggestions={suggestions}
        onPickProduct={handleAddToCart}
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
          onAdd={handleAddToCart}
        />
        <BannersSection home={home} />

        {!hasRealFilters && (
          <CategorySections
            products={products}
            categories={categories}
            cart={cart}
            offers={offers}
            stock={effectiveStock}
            onAdd={handleAddToCart}
          />
        )}

        <section id="all-products" className="products-section">
          <header className="products-section__head all-products__header">
            <div className="all-products__title-wrap">
              <h2 className="section-head__title">
                <span aria-hidden="true">🛒</span> تمام محصولات
              </h2>
              <span className="section-head__count">
                {filtered.length.toLocaleString("fa-IR")} محصول
              </span>
            </div>

            <div className="all-products__sort" role="tablist">
              {[
                { v: "default" as const, l: "پیش‌فرض" },
                { v: "price-asc" as const, l: "ارزان‌ترین" },
                { v: "price-desc" as const, l: "گران‌ترین" },
                { v: "name" as const, l: "الفبا" },
              ].map((s) => (
                <button
                  key={s.v}
                  type="button"
                  role="tab"
                  aria-selected={filters.sort === s.v}
                  className={`all-products__sort-btn ${filters.sort === s.v ? "is-active" : ""}`}
                  onClick={() => update({ sort: s.v })}
                >
                  {s.l}
                </button>
              ))}
            </div>

            <button
              type="button"
              className={`filter-btn ${hasRealFilters ? "filter-btn--active" : ""}`}
              onClick={() => setFilterOpen(true)}
              aria-haspopup="dialog"
              aria-label="باز کردن فیلتر"
            >
              <span className="filter-btn__icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 6h16M7 12h10M10 18h4" />
                </svg>
              </span>
              فیلتر
              {realActiveCount > 0 && (
                <span className="filter-btn__badge">
                  {realActiveCount.toLocaleString("fa-IR")}
                </span>
              )}
            </button>
          </header>

          <ProductGrid
            products={filtered}
            cart={cart}
            offers={offers}
            stock={effectiveStock}
            onAdd={handleAddToCart}
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
