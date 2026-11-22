import type { Home } from "../types/shop.ts";

type HeroProps = { home: Home };

export default function Hero({ home }: HeroProps) {
  const hero = home.hero;
  const side = home.side;
  return (
    <div className="hero" id="hero">
      <article className="promo fruit">
        <h2>{hero.title}</h2>
        <p>{hero.text}</p>
        <a className="pill gold" href={hero.cta.href}>
          {hero.cta.label}
        </a>
        <span className="hero-emoji">{hero.emoji}</span>
      </article>
      <article className="promo dairy-off">
        <h3>{side.title}</h3>
        <p>{side.text}</p>
        <span className="hero-emoji">{side.emoji}</span>
        <a className="pill" href={side.cta.href}>
          {side.cta.label}
        </a>
      </article>
    </div>
  );
}
