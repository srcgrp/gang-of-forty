import { Link } from "@tanstack/react-router"

export default function NotFound() {
  return (
    <div className="msg load-msg">
      <p>صفحه‌ای که دنبالش بودید پیدا نشد.</p>
      <Link className="text-link" to="/">بازگشت به صفحه اصلی</Link>
    </div>
  )
}