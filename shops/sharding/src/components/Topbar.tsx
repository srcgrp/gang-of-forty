import { Link } from '@tanstack/react-router'
export default function Topbar({ notice }: { notice: string }) {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <p className="topbar__note">
          {notice}
        </p>
        <nav className="topbar__links" aria-label="لینک‌های کمکی">
          <Link to="/" search={true}>پیگیری سفارش</Link>
          <Link to="/" search={true}>سؤالات متداول</Link>
          <Link to="/" search={true}>تماس با پشتیبانی</Link>
        </nav>
      </div>
    </div>
  )
}
