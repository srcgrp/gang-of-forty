export default function Topbar({ notice }: { notice: string }) {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <p className="topbar__note">
          {notice}
        </p>
        <nav className="topbar__links" aria-label="لینک‌های کمکی">
          <a href="#">پیگیری سفارش</a>
          <a href="#">سؤالات متداول</a>
          <a href="#">تماس با پشتیبانی</a>
        </nav>
      </div>
    </div>
  )
}