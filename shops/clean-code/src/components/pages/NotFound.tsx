import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <main className="box">
      <h1>این صفحه پیدا نشد</h1>
      <p>
        <Link to="/">بازگشت به خانه</Link>
      </p>
    </main>
  );
}
