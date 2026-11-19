import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <section className="section">
      <h1 className="section-title">صفحه پیدا نشد</h1>
      <p className="carousel-status" role="status">آدرسی که وارد کردید وجود ندارد.</p>
      <Link className="btn back-link" to="/">بازگشت به صفحه اصلی</Link>
    </section>
  )
}