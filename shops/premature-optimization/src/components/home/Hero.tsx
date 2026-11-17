import type { BannerData, Home } from "../../scripts/types";
import { Art } from "../shared/Art.tsx";

type HeroProps = Pick<Home, "hero" | "side">;

function BannerArticle({
  data,
  variant,
}: {
  data: BannerData;
  variant: string;
}) {
  return (
    <article className={variant}>
      <div className={`banner-content ${variant}-content`}>
        <h2 className={`banner-title ${variant}-title`}>{data.title}</h2>
        <p className={`banner-details ${variant}-details`}>{data.text}</p>
        {data.cta && (
          <a className={`banner-button ${variant}-button`} href={data.cta.href}>
            {data.cta.label}
          </a>
        )}
      </div>
      <span className="banner-art">
        <Art value={data.emoji} alt={data.title} />
      </span>
    </article>
  );
}

export default function Hero({ hero, side }: HeroProps) {
  return (
    <section className="banner" id="home-banners">
      {hero && <BannerArticle data={hero} variant="banner-fruit" />}
      {side && <BannerArticle data={side} variant="banner-sale" />}
    </section>
  );
}
