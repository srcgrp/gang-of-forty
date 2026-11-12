import type { CatalogItem } from '../types';
import ProductCard from './Productcard';

type ProductGridProps = {
  id?: string;
  title: string;
  subtitle?: string;
  products: CatalogItem[];
  onAdd: (id: number) => void;
};

export default function ProductGrid({ id, title, subtitle, products, onAdd }: ProductGridProps) {
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
            <ProductCard key={p.id} product={p} percent={p.percent} stock={p.stock} onAdd={onAdd} />
          ))}
        </div>
      )}
    </section>
  );
}