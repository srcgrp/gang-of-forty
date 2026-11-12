import type { Product } from '../types';
import ProductCard from './Productcard';

interface ProductGridProps {
  id?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  onAdd: (product: Product) => void;
}

export default function ProductGrid({ id, title, subtitle, products, onAdd }: ProductGridProps) {
  return (
    <section className="special-offer" id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      <div className="special-offer-head">
        <h2 className="carousel-title" id={id ? `${id}-title` : undefined}>{title}</h2>
        {subtitle && <span className="special-offer-sub">{subtitle}</span>}
      </div>

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}