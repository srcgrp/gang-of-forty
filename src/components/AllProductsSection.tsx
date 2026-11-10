import { useState, useEffect } from "react";
import type { CartLine, Offer, Product, StockData } from "../types";
import type { FilterValues, SortFilter } from "../hooks/useFilters";
import { ProductGrid } from "./ProductGrid";

const SORTS: { v: SortFilter; l: string }[] = [
  { v: "default", l: "پیش‌فرض" },
  { v: "price-asc", l: "ارزان‌ترین" },
  { v: "price-desc", l: "گران‌ترین" },
  { v: "name", l: "الفبا" },
];

const PAGE_SIZE = 8;

interface Props {
  filtered: Product[];
  cart: CartLine[];
  offers: Offer[];
  stock: StockData;
  filters: FilterValues;
  onUpdate: (patch: Partial<FilterValues>) => void;
  hasRealFilters: boolean;
  realActiveCount: number;
  onOpenFilter: () => void;
  onAdd: (p: Product) => void;
  wishlistIds: number[];
  onToggleWishlist: (p: Product) => void;
}

export function AllProductsSection(p: Props) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [
    p.filters.categoryId,
    p.filters.stock,
    p.filters.discount,
    p.filters.sort,
  ]);

  const visibleProducts = p.filtered.slice(0, visible);
  const hasMore = visible < p.filtered.length;

  return (
    <section id="all-products" className="products-section">
      <header className="products-section__head all-products__header">
        <div className="all-products__title-wrap">
          <h2 className="section-head__title">
            <span aria-hidden="true">🛒</span> تمام محصولات
          </h2>
          <span className="section-head__count">
            {p.filtered.length.toLocaleString("fa-IR")} محصول
          </span>
        </div>
        <div className="all-products__sort" role="tablist">
          {SORTS.map((s) => (
            <button
              key={s.v}
              type="button"
              role="tab"
              aria-selected={p.filters.sort === s.v}
              className={`all-products__sort-btn ${p.filters.sort === s.v ? "is-active" : ""}`}
              onClick={() => p.onUpdate({ sort: s.v })}
            >
              {s.l}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`filter-btn ${p.hasRealFilters ? "filter-btn--active" : ""}`}
          onClick={p.onOpenFilter}
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
          {p.realActiveCount > 0 && (
            <span className="filter-btn__badge">
              {p.realActiveCount.toLocaleString("fa-IR")}
            </span>
          )}
        </button>
      </header>
      <ProductGrid
        products={visibleProducts}
        cart={p.cart}
        offers={p.offers}
        stock={p.stock}
        onAdd={p.onAdd}
        wishlistIds={p.wishlistIds}
        onToggleWishlist={p.onToggleWishlist}
      />
      {hasMore && (
        <div className="all-products__more">
          <button
            type="button"
            className="all-products__more-btn"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            <span>مشاهده محصولات بیشتر</span>
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
            <span className="all-products__more-count">
              {Math.min(PAGE_SIZE, p.filtered.length - visible).toLocaleString(
                "fa-IR",
              )}{" "}
              مورد دیگر
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
