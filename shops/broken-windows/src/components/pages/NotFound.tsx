import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <section className="plp">
      <p className="status" role="status">این صفحه پیدا نشد.</p>
      <Link to="/">بازگشت به خانه</Link>
    </section>
  );
}