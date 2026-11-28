export default function HeroBanners() {
  return (
    <section className="hero-banners-section" aria-label="پیشنهادهای برتر">
      <div className="container hero-banners-grid">
        <article className="hero-banner-card banner-fruit">
          <div className="banner-overlay"></div>
          <div className="hero-banner-content">
            <span className="hero-badge">🍓 برداشت روز</span>
            <h2 className="hero-banner-title">
              میوه و سبزیجات
              <br />
              دست‌چین روز
            </h2>
            <p className="hero-banner-desc">
              تازه از مزارع ایرانی، مستقیم به خانه شما
            </p>
            <a href="#fruits" className="hero-banner-btn">
              مشاهده تازه‌ها ←
            </a>
          </div>
        </article>

        <article className="hero-banner-card banner-dairy">
          <div className="banner-overlay"></div>
          <div className="hero-banner-content">
            <span className="hero-badge">🥛 تضمین کیفیت و قیمت</span>
            <h2 className="hero-banner-title">
              تا ۳۰٪ تخفیف
              <br />
              جشنواره لبنیات ایرانی
            </h2>
            <p className="hero-banner-desc">
              لذت طعم طبیعی با بهترین قیمت‌ها
            </p>
            <a href="#dairy" className="hero-banner-btn">
              خرید لبنیات تازه ←
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}
