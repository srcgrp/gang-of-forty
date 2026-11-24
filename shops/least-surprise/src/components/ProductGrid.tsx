import type { ProductWithDetails } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  readonly products: readonly ProductWithDetails[];
  readonly onAdd: (id: string) => void;
}

export default function ProductGrid({ products, onAdd }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <section className="product-grid-empty" aria-label="محصولات">
        <p>محصولی برای نمایش وجود ندارد.</p>
      </section>
    );
  }

  return (
    <section className="product-grid" aria-label="لیست محصولات">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </section>
  );
}
