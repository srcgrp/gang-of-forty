import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <main className="route-page not-found-page">
      <p className="not-found-page__code">۴۰۴</p>
      <h1>صفحه موردنظر پیدا نشد</h1>
      <p>آدرسی که وارد کرده‌اید معتبر نیست یا این صفحه وجود ندارد.</p>
      <Link to="/">بازگشت به صفحه اصلی</Link>
    </main>
  );
}
