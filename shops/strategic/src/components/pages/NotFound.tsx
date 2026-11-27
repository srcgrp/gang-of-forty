import { Link } from '@tanstack/react-router';

export default function NotFound() {
  return (
    <section className="state" aria-labelledby="not-found-title">
      <h1 id="not-found-title" className="state__title">صفحه پیدا نشد</h1>
      <p>آدرسی که باز کردید در این فروشگاه وجود ندارد.</p>
      <Link className="btn btn--green" to="/" search={{}}>بازگشت به صفحه اصلی</Link>
    </section>
  );
}
