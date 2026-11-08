import { formatNumber } from './format'

type OfferBadgeProps = { percent: number }

export default function OfferBadge({ percent }: OfferBadgeProps) {
  return percent > 0 ? <span className="chip-off">{formatNumber(percent)}٪</span> : null
}
