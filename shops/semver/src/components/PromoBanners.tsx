import type { Home } from "../types";

export default function PromoBanners({ home }: { home: Home | null }) {
  return (
    <article className="feature-container" id="promos">
      {home?.promos.map((promo) => (
        <a
          className="promo-card"
          href={promo.href}
          style={{ backgroundColor: promo.color }}
          key={`${promo.href}-${promo.text}-${promo.emoji}-${promo.color}`}
        >
          <span className="promo-emoji">{promo.emoji}</span>
          <span className="promo-text">{promo.text}</span>
        </a>
      ))}
    </article>
  );
}
