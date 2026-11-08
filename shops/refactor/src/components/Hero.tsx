import type { Banner } from '../types'
import { safeHref } from './safe-href'

type HeroProps = { main: Banner; side: Banner }

const BASE = import.meta.env.BASE_URL

export default function Hero({ main, side }: HeroProps) {
  return (
    <section className="hero container" id="hero" aria-label="پیشنهادهای فروشگاه">
      <div className="hero-grid" id="hero-grid">
        <div className="swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <article className="hero-main">
                <img className="hero-main__image" src={`${BASE}img/bg.png`} alt="" width={560} height={400} />
                <div className="hero-main__content">
                  <span className="hero-emoji" aria-hidden="true">{main.emoji}</span>
                  <h2 className="hero-title">{main.title}</h2>
                  <p className="hero-text">{main.text}</p>
                  <a className="btn btn-primary" href={safeHref(main.cta.href)}>{main.cta.label}</a>
                </div>
              </article>
            </div>
          </div>
        </div>
        <article className="hero-side">
          <img className="banner-custom-img" src={`${BASE}img/bg1.png`} alt="" />
          <div className="hero-side-content">
            <span className="side-icon" aria-hidden="true">{side.emoji}</span>
            <h2 className="side-title">{side.title}</h2>
            <p className="side-text">{side.text}</p>
            <a className="btn btn-primary" href={safeHref(side.cta.href)}>{side.cta.label}</a>
          </div>
        </article>
      </div>
    </section>
  )
}
