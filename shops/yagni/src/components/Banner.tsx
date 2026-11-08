import type { HomeSlide } from "../types";

interface BannerProps { slides: HomeSlide[] }

export default function Banner({ slides }: BannerProps) {
  const repeatedSlides = [...slides, ...slides];
  return (
    <section className="banner anchor-section" id="banner" aria-label="بنر اصلی">
      <div className="banner__track">
        {repeatedSlides.map((slide, index) => (
          <a className="banner__slide" href={slide.cta.href} key={`${slide.title}-${index}`} aria-hidden={index >= slides.length}>
            <span className="banner__slide-emoji" aria-hidden="true">{slide.emoji}</span>
            <div className="banner__slide-content">
              <h2 className="banner__slide-title">{slide.title}</h2>
              <p className="banner__slide-text">{slide.text}</p>
              <span className="banner__slide-cta">{slide.cta.label}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
