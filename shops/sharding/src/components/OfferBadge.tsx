const pctFmt = new Intl.NumberFormat('fa-IR', { style: 'percent', maximumFractionDigits: 0 })

type OfferBadgeProps = {
  percent: number
}

export default function OfferBadge({ percent }: OfferBadgeProps) {
  return <span className="product__discount">{pctFmt.format(percent / 100)}</span>
}