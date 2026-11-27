import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <section className="plp">
      <h1>صفحه پیدا نشد</h1>
      <p>آدرسی که وارد کردید وجود ندارد.</p>
      <Link className="back-link" to="/">بازگشت به صفحه اصلی</Link>
    </section>
  )
}