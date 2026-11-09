type BannerCarouselProps = {
  banners: string[]
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  return (
    <div className="hero-carousel">
      <ul
        className="hero-carousel__track"
        id="banner-track"
        tabIndex={0}
        aria-label="کاروسل پیشنهادهای ویژه"
      >
        {banners.map((src, i) => (
          <li className="hero-carousel__slide" key={src}>
            <a className="hero-banner" href="#offers">
              <img
                src={src}
                alt={`بنر ${i + 1}`}
                width={800}
                height={500}
                decoding="async"
                loading="lazy"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}