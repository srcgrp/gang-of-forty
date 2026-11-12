import type { Product } from '../types';
import { toPersianDigits } from '../format/price';
import OfferBadge from './Offerbadge';
import Price from './Price';

const LOW_STOCK = 5;

type ProductCardProps = {
  product: Product;
  percent?: number;
  stock?: number; 
  onAdd: (id: number) => void;
};

export default function ProductCard({ product, percent, stock, onAdd }: ProductCardProps) {
  const { id, name, price, oldPrice, unit, emoji } = product;
  const soldOut = stock === 0;
  const stockText = soldOut
    ? 'ناموجود'
    : stock !== undefined && stock <= LOW_STOCK
      ? `فقط ${toPersianDigits(stock)} عدد مانده`
      : undefined;

  return (
    <article className="product-card">
      {percent !== undefined && <OfferBadge percent={percent} />}
      <div className="product-emoji" aria-hidden="true">{emoji}</div>
      <h3 className="product-name">{name}</h3>
      <p className="product-unit">{unit}</p>
      <Price amount={price} oldAmount={oldPrice} />
      {stockText && <p className={`product-stock${soldOut ? ' is-out' : ''}`}>{stockText}</p>}
      <button type="button" className="product-add" disabled={soldOut} onClick={() => onAdd(id)}>
        {soldOut ? 'ناموجود' : 'افزودن به سبد'}
      </button>
    </article>
  );
}