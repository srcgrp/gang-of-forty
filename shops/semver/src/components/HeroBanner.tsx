import type { HomeBanner } from "../types";
import StoreLink from "./StoreLink";

export default function HeroBanner({ hero }: { hero?: HomeBanner }) {
  return (
    <section className="hero-container">
      <div id="hero-right">
        <div id="hero-title1">
          <h1 id="hero-h1">{hero?.title}</h1>
          <p id="hero-p">{hero?.text}</p>
          <StoreLink href={hero?.cta.href ?? "#"} id="cta">
            <span id="cta-label">{hero?.cta.label}</span>
            <i className="ph ph-arrow-left ph-lg"></i>
          </StoreLink>
        </div>
      </div>
    </section>
  );
}
