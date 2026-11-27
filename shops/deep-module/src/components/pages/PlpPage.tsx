import { useEffect, useState } from "react";
import { Link, useParams, useSearch } from "@tanstack/react-router";
import { useCatalog } from "../../hooks/useCatalog";
import { useCartStore } from "../../hooks/useCartStore";
import { getCarouselProducts, sortProducts } from "../../catalog/catalog";
import { getEffectiveStock } from "../../catalog/stock";
import { faNum } from "../../shared/ui/format";
import { ProductGrid } from "../ProductGrid";
import { PlpHeader } from "../PlpHeader";

const PLP_PAGE_SIZE = 6;

export function PlpPage() {
  const { carouselId } = useParams({ from: "/plp/$carouselId" });
  const { sort } = useSearch({ from: "/plp/$carouselId" });
  const { state } = useCatalog();
  const consumed = useCartStore((s) => s.consumed);
  const [visibleCount, setVisibleCount] = useState(PLP_PAGE_SIZE);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);

  useEffect(() => {
    setVisibleCount(PLP_PAGE_SIZE);
  }, [carouselId, sort, inStockOnly, discountOnly]);

  if (state.status === "loading") return <section className="products-section page-section"><ProductGrid products={[]} isLoading /></section>;
  if (state.status !== "success") return null;

  const match = getCarouselProducts(state.data, carouselId);
  if (!match) {
    return (
      <section className="empty-state">
        <h1 className="empty-state__title">این فهرست پیدا نشد</h1>
        <Link to="/" className="btn btn--primary empty-state__btn">بازگشت به خانه</Link>
      </section>
    );
  }

  const effectiveStock = getEffectiveStock(state.data.stock, consumed);
  const offerIds = new Set(state.data.offers.map((o) => o.productId));
  const filtered = match.products.filter((p) => {
    if (inStockOnly && (effectiveStock.items[p.id] ?? Infinity) === 0) return false;
    if (discountOnly && !offerIds.has(p.id)) return false;
    return true;
  });
  const sorted = sortProducts(filtered, sort);
  const visible = sorted.slice(0, visibleCount);
  const resetFilters = () => { setInStockOnly(false); setDiscountOnly(false); };

  return (
    <section className="products-section page-section plp-page">
      <PlpHeader carouselId={carouselId} title={match.carousel.title} emoji={match.carousel.emoji} totalCount={sorted.length} sort={sort} inStockOnly={inStockOnly} discountOnly={discountOnly} onToggleStock={() => setInStockOnly((v) => !v)} onToggleDiscount={() => setDiscountOnly((v) => !v)} />
      <ProductGrid products={visible} offers={state.data.offers} stock={effectiveStock} onResetFilters={inStockOnly || discountOnly ? resetFilters : undefined} />
      {sorted.length > visibleCount && (
        <div className="load-more-wrap">
          <button type="button" className="load-more-btn" onClick={() => setVisibleCount((c) => c + PLP_PAGE_SIZE)}>
            <span>مشاهده بیشتر</span>
            <span className="load-more-btn__count">({faNum(Math.min(PLP_PAGE_SIZE, sorted.length - visibleCount))} مورد دیگر)</span>
          </button>
        </div>
      )}
    </section>
  );
}
