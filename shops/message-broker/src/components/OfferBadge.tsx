type OfferBadgeProps = {
  discount: number
}

export default function OfferBadge({ discount }: OfferBadgeProps) {
  return (
    <span className="off">
      {discount.toLocaleString('fa-IR')}٪ تخفیف
    </span>
  )
}
