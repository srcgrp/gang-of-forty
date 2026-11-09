export default function BannerCarousel() {
  return (
    <div className="hero-carousel">
      <ul
        className="hero-carousel__track"
        id="banner-track"
        tabIndex={0}
        aria-label="کاروسل پیشنهادهای ویژه"
      >
        <li className="hero-carousel__slide">
          <a className="hero-banner" href="#offers">
            <img
              src="./assets/images/banners/banner-1.webp"
              alt="بنر ۱"
              width={800}
              height={500}
              decoding="async"
              loading="lazy"
            />
          </a>
        </li>
      </ul>
    </div>
  )
}