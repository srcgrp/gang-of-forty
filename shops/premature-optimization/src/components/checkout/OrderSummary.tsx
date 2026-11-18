import { useMemo, useState } from "react";
import type { Offer, Product, Shop } from "../../scripts/types.ts";
import { useCartStore } from "../../hooks/useCartStore.ts";
import {
  cartTotal,
  deliveryCost,
  getPricedLines,
} from "../../scripts/logic/cart/cart-lines.ts";
import Price from "../shared/Price.tsx";
import CartItemsModal from "./CartItemsModal.tsx";

type OrderSummaryProps = {
  products: Product[];
  offers: Offer[];
  shop: Pick<Shop, "deliveryFee" | "freeDeliveryOver">;
};

export default function OrderSummary({
  products,
  offers,
  shop,
}: OrderSummaryProps) {
  const [itemsOpen, setItemsOpen] = useState(false);
  const cart = useCartStore((s) => s.cart);
  const lines = useMemo(
    () => getPricedLines(cart, products, offers),
    [cart, products, offers],
  );
  const subtotal = cartTotal(lines);
  const delivery = deliveryCost(
    subtotal,
    shop.deliveryFee,
    shop.freeDeliveryOver,
  );

  return (
    <aside className="checkout-summary" aria-label="خلاصه سبد خرید">
      <div className="checkout-summary-heading">
        <h3 className="checkout-summary-title">سبد خرید</h3>
        <button
          className="checkout-summary-items-button"
          type="button"
          onClick={() => setItemsOpen(true)}
        >
          مشاهده محصولات <span aria-hidden="true">›</span>
        </button>
      </div>
      <div className="checkout-summary-totals">
        <div className="checkout-summary-row">
          <span>جمع سبد خرید:</span>
          <Price value={subtotal} />
        </div>
        <div className="checkout-summary-row">
          <span>هزینه ارسال:</span>
          {delivery === 0 ? (
            <span className="checkout-summary-free">رایگان</span>
          ) : (
            <Price value={delivery} />
          )}
        </div>
        <div className="checkout-summary-row checkout-summary-grand">
          <span>جمع کل:</span>
          <Price value={subtotal + delivery} />
        </div>
      </div>
      <CartItemsModal
        open={itemsOpen}
        lines={lines}
        onClose={() => setItemsOpen(false)}
      />
    </aside>
  );
}
