import type { ProductItem } from '../types';
import { useCartStore } from '../hooks/useCartStore';
import { qtyOf } from '../features/cart/cart';

type Props = { item: ProductItem };

export default function QuantityControl({ item }: Props) {
  const { id, name } = item.product;
  const quantity = useCartStore((state) => qtyOf(state.lines, id));
  const add = useCartStore((state) => state.add);
  const remove = useCartStore((state) => state.remove);
  const last = quantity === 1;
  return (
    <div className="stepper" role="group" aria-label={`تعداد ${name} در سبد خرید`}>
      <button type="button" className="stepper__btn" disabled={quantity >= item.stock}
        aria-label={`افزودن یک عدد ${name}`} onClick={() => add(id)}>
        <svg className="icon" aria-hidden="true"><use href="#i-plus" /></svg>
      </button>
      <span className="stepper__qty">{quantity.toLocaleString('fa-IR')}</span>
      <button type="button" className={last ? 'stepper__btn is-trash' : 'stepper__btn'}
        aria-label={last ? `حذف ${name} از سبد خرید` : `کم کردن یک عدد ${name}`} onClick={() => remove(id)}>
        <svg className="icon" aria-hidden="true"><use href={last ? '#i-trash' : '#i-minus'} /></svg>
      </button>
    </div>
  );
}