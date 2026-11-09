import { CART_LINES } from "./sampleData.ts";

const format = new Intl.NumberFormat("fa-IR");

export default function CartPanel() {
  const count = CART_LINES.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <div className="cart-dropdown-wrap">
      <button className="cart-button" id="cart-button" type="button">
        <span className="cart-icon">🛒</span>
        <span className="cart-text">سبد خرید </span>
        <span className="cart-notification" id="cart-count">
          {format.format(count)}
        </span>
      </button>
      <div className="cart-dropdown" id="cart-dropdown">
        <div className="cart-dropdown-items" id="cart-dropdown-items">
          {CART_LINES.length === 0 ? (
            <p className="cart-empty">سبد خرید شما خالی است</p>
          ) : (
            CART_LINES.map((line) => (
              <div key={line.id} className="cart-dropdown-item">
                <div className="cart-dropdown-details">
                  <span className="cart-dropdown-name">{line.name}</span>
                  <span className="cart-dropdown-quantity">
                    تعداد: {format.format(line.quantity)}
                  </span>
                </div>
                <button
                  className="cart-remove-button"
                  type="button"
                  aria-label={`حذف ${line.name} از سبد خرید`}
                >
                  ❌
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
