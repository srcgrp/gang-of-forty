const priceFmt = new Intl.NumberFormat('fa-IR')

export default function Price() {
  return (
    <span className="product__price">
      <span className="product__current">{priceFmt.format(45000)}</span>
      <span className="product__unit">تومان</span>
    </span>
  )
}