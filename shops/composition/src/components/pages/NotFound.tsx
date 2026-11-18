import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return <main id="main" className="wrap plp-page" tabIndex={-1}>
    <h1>صفحه پیدا نشد</h1>
    <p>آدرسی که وارد کردید در فروشگاه وجود ندارد.</p>
    <Link className="back-home" to="/">بازگشت به خانه</Link>
  </main>;
}
