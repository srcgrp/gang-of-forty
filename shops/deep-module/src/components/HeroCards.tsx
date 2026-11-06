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
        </article>
      </div>
    </section>
  );
}
