import type { Product } from '../types';
import ProductCard from './ProductCard';

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <article className="flex-item-product" id="latest-carousel">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </article>
  );
}
