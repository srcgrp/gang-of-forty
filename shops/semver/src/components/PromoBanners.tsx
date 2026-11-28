import breakfastImage from "../../image/promo-family-breakfast.jpg";
import breadImage from "../../image/promo-fresh-bread.jpg";
import type { Home } from "../types";
import StoreLink from "./StoreLink";

const promoImages = new Map([
  ["#dairy", breakfastImage],
  ["#bakery", breadImage],
]);

type PromoBannersProps = {
  promos: Home["promos"];
  id?: string;
};

export default function PromoBanners({ promos, id }: PromoBannersProps) {
  if (promos.length === 0) return null;

  return (
    <article className="feature-container" id={id}>
      {promos.map((promo) => {
        const image = promoImages.get(promo.href);

        return (
          <StoreLink
            className="promo-card"
            href={promo.href}
            key={`${promo.href}-${promo.text}-${promo.emoji}-${promo.color}`}
          >
            <span className="promo-content">
              <span className="promo-text">{promo.text}</span>
              <span className="promo-arrow" aria-hidden="true">
                <i className="ph ph-arrow-left"></i>
              </span>
            </span>
            <span className="promo-visual" style={{ backgroundColor: promo.color }}>
              {image ? (
                <img className="promo-image" src={image} alt="" loading="lazy" decoding="async" />
              ) : (
                <span className="promo-emoji" aria-hidden="true">{promo.emoji}</span>
              )}
            </span>
          </StoreLink>
        );
      })}
    </article>
  );
}
