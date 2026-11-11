import type { CartRowView } from "../features/cart/logic/view";
import type { CartAction } from "../shared/types/products";
import CartItemStepper from "./CartItemStepper";

type Props = {
  item: CartRowView;
  onAction: (action: CartAction, id: number) => void;
};

const money = (value: number) =>
  `${value.toLocaleString("fa-IR")} تومان`;

export default function CartItemRow({ item, onAction }: Props) {
  return (
    <article className="cart-item">
      {item.imagePath ? (
        <img className="cart-item-media" src={item.imagePath} alt="" />
      ) : (
        <span className="cart-item-media" aria-hidden="true">
          {item.emoji ?? "🛒"}
        </span>
      )}

      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <span className="cart-item-unit">{item.unit}</span>

        {item.originalPrice !== undefined && (
          <del className="cart-item-old-price">
            {money(item.originalPrice * item.quantity)}
          </del>
        )}

        <strong className="cart-item-price">
          {money(item.price * item.quantity)}
        </strong>

        <div className="cart-item-actions">
          <CartItemStepper item={item} onAction={onAction} />

          <button
            type="button"
            className="cart-item-action cart-item-remove"
            onClick={() => onAction("remove", item.id)}
          >
            حذف
          </button>
        </div>
      </div>
    </article>
  );
}