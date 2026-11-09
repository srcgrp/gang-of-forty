export default function CartPanel() {
  return (
    <div className="cart-summary" id="cart-widget">
      <button
        type="button"
        className="cart-trigger"
        id="cart-trigger"
        aria-controls="cart-popover"
      >
        <img
          className="cart-icon"
          src="./asset/icons/cart.svg"
          alt=""
          aria-hidden="true"
        />
        <span>سبد خرید</span>
        <span className="cart-count" id="cart-count">
          ۰
        </span>
      </button>

      <section
        className="cart-popover"
        id="cart-popover"
        aria-label="جزئیات سبد خرید"
      >
        <div className="cart-popover-header">
          <h2>سبد خرید شما</h2>
        </div>

        <div className="cart-popover-items">
          <p className="cart-empty">
            سبد خرید شما خالی است.
          </p>
        </div>

        <div className="cart-popover-footer">
          <span>جمع کل:</span>
          <strong>۰ تومان</strong>
        </div>
      </section>
    </div>
  );
}