import { Link } from '@tanstack/react-router';
import Amount from './Amount';
import { useCartStore } from '../hooks/useCartStore';
import { cartView } from '../features/cart/cart';
import QuantityControl from './QuantityControl';

export default function CartPanel() {
  const lines = useCartStore((state) => state.lines);
  const items = useCartStore((state) => state.items);
  const status = useCartStore((state) => state.catalogStatus);
  const view = cartView(lines, items, status === 'ready');
  const count = view.count.toLocaleString('fa-IR');

  return (
    <section className="cart-panel" id="cart-panel" aria-label="خلاصه سبد خرید" tabIndex={-1} aria-busy={status === 'loading'}>
      {status !== 'ready' ? <div className="mini mini--empty">
        <h2 className="mini__title">خلاصه سبد خرید شما</h2>
        <p>سبد ذخیره‌شده: {count} کالا</p>
        <p role="status">{status === 'loading' ? 'در حال دریافت قیمت و موجودی کالاها…' :
          'اطلاعات قیمت و موجودی دریافت نشد. از دکمهٔ «تلاش دوباره» در صفحه استفاده کنید.'}</p>
      </div> : view.count === 0 ? <div className="mini mini--empty">
        <h2 className="mini__title">خلاصه سبد خرید شما</h2>
        <svg className="icon mini__empty-icon" aria-hidden="true" focusable="false"><use href="#i-cart" /></svg>
        <p>سبد خرید شما خالی است.</p>
      </div> : <div className="mini">
        <div className="mini__head"><h2 className="mini__title">خلاصه سبد خرید شما</h2><span className="mini__count">{count} کالا</span></div>
        <ul className="mini__list">
          {view.rows.map(row => (
            <li className="mini-item" key={row.product.id}>
              <div className="mini-item__pic">{row.art && <img src={`./assets/images/products/${row.art}.webp`} alt="" />}</div>
              <div className="mini-item__body">
                <h3 className="mini-item__name">{row.product.name}</h3>
                <div className="mini-item__row">
                  <QuantityControl item={row} />
                  <div className="mini-item__price"><Amount total={row.subtotal} old={row.oldSubtotal} discount={row.percent} /></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mini__foot">
          <div className="mini__total"><Amount total={view.total} old={view.oldTotal} discount={view.discount} /></div>
          <Link className="checkout" to="/checkout" search={{}}>تسویه حساب</Link>
        </div>
      </div>}
    </section>
  );
}