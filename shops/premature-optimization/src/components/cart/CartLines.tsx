import type { Offer, Product } from "../../scripts/types";
import { useCartStore } from "../../hooks/useCartStore.ts";
import {
  cartTotal,
  getPricedLines,
} from "../../scripts/logic/cart/cart-lines.ts";
import Price from "../shared/Price.tsx";
import CartLineItem from "./CartLineItem.tsx";

type CartLinesProps = { products: Product[]; offers: Offer[] };

export default function CartLines({ products, offers }: CartLinesProps) {
  const cart = useCartStore((s) => s.cart);
  const lines = getPricedLines(cart, products, offers);

  if (lines.length === 0) {
    return <p className="cart-empty">سبد خرید شما خالی است</p>;
  }

  return (
    <>
      {lines.map((line) => (
        <CartLineItem key={line.id} line={line} />
      ))}
      <div className="cart-dropdown-total">
        <span>جمع:</span>
        <Price value={cartTotal(lines)} />
      </div>
    </>
  );
}
