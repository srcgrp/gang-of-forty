import type { Product } from '../shared/types'
import Price from './Price'

const SAMPLE_CART_PRODUCT: Product = {
  id: 101,
  categoryId: 1,
  name: 'سیب قرمز',
  emoji: '🍎',
  unit: 'کیلو',
  price: 45000,
  tags: ['میوه']
}
const SAMPLE_QTY = 2

export default function CartPanel() {
  return (
    <aside id="cart-panel" className="cart-panel" hidden aria-label="سبد خرید">
      <h2 className="cart-panel__title">سبد خرید</h2>
      <ul className="cart-panel__list">
        <li className="cart-row">
          <span className="cart-row__name">{SAMPLE_CART_PRODUCT.name}</span>
          <span className="cart-row__qty">{SAMPLE_QTY} ×</span>
          <span className="cart-row__total">
            <Price value={SAMPLE_CART_PRODUCT.price * SAMPLE_QTY} />
          </span>
          <button type="button" className="cart-row__remove" aria-label={`حذف ${SAMPLE_CART_PRODUCT.name}`}>×</button>
        </li>
      </ul>
      <div className="cart-panel__total">
        <span>جمع تقریبی:</span>
        <strong>
          <Price value={SAMPLE_CART_PRODUCT.price * SAMPLE_QTY} />
        </strong>
      </div>
    </aside>
  )
}