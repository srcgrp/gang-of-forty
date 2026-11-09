const pctFmt = new Intl.NumberFormat('fa-IR', {
  style: 'percent',
  maximumFractionDigits: 0,
})

export default function OfferBadge() {
  return <span className="product__discount">{pctFmt.format(0.2)}</span>
}