import type { Banner } from "../types.ts";

type HeroProps = {
  hero: Banner;
  side: Banner;
};

export default function Hero({ hero, side }: HeroProps) {
  return (
    <div className="hero-area">
      <section className="hero" id="hero" aria-labelledby="hero-title">
        <h2 id="hero-title">
          {hero.title} <span aria-hidden="true">{hero.emoji}</span>
        </h2>
        <p>{hero.text}</p>
        <a href={hero.cta.href}>{hero.cta.label}</a>
      </section>
      <section className="promo" id="promo" aria-labelledby="promo-title">
        <h2 id="promo-title">
          {side.title} <span aria-hidden="true">{side.emoji}</span>
        </h2>
        <p>{side.text}</p>
        <a href={side.cta.href}>{side.cta.label}</a>
      </section>
    </div>
  );
}