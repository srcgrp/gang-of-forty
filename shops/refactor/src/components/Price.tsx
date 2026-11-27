import { formatNumber } from './format'

type PriceProps = { price: number; originalPrice: number; discounted: boolean}

export default function Price({ price, originalPrice, discounted }: PriceProps) {
  return (
    <p className="price">
      {discounted && (
        <del><span className="sr-only">قیمت قبل از تخفیف: </span>{formatNumber(originalPrice)}</del>
      )}
      <strong>{formatNumber(price)}<small>تومان</small></strong>
    </p>
  )
}
