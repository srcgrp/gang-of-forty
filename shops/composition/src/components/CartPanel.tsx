import { formatPrice } from "../shared/format";

export default function CartPanel() {
  return (
    <section id="cart" className="hero" hidden aria-labelledby="cart-title">
      <h2 id="cart-title">سبد خرید</h2>
      <p>سبد خرید شما خالی است.</p>
      <p>مجموع: <strong>{formatPrice(0)}</strong></p>
    </section>
  );
}
