export default function CartPanel() {
    return (
        <div className="cart-actions">
            <a className="cart" href="#main-content" aria-label="سبد خرید">
                سبد خرید 🛒 <strong id="cart-count" aria-live="polite"></strong>
            </a>
            <button id="clear-cart" className="clear-cart" type="button" aria-label="خالی کردن سبد خرید" disabled>
                خالی‌کردن
            </button>
        </div>
    )
}
