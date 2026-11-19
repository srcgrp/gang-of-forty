import { Link } from '@tanstack/react-router'

export default function CheckoutHeader() {
  return (
    <>
      <nav className="co-crumb" aria-label="مسیر">
        <Link to="/" search={{ q: '', category: undefined }}>
          خانه
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">تسویه حساب</span>
      </nav>

      <header className="co-head">
        <div className="co-head__text">
          <h1 className="co-head__title">تسویه حساب</h1>
        </div>

        <Link
          className="sale-show-btn co-head__back"
          to="/"
          search={{ q: '', category: undefined }}
        >
          بازگشت به خانه
        </Link>
      </header>
    </>
  )
}
