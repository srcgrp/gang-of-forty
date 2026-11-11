import type { Home } from "../shared/types/home";

type Props = {
  home: Home;
};

export default function HomeBanners({ home }: Props) {
  return (
    <div className="home-banners">
      <div id="home-side">
        <article className="home-side-banner">
          <h2>{home.side.title}</h2>
          <p>{home.side.text}</p>

          <a className="home-banner-link" href={home.side.cta.href}>
            {home.side.cta.label}
          </a>

          <span className="banner-percent" aria-hidden="true">
            ٪
          </span>
        </article>
      </div>

      <div id="home-promos">
        {home.promos.map((promo) => (
          <a key={promo.href} className="home-promo-card" href={promo.href}>
            <span>{promo.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
