
import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <section className="not-found-page">
      <h2>صفحه موردنظر پیدا نشد!</h2>
      <p>آدرسی که وارد کرده‌اید معتبر نیست.</p>

      <Link to="/">
        بازگشت به صفحه اصلی
      </Link>
    </section>
  )
}
