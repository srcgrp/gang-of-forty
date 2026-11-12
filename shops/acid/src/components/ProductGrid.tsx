import type { EnrichedProduct } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: EnrichedProduct[];
  onAdd: (id: number) => void;
}

export function ProductGrid({ products, onAdd }: ProductGridProps) {
  return (
    <div className="carousel" style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
}