import type { Banner } from "../types.ts";
import AppLink from "./AppLink.tsx";

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
        <AppLink href={hero.cta.href}>{hero.cta.label}</AppLink>
      </section>
      <section className="promo" id="promo" aria-labelledby="promo-title">
        <h2 id="promo-title">
          {side.title} <span aria-hidden="true">{side.emoji}</span>
        </h2>
        <p>{side.text}</p>
        <AppLink href={side.cta.href}>{side.cta.label}</AppLink>
      </section>
    </div>
  );
}