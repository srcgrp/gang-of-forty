type OfferBadgeProps = {
  discount: number
}

export default function OfferBadge({ discount }: OfferBadgeProps) {
  return (
    <span className="badge">
      {discount}% تخفیف
    </span>
  )
}