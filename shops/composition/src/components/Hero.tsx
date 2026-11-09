import type { Home } from "../shared/types";

type Props = { home: Home };
export default function Hero({ home }: Props) {
  return (
    <div id="banners" className="banners">
      <section className="hero">
        <h1>{home.hero.title}</h1><p>{home.hero.text}</p>
        <span className="banner-emoji" aria-hidden="true">{home.hero.emoji}</span>
        <a className="primary-link" href={home.hero.cta.href}>{home.hero.cta.label}</a>
      </section>
      <section className="hero">
        <h2>{home.side.title}</h2><p>{home.side.text}</p>
        <span className="banner-emoji" aria-hidden="true">{home.side.emoji}</span>
        <a className="primary-link" href={home.side.cta.href}>{home.side.cta.label}</a>
      </section>
    </div>
  );
}
