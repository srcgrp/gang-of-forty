export default function Hero() {
  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
    >
      <img
        className="hero-ornament"
        src="./asset/banners/border.webp"
        alt=""
        aria-hidden="true"
      />

      <div className="hero-content">
        <h1 id="hero-title">
          تازگی، هر روز در خانه شما
        </h1>

        <p>
          انتخابی تازه از محصولات روزمره
          با حال‌وهوای ایرانی.
        </p>

        <a className="hero-button" href="#products">
          مشاهده محصولات فروشگاه
        </a>
      </div>

      <img
        className="hero-ornament hero-ornament-bottom"
        src="./asset/banners/border.webp"
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}