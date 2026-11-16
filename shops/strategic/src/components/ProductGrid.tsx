import type { ProductItem } from '../types';
import ProductCard from './ProductCard';

export default function ProductGrid({ items }: { items: readonly ProductItem[] }) {
  return (
    <>
      {items.map(item => (
        <ProductCard key={item.product.id} item={item} />
      ))}
    </>
  );
}