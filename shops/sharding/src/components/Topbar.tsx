export default function Topbar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <p className="topbar__note">
          ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان
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