import { Link, useParams, useSearch } from '@tanstack/react-router';
import { useCatalog } from '../../hooks/useCatalog';
import { homeShelves } from '../../catalog/home-shelves';
import { visibleProducts } from '../../features/products/search';
import { sortProducts } from '../../catalog/sort-products';
import Catalog from '../Catalog';
import LoadStatus from '../LoadStatus';

export default function PlpPage() {
  const { carouselId } = useParams({ from: '/plp/$carouselId' });
  const { q = '', sort } = useSearch({ from: '/plp/$carouselId' });
  const state = useCatalog();
  if (state.status !== 'success' && state.status !== 'empty') {
    return <LoadStatus state={state} onRetry={state.retry}>{null}</LoadStatus>;
  }
  const shelf = homeShelves(state.data).find((section) => section.id === carouselId);
  if (!shelf) return (
    <section className="state" aria-labelledby="missing-list-title">
      <h1 className="state__title" id="missing-list-title">این فهرست پیدا نشد</h1>
      <Link className="btn btn--green" to="/" search={{}}>بازگشت به صفحه اصلی</Link>
    </section>
  );
  const matching = q ? new Set(visibleProducts(state.data.searchIndex, q).map((item) => item.product.id)) : null;
  const items = matching ? shelf.items.filter((item) => matching.has(item.product.id)) : shelf.items;
  const category = shelf.kind === 'category' ? shelf.category : undefined;
  return <Catalog title={shelf.title} category={category} items={sortProducts(items, sort)}>
    <nav className="sort-links" aria-label="ترتیب محصولات">
      {(['default', 'price'] as const).map((value) => (
        <Link key={value} to="/plp/$carouselId" params={{ carouselId }}
          search={(prev) => ({ ...prev, sort: value })} aria-current={sort === value ? 'page' : undefined}>
          {value === 'price' ? 'ارزان‌ترین' : 'پیش‌فرض'}
        </Link>
      ))}
    </nav>
  </Catalog>;
}
