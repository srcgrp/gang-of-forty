export default function NotFound() {
  return (
    <section className="state" aria-labelledby="nf-t">
      <h1 id="nf-t" className="state__title">این دسته را پیدا نکردیم</h1>
      <p>آدرسی که باز کردید دسته‌ای با این نام ندارد.</p>
      <a className="btn btn--green" href="./">بازگشت به صفحه اصلی</a>
    </section>
  );
}
