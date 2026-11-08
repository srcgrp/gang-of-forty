import { formatNumber } from './format'

type PriceProps = { price: number; originalPrice: number; percent: number }

export default function Price({ price, originalPrice, percent }: PriceProps) {
  return (
    <p className="price">
      {percent > 0 && (
        <del><span className="sr-only">قیمت قبل از تخفیف: </span>{formatNumber(originalPrice)}</del>
      )}
      <strong>{formatNumber(price)}<small>تومان</small></strong>
    </p>
  )
}
