import { formatNumber } from './format'

type OfferBadgeProps = { percent: number }

export default function OfferBadge({ percent }: OfferBadgeProps) {
  return <span className="chip-off">{formatNumber(percent)}٪</span>
}