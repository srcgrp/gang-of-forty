import { DEFAULT_CURRENCY, formatMoney } from '../format/price';

interface PriceProps {
  amount: number;
  oldAmount?: number;
  currency?: string;
}

export default function Price({ amount, oldAmount, currency = DEFAULT_CURRENCY }: PriceProps) {
  return (
    <div className="price">
      {oldAmount !== undefined && <del className="price-old">{formatMoney(oldAmount, currency)}</del>}
      <span className="price-current">{formatMoney(amount, currency)}</span>
    </div>
  );
}