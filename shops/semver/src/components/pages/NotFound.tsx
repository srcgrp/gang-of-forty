import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <section className="catalog-page">
      <h1 className="section-title">صفحه پیدا نشد</h1>
      <p><Link className="catalog-link" to="/">بازگشت به خانه</Link></p>
    </section>
  );
}
