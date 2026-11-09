import BannerCarousel from './BannerCarousel'

type HeroProps = {
  banners: string[]
}

export default function Hero({ banners }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-video">
          <video
            className="hero-video__media"
            muted
            loop
            playsInline
            preload="none"
            poster="./assets/video/hero-poster.webp"
            aria-hidden="true"
          />
          <div className="hero-video__overlay">
            <h1 className="hero-video__title" id="hero-title">فروشگاه آنلاین کیوی</h1>
            <p className="hero-video__desc">تازه‌ترین مواد غذایی، مستقیم از مزرعه</p>
            <a href="#fruits" className="hero-video__cta">
              <span>مشاهده محصولات</span>
              <svg className="hero-video__cta-icon" aria-hidden="true">
                <use href="./icons.svg#arrowForward" />
              </svg>
            </a>
          </div>
        </div>

        <BannerCarousel banners={banners} />
      </div>
    </section>
  )
}