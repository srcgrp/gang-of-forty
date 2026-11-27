import { createPortal } from 'react-dom';
import { useCardSlots } from '../hooks/useCardSlots';
import { useCartStore } from '../hooks/useCartStore';
import QuantityControl from './QuantityControl';

export default function CardQuantityControls() {
  const slots = useCardSlots((s) => s.slots);
  const lines = useCartStore((s) => s.lines);
  const inCart = new Set(lines.map((line) => line.productId));
  return slots.filter(({ item }) => inCart.has(item.product.id)).map(({ target, item, key }) =>
    createPortal(<QuantityControl item={item} />, target, key));
}
