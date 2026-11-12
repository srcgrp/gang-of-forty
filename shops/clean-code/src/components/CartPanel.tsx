type CartPanelProps = {
  onClear: () => void;
};

export default function CartPanel({ onClear }: CartPanelProps) {
  return (
    <aside className="cart-panel">
      <section id="cart">
        <h2>سبد خرید</h2>
        <p id="cart-text">سبد خالی است.</p>
        <ul id="cart-list"></ul>
        <button type="button" id="clear-cart" onClick={onClear}>
          خالی کردن سبد
        </button>
      </section>
    </aside>
  );
}
