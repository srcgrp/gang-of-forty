import Art from "./Art.tsx";
import { PROMOS } from "./sampleData.ts";

export default function Promos() {
  return (
    <section className="banner-down" id="home-promos">
      {PROMOS.map((promo, index) => (
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
