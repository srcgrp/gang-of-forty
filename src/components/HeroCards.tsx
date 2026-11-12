import type { Home } from "../types";

export function HeroCards({ home }: { home: Home }) {
  const hero = home.hero ?? {
    title: "میوه‌های تازه، هر روز صبح",
    text: "مستقیم از باغ‌های اطراف شهر؛ تازه به دست شما می‌رسد.",
    cta: { label: "خرید میوه و سبزی", href: "#fruits" },
  };
  const side = home.side ?? {
    title: "لبنیات تازه",
    text: "فقط تا پایان هفته",
    cta: { label: "دیدن محصولات", href: "#dairy" },
  };

  return (
    <section className="hero-cards">
      <div className="hero__wrapper">
        <article className="hero-card hero-card--primary">
          <div className="hero-card__content">
            <span className="hero-card__eyebrow">تازه از باغ</span>
            <h2 className="hero-card__title">{hero.title}</h2>
            <p className="hero-card__text">{hero.text}</p>
            <a href={hero.cta.href} className="hero-card__btn">
              <span>{hero.cta.label}</span>
              <span aria-hidden="true">←</span>
            </a>
          </div>
          <div className="hero-card__art" aria-hidden="true">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <ellipse
                cx="100"
                cy="185"
                rx="60"
                ry="8"
                fill="rgba(0,0,0,.15)"
              />
              <ellipse cx="100" cy="120" rx="65" ry="60" fill="#e53935" />
              <ellipse
                cx="75"
                cy="95"
                rx="20"
                ry="25"
                fill="#ff8a80"
                opacity=".5"
              />
              <ellipse
                cx="70"
                cy="88"
                rx="10"
                ry="14"
                fill="#fff"
                opacity=".4"
              />
              <path
                d="M40 130 Q100 185 160 130 Q100 175 40 130 Z"
                fill="#b71c1c"
                opacity=".35"
              />
              <path
                d="M100 65 L85 55 L90 62 L75 58 L85 65 L70 68 L85 70 L72 78 L88 72 L82 82 L95 72 L100 65 Z"
                fill="#43a047"
              />
              <path
                d="M100 65 L115 55 L110 62 L125 58 L115 65 L130 68 L115 70 L128 78 L112 72 L118 82 L105 72 L100 65 Z"
                fill="#2e7d32"
              />
              <path
                d="M100 65 Q98 50 100 40"
                stroke="#4e342e"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="100" cy="40" r="2.5" fill="#4e342e" />
            </svg>
          </div>
        </article>

        <article className="hero-card hero-card--secondary">
          <div className="hero-card__content">
            <span className="hero-card__eyebrow hero-card__eyebrow--accent">
              ۲۰٪ تخفیف
            </span>
            <h2 className="hero-card__title hero-card__title--sm">
              {side.title}
            </h2>
            <p className="hero-card__text hero-card__text--sm">{side.text}</p>
            <a
              href={side.cta.href}
              className="hero-card__btn hero-card__btn--outline"
            >
              <span>{side.cta.label}</span>
              <span aria-hidden="true">←</span>
            </a>
          </div>
          <div className="hero-card__art hero-card__art--sm" aria-hidden="true">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <ellipse
                cx="100"
                cy="170"
                rx="75"
                ry="10"
                fill="rgba(0,0,0,.12)"
              />
              <path d="M25 130 L100 55 L175 130 L100 155 Z" fill="#e6a500" />
              <path d="M25 130 L100 55 L100 155 L25 130 Z" fill="#ffca28" />
              <path d="M100 55 L175 130 L100 155 L100 55 Z" fill="#ffb300" />
              <path
                d="M35 128 L100 62 L110 70 L45 135 Z"
                fill="#fff"
                opacity=".3"
              />
              <ellipse cx="60" cy="125" rx="10" ry="6" fill="#ff8f00" />
              <ellipse cx="130" cy="125" rx="8" ry="5" fill="#ff8f00" />
              <ellipse cx="90" cy="100" rx="6" ry="3.5" fill="#ff8f00" />
              <ellipse cx="75" cy="140" rx="7" ry="4" fill="#ff8f00" />
              <ellipse cx="110" cy="142" rx="6" ry="3.5" fill="#ff8f00" />
              <path
                d="M25 130 L100 155 L175 130"
                stroke="#e6a500"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
        </article>
      </div>
    </section>
  );
}
