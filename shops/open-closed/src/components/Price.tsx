import { formatPrice } from '../lib/format.ts'

type PriceProps = { value: number }

export default function Price({ value }: PriceProps) {
  return (
    <p className="price">
      <strong className="now">{formatPrice(value)}</strong>
    </p>
  )
}
