export default function Hero() {
  return (
    <section className="hero" aria-label="پیشنهاد اصلی">
      <div className="hero__feature">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__brand">سوپرمارکت آرمین،</span>
            <span className="hero__headline">میوه‌های تازه، هر روز صبح</span>
          </h1>
          <p className="hero__lead">مستقیم از باغ‌های اطراف شهر، تا دو ساعت بعد دم در خانه شما.</p>
          <div className="hero__actions">
            <a className="btn" href="#fruits">خرید میوه و سبزی</a>
            <a className="btn btn--outline" href="#offers">پیشنهاد ویژه امروز</a>
          </div>
        </div>
        <div className="hero__stage">
          <span className="hero__disc" aria-hidden="true" />
          <img className="hero__item hero__item--broccoli" src="./assets/images/hero/broccoli.webp" alt="کلم بروکلی" width="560" height="559" decoding="async" />
          <img className="hero__item hero__item--carrot" src="./assets/images/hero/carrot.webp" alt="هویج" width="357" height="560" decoding="async" />
          <img className="hero__item hero__item--pepper" src="./assets/images/hero/pepper.webp" alt="فلفل دلمه‌ای" width="502" height="560" decoding="async" />
          <img className="hero__item hero__item--tomato" src="./assets/images/hero/tomato.webp" alt="گوجه‌فرنگی" width="541" height="560" fetchPriority="high" decoding="async" />
          <img className="hero__item hero__item--orange" src="./assets/images/hero/orange.webp" alt="پرتقال تامسون" width="560" height="466" decoding="async" />
          <img className="hero__item hero__item--strawberry" src="./assets/images/hero/strawberry.webp" alt="توت‌فرنگی" width="518" height="560" decoding="async" />
        </div>
      </div>
      <div className="hero__promo">
        <div className="hero__promo-copy">
          <h2 className="hero__promo-title">تا ۲۰٪ تخفیف لبنیات</h2>
          <p className="hero__promo-note">فقط تا پایان هفته</p>
          <a className="btn btn--green" href="#dairy">دیدن محصولات</a>
        </div>
        <img className="hero__promo-art" src="./assets/images/hero/dairy.webp" alt="" width="560" height="348" decoding="async" />
      </div>
    </section>
  );
}