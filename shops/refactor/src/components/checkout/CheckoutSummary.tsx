import { formatNumber } from '../format'

type Props = {
  count: number
  total: number
  delivery: number
  remaining: number
}

export default function CheckoutSummary({
  count,
  total,
  delivery,
  remaining,
}: Props) {
  const payable = total + delivery

  return (
    <aside className="co-aside" aria-label="خلاصه سفارش">
      <div className="co-summary">
        <div className="co-summary__head">
          <h2 className="co-summary__title">خلاصه سفارش</h2>
          <span className="co-chip">{formatNumber(count)} کالا</span>
        </div>

        <ul className="co-summary__list">
          <li>
            <span>جمع سبد</span>
            <b>{formatNumber(total)} تومان</b>
          </li>

          <li>
            <span>هزینهٔ ارسال</span>
            <b className={delivery === 0 ? 'is-free' : ''}>
              {delivery === 0
                ? 'رایگان'
                : `${formatNumber(delivery)} تومان`}
            </b>
          </li>
        </ul>

        {delivery > 0 && remaining > 0 && (
          <div className="co-summary__promo">
            <span aria-hidden="true">🚚</span>
            <span>
              {formatNumber(remaining)} تومان تا ارسال رایگان
            </span>
          </div>
        )}

        <div className="co-summary__total">
          <span>مبلغ قابل پرداخت</span>
          <strong>
            {formatNumber(payable)} <small>تومان</small>
          </strong>
        </div>

        <div className="co-summary__cta">
          <button type="submit" form="checkout-form" className="co-submit">
            <span>ثبت سفارش</span>
            <span className="co-submit__price">
              {formatNumber(payable)} تومان
            </span>
          </button>
        </div>
      </div>
    </aside>
  )
}