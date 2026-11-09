import type { CartControls } from '../cart-controls';
import type { ProductItem } from '../types';
import { qtyOf } from '../features/cart/cart';
import ProductCard from './ProductCard';

export default function ProductGrid({ items, controls }: { items: ProductItem[]; controls: CartControls }) {
  return (
    <>
      {items.map(item => (
        <ProductCard key={item.product.id} controls={controls} quantity={qtyOf(controls.lines, item.product.id)} item={item} />
      ))}
    </>
  );
}