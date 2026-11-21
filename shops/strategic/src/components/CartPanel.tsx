import Amount from './Amount';
import type { CartView } from '../types';
import type { CartControls } from '../cart-controls';
import QuantityControl from './QuantityControl';

type Props = { view: CartView; controls: CartControls };

export default function CartPanel({ view, controls }: Props) {
  const count = view.count.toLocaleString('fa-IR');

  return (
    <section className="cart-panel" id="cart-panel" aria-label="خلاصه سبد خرید" tabIndex={-1}>
      {view.count === 0 ? <div className="mini mini--empty">
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
                  <QuantityControl item={row} quantity={row.quantity} controls={controls} />
                  <div className="mini-item__price"><Amount total={row.subtotal} old={row.oldSubtotal} discount={row.percent} /></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mini__note" id="mini-note">ثبت سفارش در این مرحله از پروژه فعال نیست.</p>
        <div className="mini__foot">
          <div className="mini__total"><Amount total={view.total} old={view.oldTotal} discount={view.discount} /></div>
          <button className="checkout" type="button" aria-disabled="true" aria-describedby="mini-note">ثبت سفارش</button>
        </div>
      </div>}
    </section>
  );
}