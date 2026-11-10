import type { Promo } from "../../scripts/types";
import { Art } from "../shared/Art.tsx";

type PromosProps = { promos: Promo[] };

export default function Promos({ promos }: PromosProps) {
  return (
    <section className="banner-down" id="home-promos">
      {promos.map((promo, index) => (
        <article
          key={promo.href}
          className={index % 2 ? "banner-bread" : "banner-breakfast"}
        >
          <div className="banner-content">
            <h2 className="banner-title">{promo.text}</h2>
            <a className="promo-link" href={promo.href}>
              دیدن محصولات
            </a>
          </div>
          <span className="promo-emoji">
            <Art value={promo.emoji} alt={promo.text} />
          </span>
        </article>
      ))}
    </section>
  );
}
