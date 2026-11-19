import { Link } from "@tanstack/react-router";
import type { Offer, Product, StockData } from "../types";
import { ProductCard } from "./ProductCard";
import { SkeletonCard } from "./SkeletonCard";

interface ProductGridProps {
  products: Product[];
  offers?: Offer[] | undefined;
  stock?: StockData | undefined;
  isLoading?: boolean | undefined;
  onResetFilters?: (() => void) | undefined;
}

const SKELETON_ITEMS = [1, 2, 3, 4, 5, 6];

export function ProductGrid({ products, offers = [], stock, isLoading = false, onResetFilters }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="products-grid product-grid-premium" aria-busy="true" aria-label="در حال بارگذاری...">
        {SKELETON_ITEMS.map((n) => <SkeletonCard key={n} />)}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5M8.5 11h5" />
          </svg>
        </div>
        <h2 className="empty-state__title">محصولی یافت نشد</h2>
        <p className="empty-state__desc">هیچ کالایی با فیلترهای انتخابی شما مطابقت ندارد.</p>
        {onResetFilters ? (
          <button type="button" className="btn btn--primary empty-state__btn" onClick={onResetFilters}>پاک کردن فیلترها</button>
        ) : (
          <Link to="/" className="btn btn--primary empty-state__btn">مشاهده همه محصولات</Link>
        )}
      </div>
    );
  }

  const offerMap = new Map(offers.map((o) => [o.productId, o.percent]));

  return (
    <div className="products-grid product-grid-premium">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} stock={stock?.items[p.id]} discountPercent={offerMap.get(p.id)} />
      ))}
    </div>
  );
}
