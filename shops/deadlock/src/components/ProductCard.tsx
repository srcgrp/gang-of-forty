export default function ProductCard() {
  const price = 2450000;

  return (
    <article className="tent-article">
      <span className="product-emoji" aria-hidden="true">
        ⛺
      </span>
      <h3>چادر </h3>
      <p>یک نفره</p>
      <div>
        <p>{price.toLocaleString("fa-IR")} تومان</p>
        <button
          type="button"
          className="add-to-cart"
          aria-label="افزودن چادر نمونه به سبد خرید">
          +
        </button>
      </div>
    </article>
  );
}
