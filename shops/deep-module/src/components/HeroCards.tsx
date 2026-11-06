import type { Home } from "../types";

export function HeroCards({ home }: { home: Home }) {
  return (
    <section className="hero-cards">
      <div className="hero__wrapper">
        <article className="hero-card hero-card--primary">
          <div className="hero-card__content">
            <span className="hero-card__eyebrow">تازه از باغ</span>
            <h2 className="hero-card__title">{home.hero?.title || "میوه‌های تازه، هر روز صبح"}</h2>
            <p className="hero-card__text">{home.hero?.text || "مستقیم از باغ‌های اطراف شهر"}</p>
            <a href={home.hero?.cta.href || "#fruits"} className="hero-card__btn">خرید میوه و سبزی ←</a>
          </div>
        </article>
        <article className="hero-card hero-card--secondary">
          <div className="hero-card__content">
            <span className="hero-card__eyebrow hero-card__eyebrow--accent">۲۰٪ تخفیف</span>
            <h2 className="hero-card__title hero-card__title--sm">{home.side?.title || "لبنیات تازه"}</h2>
            <p className="hero-card__text hero-card__text--sm">{home.side?.text || "فقط تا پایان هفته"}</p>
            <a href={home.side?.cta.href || "#dairy"} className="hero-card__btn hero-card__btn--outline">دیدن محصولات ←</a>
          </div>
        </article>
      </div>
    </section>
  );
}