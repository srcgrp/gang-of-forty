import type { CartLine, Offer, Product, StockData } from "../types";
import type { FilterValues, SortFilter } from "../hooks/useFilters";
import { ProductGrid } from "./ProductGrid";

const SORTS: { v: SortFilter; l: string }[] = [
  { v: "default", l: "پیش‌فرض" },
  { v: "price-asc", l: "ارزان‌ترین" },
  { v: "price-desc", l: "گران‌ترین" },
  { v: "name", l: "الفبا" },
];

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
        products={p.filtered}
        cart={p.cart}
        offers={p.offers}
        stock={p.stock}
        onAdd={p.onAdd}
        wishlistIds={p.wishlistIds}
        onToggleWishlist={p.onToggleWishlist}
      />
    </section>
  );
}
