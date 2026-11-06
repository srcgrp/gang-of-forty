export function Hero() {
  return (
    <section className="hero section-wrap">
      <div className="hero__copy">
        <span className="eyebrow"><span className="eyebrow__dot"></span> تازه‌چینیِ هر روز</span>
        <h1>طعم تازگی،<br /><span>با یک انتخاب سبز.</span></h1>
        <p>میوه‌های خوش‌رنگ، سبزی‌های تازه و خوراکی‌های روزانه؛ باکیفیت و با دقت انتخاب‌شده برای سفره‌ی شما.</p>
        <div className="hero__actions">
          <a className="button button--lime" href="#products">شروع خرید ←</a>
          <a className="text-link" href="#categories">کاوش دسته‌بندی‌ها ↙</a>
        </div>
      </div>
      <div className="hero__visual">
        <div className="hero__halo"></div>
        <div className="hero__fruit hero__fruit--main" role="img" aria-label="سیب سرخ تازه">🍎</div>
        <div className="hero__fruit hero__fruit--avocado" role="img" aria-label="آووکادو تازه">🥑</div>
        <div className="hero__fruit hero__fruit--lemon" role="img" aria-label="لیمو تازه">🍋</div>
      </div>
    </section>
  );
}