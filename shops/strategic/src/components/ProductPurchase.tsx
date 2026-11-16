import type { ReactNode } from 'react';
import type { ProductItem } from '../types';
import { useCartStore } from '../hooks/useCartStore';
import { qtyOf } from '../features/cart/cart';
import QuantityControl from './QuantityControl';

type Props = { item: ProductItem; children: ReactNode };

export default function ProductPurchase({ item, children }: Props) {
  const inCart = useCartStore((state) => qtyOf(state.lines, item.product.id) > 0);
  return inCart ? <QuantityControl item={item} /> : children;
}
