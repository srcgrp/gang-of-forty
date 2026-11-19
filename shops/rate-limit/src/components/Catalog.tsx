import { useEffect, useState } from 'react';
import type { Catalog as CatalogData, LoadState } from '../types';
import { countItems } from '../cart/rules';
import { filterItems } from '../catalog/filter';
import { carouselProducts } from '../catalog/group';
import { cartTitle } from '../format/title';
import { useCartStore } from '../hooks/useCartStore';
import AdBanner from './Adbanner';
import CategoryCards from './Categorycards';
import CategoryCarousel from './CategoryCarousel';
import LearnSection from './Learnsection';
import ProductGrid from './Productgrid';
import SaleCountdown from './SaleCountdown';
import Status from './Status';

type CatalogProps = {
  state: LoadState<CatalogData>;
  categoryId: number | null;
  query: string;
  onPick: (id: number | null) => void;
};

export default function Catalog({ state, categoryId, query, onPick }: CatalogProps) {
  const [showTimer, setShowTimer] = useState(true);
  const count = useCartStore((s) => countItems(s.cart));

  const catalog = state.status === 'success' ? state.data : null;
  const categories = catalog?.categories ?? [];
  const specials = filterItems(catalog ? carouselProducts(catalog, 'offers') ?? [] : [], { query });
  const carousels = categories.map((category) => ({
    category,
    products: filterItems(catalog ? carouselProducts(catalog, category.slug) ?? [] : [], { categoryId, query }),
  }));
  const hasResults = carousels.some((c) => c.products.length > 0);

  const shopName = catalog?.shop?.name;
  useEffect(() => { document.title = cartTitle(shopName, count); }, [shopName, count]);

  return (
    <main id="main-content">
      <CategoryCards categories={categories} activeId={categoryId} onPick={onPick} />

      {state.status === 'error' ? (
        <div className="category-carousels">
          <div className="offer-message" role="alert">
            <p>{state.message}</p>
            <button type="button" className="offer-retry" onClick={state.retry}>تلاش دوباره</button>
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
            />
          )}

          <div className="category-carousels">
            {!hasResults && specials.length === 0 && (
              <p className="product-grid-empty">نتیجه‌ای پیدا نشد.</p>
            )}
            {carousels.map(({ category, products }) => (
              <CategoryCarousel key={category.id} category={category} products={products} />
            ))}
          </div>
        </Status>
      )}

      <AdBanner />
      <LearnSection />
    </main>
  );
}
