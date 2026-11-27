import { Link } from "@tanstack/react-router";

type Props = {
  message?: string;
};

export default function NotFound({
  message = "صفحه‌ای که دنبالش بودید پیدا نشد",
}: Props) {
  return (
    <section className="product-section" aria-labelledby="not-found-title">
      <h2 id="not-found-title">پیدا نشد</h2>
      <p className="empty-message">{message}</p>
      <div className="plp-actions">
        <Link to="/" className="retry-button">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </section>
  );
}
