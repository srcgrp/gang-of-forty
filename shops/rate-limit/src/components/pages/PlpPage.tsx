import { Link, useParams, useSearch } from '@tanstack/react-router';
import { sortProducts } from '../../catalog/sort';
import { carouselProducts, carouselTitle } from '../../catalog/group';
import { toPersianDigits } from '../../format/price';
import { useCatalog } from '../../hooks/useCatalog';
import ProductCard from '../Productcard';
import Status from '../Status';

export default function PlpPage() {
  const { carouselId } = useParams({ from: '/plp/$carouselId' });
  const { sort } = useSearch({ from: '/plp/$carouselId' });
  const state = useCatalog();

  if (state.status !== 'success') {
    return (
      <section className="category-section">
        <Status state={state}>{null}</Status>
      </section>
    );
  }

  const products = carouselProducts(state.data, carouselId);
  const title = carouselTitle(state.data, carouselId);

  if (products === null || title === null) {
    return (
      <section className="category-section">
        <h2>این فهرست پیدا نشد</h2>
        <p className="product-grid-empty">
          فهرستی با آدرس «{carouselId}» وجود ندارد.{' '}
          <Link to="/" className="plp-back">بازگشت به خانه</Link>
        </p>
      </section>
    );
  }

  return (
    <section className="category-section">
      <h2>{title}</h2>
      <div className="plp-meta">
        <span>{toPersianDigits(products.length)} محصول</span>
        <Link to="/" className="plp-back">بازگشت به خانه</Link>
      </div>
      <nav className="plp-meta" aria-label="مرتب‌سازی محصولات">
        <Link to="/plp/$carouselId" params={{ carouselId }} search={{ sort: 'default' }}
          aria-current={sort === 'default' ? 'page' : undefined}>پیش‌فرض</Link>
        <Link to="/plp/$carouselId" params={{ carouselId }} search={{ sort: 'price' }}
          aria-current={sort === 'price' ? 'page' : undefined}>ارزان‌ترین</Link>
      </nav>
      <div className="plp-grid">
        {sortProducts(products, sort).map((p) => (
          <ProductCard key={p.id} product={p} percent={p.percent} stock={p.stock} />
        ))}
      </div>
    </section>
  );
}
