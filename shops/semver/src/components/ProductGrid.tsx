import type { Product } from '../types';
import ProductCard from './ProductCard';

type ProductGridProps = {
  products: Product[];
  onAdd: (id: number) => void;
};

export default function ProductGrid({ products, onAdd }: ProductGridProps) {
  return (
    <article className="flex-item-product" id="latest-carousel">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </article>
  );
}
