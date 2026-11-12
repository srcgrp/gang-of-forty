import { DEFAULT_CURRENCY, formatMoney } from '../format/price';

type PriceProps = {
  amount: number;
  oldAmount?: number;
  currency?: string;
};

export default function Price({ amount, oldAmount, currency = DEFAULT_CURRENCY }: PriceProps) {
  return (
    <div className="offer-prices">
      {oldAmount !== undefined && <del className="offer-old-price">{formatMoney(oldAmount, currency)}</del>}
      <span className="offer-price">{formatMoney(amount, currency)}</span>
    </div>
  );
}
