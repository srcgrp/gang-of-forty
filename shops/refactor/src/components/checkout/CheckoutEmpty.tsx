import { Link } from '@tanstack/react-router'

export default function CheckoutEmpty() {
  return (
    <main id="content" tabIndex={-1} className="container">
      <div className="co-empty">
        <div className="co-empty__icon" aria-hidden="true">
          🛒
        </div>

        <h1 className="co-empty__title">سبد خرید خالی است</h1>

        <p className="co-empty__text">
          برای تسویه، اول از فهرست کالاها چیزی به سبد اضافه کن.
        </p>

        <Link
          className="sale-show-btn"
          to="/"
          search={{ q: '', category: undefined }}
        >
          بازگشت به خانه
        </Link>
      </div>
    </main>
  )
}
