import { formatPrice } from '../shared/logic/pricing'

type PriceProps = {
  value: number
  oldValue?: number 
}

export default function Price({ value, oldValue }: PriceProps) {
  return (
    <span className="product__price">
      <span className="product__current">{formatPrice(value)}</span>
      <span className="product__unit">تومان</span>
      {oldValue !== undefined && (
        <span className="product__old">{formatPrice(oldValue)}</span>
      )}
    </span>
  )
}
