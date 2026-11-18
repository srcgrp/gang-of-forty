import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <main id="content" tabIndex={-1} className="container nf">
      <div className="nf-card">
        <span className="nf-code" aria-hidden="true">۴۰۴</span>
        <h1 className="section-title nf-title">صفحه‌ پیدا نشد</h1>
        <p className="empty-message nf-text">
          آدرس اشتباه است؛ می‌توانی از دکمهٔ زیر به خانه برگردی.
        </p>
        <Link
          className="sale-show-btn nf-btn"
          to="/"
          search={{ q: '', category: undefined }}
        >
          بازگشت به خانه
        </Link>
      </div>
    </main>
  )
}