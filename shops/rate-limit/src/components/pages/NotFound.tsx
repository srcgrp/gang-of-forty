import { Link } from '@tanstack/react-router';

export default function NotFound() {
  return (
    <section className="category-section">
      <h2>صفحه پیدا نشد</h2>
      <p className="product-grid-empty">
        آدرسی که وارد کردید وجود ندارد.{' '}
        <Link to="/" className="plp-back">بازگشت به صفحه اصلی</Link>
      </p>
    </section>
  );
}
