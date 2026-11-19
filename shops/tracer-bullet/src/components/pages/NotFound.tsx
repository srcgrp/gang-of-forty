import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <section>
      <h2>صفحه پیدا نشد</h2>
      <p>آدرسی که وارد کردید وجود ندارد.</p>
      <Link to="/">بازگشت به صفحه اصلی</Link>
    </section>
  );
}