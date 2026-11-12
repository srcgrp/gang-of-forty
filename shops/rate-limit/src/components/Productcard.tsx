import type { CSSProperties } from 'react';
import type { Product } from '../types';
import { toPersianDigits } from '../format/price';
import OfferBadge from './OfferBadge';
import Price from './Price';

const LOW_STOCK = 5;

type ProductCardProps = {
  product: Product & { color?: string };
  percent?: number;
  stock?: number;
  onAdd: (id: number) => void;
};

export default function ProductCard({ product, percent, stock, onAdd }: ProductCardProps) {
  const { id, name, price, oldPrice, unit, emoji, color } = product;
  const soldOut = stock === 0;
  const stockText = soldOut
    ? 'ناموجود'
    : stock !== undefined && stock <= LOW_STOCK
      ? `فقط ${toPersianDigits(stock)} عدد مانده`
      : undefined;

  return (
    <article className={`offer-card${soldOut ? ' is-sold-out' : ''}`}>
      <div
        className="offer-media"
        style={color ? ({ '--media-bg': color } as CSSProperties) : undefined}
      >
        <span className="offer-emoji" aria-hidden="true">{emoji}</span>
        {percent !== undefined && <OfferBadge percent={percent} />}
        <button
          type="button"
          className="offer-add"
          disabled={soldOut}
          aria-label={soldOut ? 'ناموجود' : `افزودن ${name} به سبد`}
          onClick={() => onAdd(id)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
      <div className="offer-body">
        <h3 className="offer-name">{name}</h3>
        <p className="offer-unit">{unit}</p>
        {stockText && <p className="offer-stock">{stockText}</p>}
        <Price amount={price} oldAmount={oldPrice} />
      </div>
    </article>
  );
}
