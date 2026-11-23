import type { AddOutcome, CartItem, ProductView } from '../../types';
import { setQuantity } from './calculate';

export const addOne = (items: CartItem[], product: ProductView | undefined): AddOutcome => {
  if (!product || product.stock === 0) return { status: 'ignored' };
  const current = items.find((entry) => entry.id === product.id)?.quantity ?? 0;
  if (current >= product.stock) return { status: 'maxed' };
  return { status: 'added', items: setQuantity(items, product, current + 1), name: product.name };
};
