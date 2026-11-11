import { useCarousel } from '../hooks/useCarousel'
import CarouselNav from './CarouselNav'
import BasketSlide from './BasketSlide'

type BannerCarouselProps = {
  banners: string[]
  loading?: boolean
}

export default function BannerCarousel({ banners, loading }: BannerCarouselProps) {
  const { trackRef, isAtStart, isAtEnd, scrollPrev, scrollNext } = useCarousel(loading ? 0 : banners.length + 1)

  if (loading) {
    return (
      <div className="hero-carousel">
        <ul className="hero-carousel__track">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="hero-carousel__slide" data-skeleton>
              <span className="hero-banner"></span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="hero-carousel">
      <ul ref={trackRef} className="hero-carousel__track" id="banner-track" tabIndex={0} aria-label="کاروسل پیشنهادهای ویژه">
        <BasketSlide />
        {banners.map((src, i) => (
          <li key={src} className="hero-carousel__slide">
            <a className="hero-banner" href="#offers">
              <img src={src} alt={`بنر ${i + 1}`} width={800} height={500} decoding="async" loading="lazy" />
            </a>
          </li>
        ))}
      </ul>
      <CarouselNav
        variant="hero"
        isAtStart={isAtStart}
        isAtEnd={isAtEnd}
        onPrev={scrollPrev}
        onNext={scrollNext}
        label="پیشنهادها"
        sectionId="banner-track"
      />
    </div>
  )
}
