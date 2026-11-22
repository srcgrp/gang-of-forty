import type { Home } from '../types'

type HeroProps = {
  id?: string
  home: Home | null
}

export default function Hero({
  id = 'posters',
  home
}: HeroProps) {
  const isSecondPoster = id === 'posters-2'

  return (
    <section
      className="posters"
      id={id}
      aria-label="پیشنهادهای ویژه"
    >
      {!home ? null : isSecondPoster ? (
        home.promos.map((promo, index) => (
          <a
            key={index}
            className={`poster poster-${index + 3}`}
            href={promo.href}
            style={{ background: promo.color }}
          >
            <span>{promo.emoji}</span>
            <p>{promo.text}</p>
          </a>
        ))
      ) : (
        <>
          {[home.hero, home.side].map((banner, index) => (
            <a
              key={index}
              className={`poster poster-${index + 1}`}
              href={banner.cta.href}
            >
              <span>{banner.emoji}</span>
              <h2>{banner.title}</h2>
              <p>{banner.text}</p>
              <b>{banner.cta.label}</b>
            </a>
          ))}
        </>
      )}
    </section>
  )
}