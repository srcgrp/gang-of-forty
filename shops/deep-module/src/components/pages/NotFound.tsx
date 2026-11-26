import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <section className="page-card not-found not-found-card">
      <div className="not-found__art" aria-hidden="true">
        <span className="not-found__emoji">🧺</span>
        <span className="not-found__code">۴۰۴</span>
      </div>
      <h1 className="not-found__title">این قفسه خالی است!</h1>
      <p className="not-found__desc">
        صفحه‌ای که دنبال آن بودید پیدا نشد؛ ممکن است آدرس اشتباه باشد یا محصول جابه‌جا شده باشد.
      </p>
      <div className="not-found__actions">
        <Link to="/" className="btn btn--primary">بازگشت به صفحه اصلی</Link>
        <Link to="/plp/$carouselId" params={{ carouselId: "offers" }} search={{ sort: "default" }} className="btn btn--ghost">
          🔥 مشاهده تخفیف‌ها
        </Link>
      </div>
    </section>
  );
}
