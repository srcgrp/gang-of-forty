import { Link, useParams } from '@tanstack/react-router';
import { useCatalog } from '../../hooks/useCatalog';
import { useCartStore } from '../../hooks/useCartStore';
import LoadStatus from '../LoadStatus';

export default function ProductPage() {
  const { productId } = useParams({ from: '/product/$productId' });
  const state = useCatalog();
  const add = useCartStore((s) => s.add);
  if (state.status === 'loading' || state.status === 'error') {
    return <LoadStatus state={state} onRetry={state.retry}>{null}</LoadStatus>;
  }
  const item = state.data.items.get(Number(productId));
  return (
    <section className="bonus-page">
      {item ? <>
        <h1>{item.product.name}</h1>
        <p>{item.product.unit}</p>
        <p>{item.price.toLocaleString('fa-IR')} تومان</p>
        <button className="btn btn--green" type="button" disabled={item.soldOut}
          onClick={() => add(item.product.id)}>{item.soldOut ? 'ناموجود' : 'افزودن به سبد'}</button>
      </> : <h1>محصول پیدا نشد</h1>}
      <Link className="back-btn" to="/" search={{}}>بازگشت به صفحه اصلی</Link>
    </section>
  );
}
