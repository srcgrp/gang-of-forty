import type { Offer, Product } from "../../scripts/types";
import { usePricedCartLines } from "../../hooks/usePricedCartLines.ts";
import { cartTotal } from "../../scripts/logic/cart/cart-lines.ts";
import Price from "../shared/Price.tsx";
import CartLineItem from "./CartLineItem.tsx";

type CartLinesProps = { products: Product[]; offers: Offer[] };

export default function CartLines({ products, offers }: CartLinesProps) {
  const lines = usePricedCartLines(products, offers);

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
