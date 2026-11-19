import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>این صفحه پیدا نشد</h1>
      <p>آدرسی که باز کردی در فروشگاه وجود ندارد.</p>
      <Link to="/">بازگشت به خانه</Link>
    </main>
  );
}
