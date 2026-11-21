import type { ProductItem } from '../types';
import type { CartControls } from '../cart-controls';

type Props = { item: ProductItem; quantity: number; controls: CartControls };

export default function QuantityControl({ item, quantity, controls }: Props) {
  const { id, name } = item.product;
  const last = quantity === 1;
  return (
    <div className="stepper" role="group" aria-label={`تعداد ${name} در سبد خرید`}>
      <button type="button" className="stepper__btn" disabled={quantity >= item.stock}
        aria-label={`افزودن یک عدد ${name}`} onClick={() => controls.onAdd(id)}>
        <svg className="icon" aria-hidden="true"><use href="#i-plus" /></svg>
      </button>
      <span className="stepper__qty">{quantity.toLocaleString('fa-IR')}</span>
      <button type="button" className={last ? 'stepper__btn is-trash' : 'stepper__btn'}
        aria-label={last ? `حذف ${name} از سبد خرید` : `کم کردن یک عدد ${name}`} onClick={() => controls.onRemove(id)}>
        <svg className="icon" aria-hidden="true"><use href={last ? '#i-trash' : '#i-minus'} /></svg>
      </button>
    </div>
  );
}