type PriceProps = {
  price: number
  finalPrice?: number | undefined
}

export default function Price({ price, finalPrice }: PriceProps) {
  return (
    <div className="price">
      {finalPrice !== undefined ? (
        <>
          <del>{price.toLocaleString('fa-IR')} تومان</del>
          <strong>{finalPrice.toLocaleString('fa-IR')} تومان</strong>
        </>
      ) : (
        <strong>{price.toLocaleString('fa-IR')} تومان</strong>
      )}
    </div>
  )
}