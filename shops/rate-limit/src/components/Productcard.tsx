import type { CSSProperties } from 'react';
import { memo } from 'react';
import type { CatalogItem } from '../types';
import { toPersianDigits } from '../format/price';
import { useCartStore } from '../hooks/useCartStore';
import OfferBadge from './Offerbadge';
import Price from './Price';

const LOW_STOCK = 5;

type ProductCardProps = {
  product: CatalogItem;
  percent?: number;
  stock?: number;
};

function ProductCard({ product, percent, stock }: ProductCardProps) {
  const add = useCartStore((s) => s.add);
  const { name, price, oldPrice, unit, emoji, color } = product;
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
          onClick={() => add(product)}
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

export default memo(ProductCard);
