export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <span className="hero-badge">🪐 فروشگاه آنلاین خواربار</span>
        <h2 id="hero-title">محدودیت نرخ</h2>
        <p className="hero-slogan">هرچی بخوای، توی مدار ماست</p>
        <p className="hero-text">
          میوه و سبزی تازه، لبنیات و نان داغ را با بهترین قیمت و در سریع‌ترین زمان به در خانه‌ات می‌رسانیم. کیفیت را
          خودمان چک می‌کنیم، تو فقط انتخاب کن.
        </p>

        <div className="hero-actions">
          <a href="#fruits" className="hero-btn hero-btn-primary">شروع خرید</a>
          <a href="#rate-limit" className="hero-btn hero-btn-secondary">درباره فروشگاه</a>
        </div>

        <ul className="hero-features">
          <li><strong>🚚</strong>ارسال سریع</li>
          <li><strong>🌿</strong> تازه و تضمین‌شده</li>
          <li><strong>🔒</strong> پرداخت امن</li>
        </ul>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="planet" />
        <div className="ring" />
      </div>
    </section>
  );
}