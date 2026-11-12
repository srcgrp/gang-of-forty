import type { Product } from '../types';
import { discountPercent } from '../format/price';
import OfferBadge from './Offerbadge';
import Price from './Price';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const { name, price, oldPrice, unit, emoji } = product;

  return (
    <article className="product-card">
      {oldPrice !== undefined && <OfferBadge percent={discountPercent(oldPrice, price)} />}
      <div className="product-emoji" aria-hidden="true">{emoji}</div>
      <h3 className="product-name">{name}</h3>
      <p className="product-unit">{unit}</p>
      <Price amount={price} oldAmount={oldPrice} />
      <button type="button" className="product-add" onClick={() => onAdd(product)}>
        افزودن به سبد
      </button>
    </article>
  );
}