import type { Home } from "../types";

export function BannersSection({ home }: { home: Home }) {
  if (!home.promos || home.promos.length === 0) return null;

  return (
    <section className="banners" aria-label="بنرهای تبلیغاتی">
      <div className="banners__wrapper">
        {home.promos.slice(0, 2).map((promo, i) => (
          <a key={i} href={promo.href || "#"} className="banner">
            <span className="banner__icon" aria-hidden="true">
              {promo.emoji}
            </span>
            <div className="banner__content">
              <strong>{promo.text}</strong>
            </div>
            <span className="banner__arrow" aria-hidden="true">
              ←
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
