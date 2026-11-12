import { toPersianDigits } from '../format/price';

interface OfferBadgeProps {
  percent: number;
}

export default function OfferBadge({ percent }: OfferBadgeProps) {
  return <span className="offer-badge">{toPersianDigits(percent)}٪ تخفیف</span>;
}