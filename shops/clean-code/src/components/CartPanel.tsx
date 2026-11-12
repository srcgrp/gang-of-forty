export default function CartPanel() {
  return (
    <aside className="cart-panel">
      <section id="cart">
        <h2>سبد خرید</h2>
        <p id="cart-text">سبد خالی است.</p>
        <ul id="cart-list"></ul>
        <button type="button" id="clear-cart">
          خالی کردن سبد
        </button>
      </section>
    </aside>
  );
}
