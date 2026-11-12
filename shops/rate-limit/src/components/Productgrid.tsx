import type { Product, Stock } from '../types';
import { discountPercent } from '../format/price';
import ProductCard from './Productcard';

type ProductGridProps = {
  id?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  stock?: Stock['items'];
  onAdd: (id: number) => void;
};

export default function ProductGrid({ id, title, subtitle, products, stock, onAdd }: ProductGridProps) {
  const titleId = id ? `${id}-title` : undefined;

  return (
    <section className="special-offer" id={id} aria-labelledby={titleId}>
      <div className="special-offer-head">
        <h2 className="carousel-title" id={titleId}>{title}</h2>
        {subtitle && <span className="special-offer-sub">{subtitle}</span>}
      </div>

      {products.length === 0 ? (
        <p className="product-grid-empty">محصولی پیدا نشد.</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              percent={p.oldPrice !== undefined ? discountPercent(p.oldPrice, p.price) : undefined}
              stock={stock?.[p.id]}
              onAdd={onAdd}
            />
          ))}
        </div>
      )}
    </section>
  );
}