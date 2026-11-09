import Price from './Price'
import OfferBadge from './OfferBadge'

export default function ProductCard() {
  return (
    <li className="product-item">
      <article className="product" data-stock="in">
        <div className="product__link">
          <span className="product__img">
            <span className="product__emoji">🍎</span>
            <OfferBadge />
          </span>
          <h3 className="product__name">سیب قرمز — کیلو</h3>
        </div>

        <div className="product__footer">
          <Price />
          <div className="product__actions">
            <button
              type="button"
              className="product__add"
              aria-label="افزودن سیب قرمز به سبد"
            >
              <svg aria-hidden="true">
                <use href="./icons.svg#plus" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    </li>
  )
}