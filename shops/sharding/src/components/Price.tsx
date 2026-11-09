const priceFmt = new Intl.NumberFormat('fa-IR')

type PriceProps = {
  value: number
  oldValue?: number 
}

export default function Price({ value, oldValue }: PriceProps) {
  return (
    <span className="product__price">
      <span className="product__current">{priceFmt.format(value)}</span>
      <span className="product__unit">تومان</span>
      {oldValue !== undefined && (
        <span className="product__old">{priceFmt.format(oldValue)}</span>
      )}
    </span>
  )
}