import { useState } from 'react';
import { filterItems } from '../../catalog/filter';
import { carouselProducts, OFFERS_ID, OFFERS_TITLE } from '../../catalog/group';
import { useCatalog } from '../../hooks/useCatalog';
import { useSearchStore } from '../../hooks/useSearchStore';
import AdBanner from '../Adbanner';
import CategoryCards from '../Categorycards';
import CategoryCarousel from '../CategoryCarousel';
import Hero from '../Hero';
import LearnSection from '../Learnsection';
import ProductGrid from '../Productgrid';
import SaleCountdown from '../SaleCountdown';
import Status from '../Status';

const PREVIEW = 6;

export default function HomePage() {
  const state = useCatalog();
  const query = useSearchStore((s) => s.query);
  const [showTimer, setShowTimer] = useState(true);

  const catalog = state.status === 'success' ? state.data : null;
  const all = (id: string) => (catalog ? carouselProducts(catalog, id) ?? [] : []);
  const shown = (id: string) => filterItems(all(id), { query });
  const specials = shown(OFFERS_ID);
  const carousels = (catalog?.categories ?? []).map((c) => ({ c, products: shown(c.slug) }));
  const found = specials.length > 0 || carousels.some((x) => x.products.length > 0);

  return (
    <>
      <Hero />
      <CategoryCards categories={catalog?.categories ?? []} />

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
            <ProductGrid id="special-offers" carouselId={OFFERS_ID} title={OFFERS_TITLE}
              subtitle="تا پایان موجودی" products={specials.slice(0, PREVIEW)} total={all(OFFERS_ID).length} />
          )}
          <div className="category-carousels">
            {!found && <p className="product-grid-empty">نتیجه‌ای پیدا نشد.</p>}
            {carousels.map(({ c, products }) => (
              <CategoryCarousel key={c.id} category={c} products={products.slice(0, PREVIEW)}
                total={all(c.slug).length} />
            ))}
          </div>
        </Status>
      )}

      <AdBanner />
      <LearnSection />
    </>
  );
}
