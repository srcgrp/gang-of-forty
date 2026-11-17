import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <main id="content" tabIndex={-1} className="container">
      <h1 className="section-title">صفحه‌ پیدا نشد</h1>
      <p className="empty-message">آدرس اشتباه است؛ می‌توانی از دکمهٔ زیر به خانه برگردی.</p>
      <Link className="sale-show-btn" to="/" search={{ q: '', category: undefined }}>بازگشت به خانه</Link>
    </main>
  )
}