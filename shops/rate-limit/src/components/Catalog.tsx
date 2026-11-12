import { useState } from 'react';
import type { CatalogItem, Category, LoadState } from '../types';
import { filterItems } from '../catalog/filter';
import AdBanner from './AdBanner';
import CategoryCards from './CategoryCards';
import CategoryCarousel from './CategoryCarousel';
import LearnSection from './LearnSection';
import ProductGrid from './ProductGrid';
import SaleCountdown from './SaleCountdown';
import Status from './Status';

type CatalogProps = {
  state: LoadState<CatalogItem>;
  categories: Category[];
  categoryId: number | null;
  query: string;
  onPick: (id: number | null) => void;
  onAdd: (item: CatalogItem) => void;
  onRetry: () => void;
};

export default function Catalog({ state, categories, categoryId, query, onPick, onAdd, onRetry }: CatalogProps) {
  const [showTimer, setShowTimer] = useState(true);

  const products = state.status === 'success' ? state.products : [];
  const specials = filterItems(products.filter((p) => p.percent !== undefined), { query });
  const visible = filterItems(products, { categoryId, query });

  const add = (id: number) => {
    const item = products.find((p) => p.id === id);
    if (item) onAdd(item);
  };

  return (
    <main id="main-content">
      <CategoryCards categories={categories} activeId={categoryId} onPick={onPick} />

      {state.status === 'error' ? (
        <div className="category-carousels">
          <div className="offer-message" role="alert">
            <p>{state.message}</p>
            <button type="button" className="offer-retry" onClick={onRetry}>تلاش دوباره</button>
          </div>
        </div>
      ) : (
        <Status state={state}>
          <div className="sale-bar">
            {showTimer ? <SaleCountdown /> : <span className="sale-countdown">شمارش معکوس حراج پنهان است</span>}
            <button type="button" className="sale-toggle" onClick={() => setShowTimer((v) => !v)}>
              {showTimer ? 'بستن شمارش معکوس' : 'نمایش شمارش معکوس'}
            </button>
          </div>

          {specials.length > 0 && (
            <ProductGrid
              id="special-offers"
              title="پیشنهاد ویژه امروز 🔥"
              subtitle="تا پایان موجودی"
              products={specials}
              onAdd={add}
            />
          )}

          <div className="category-carousels">
            {visible.length === 0 && specials.length === 0 && (
              <p className="product-grid-empty">نتیجه‌ای پیدا نشد.</p>
            )}
            {categories.map((c) => (
              <CategoryCarousel
                key={c.id}
                category={c}
                products={visible.filter((p) => p.categoryId === c.id)}
                onAdd={add}
              />
            ))}
          </div>
        </Status>
      )}

      <AdBanner />
      <LearnSection />
    </main>
  );
}
