import { Link } from "@tanstack/react-router";
import type { PlpSort } from "../catalog/catalog";
import { faNum } from "../shared/ui/format";

interface PlpHeaderProps {
  carouselId: string;
  title: string;
  emoji?: string | undefined;
  totalCount: number;
  sort: PlpSort;
  inStockOnly: boolean;
  discountOnly: boolean;
  onToggleStock: () => void;
  onToggleDiscount: () => void;
}

export function PlpHeader(p: PlpHeaderProps) {
  return (
    <>
      <header className="plp-header">
        <div className="plp-header__top">
          <div className="plp-header__title-group">
            <span className="plp-header__emoji" aria-hidden="true">{p.emoji || "📦"}</span>
            <div>
              <h1 className="plp-header__title">{p.title}</h1>
              <p className="plp-header__sub">انتخاب محصولات تازه و باکیفیت</p>
            </div>
          </div>
          <div className="plp-header__meta">
            <span className="plp-header__badge">{faNum(p.totalCount)} محصول</span>
            <Link to="/" className="btn btn--ghost plp-header__back">بازگشت به خانه</Link>
          </div>
        </div>
      </header>
      <div className="plp-toolbar" role="region" aria-label="فیلتر و مرتب‌سازی">
        <div className="sort-buttons" role="group" aria-label="مرتب‌سازی">
          <span className="sort-buttons__label">مرتب‌سازی:</span>
          <Link to="/plp/$carouselId" params={{ carouselId: p.carouselId }} search={{ sort: "default" }} className={`sort-btn${p.sort === "default" ? " is-active" : ""}`}>پیشفرض</Link>
          <Link to="/plp/$carouselId" params={{ carouselId: p.carouselId }} search={{ sort: "price" }} className={`sort-btn${p.sort === "price" ? " is-active" : ""}`}>ارزان‌ترین</Link>
        </div>
        <div className="plp-toolbar__filters">
          <button type="button" className={`plp-filter-chip${p.inStockOnly ? " is-active" : ""}`} onClick={p.onToggleStock} aria-pressed={p.inStockOnly}>فقط موجود</button>
          <button type="button" className={`plp-filter-chip${p.discountOnly ? " is-active" : ""}`} onClick={p.onToggleDiscount} aria-pressed={p.discountOnly}>تخفیف‌دار</button>
        </div>
      </div>
    </>
  );
}
