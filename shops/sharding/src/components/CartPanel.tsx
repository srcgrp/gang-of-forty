import Price from './Price'

export default function CartPanel() {
  return (
    <aside id="cart-panel" className="cart-panel" hidden aria-label="سبد خرید">
      <h2 className="cart-panel__title">سبد خرید</h2>
      <ul className="cart-panel__list">
        <li className="cart-row">
          <span className="cart-row__name">سیب قرمز</span>
          <span className="cart-row__qty">۲ ×</span>
          <span className="cart-row__total">
            <Price />
          </span>
          <button type="button" className="cart-row__remove" aria-label="حذف سیب قرمز">×</button>
        </li>
      </ul>
      <div className="cart-panel__total">
        <span>جمع تقریبی:</span>
        <strong>
          <Price />
        </strong>
      </div>
    </aside>
  )
}