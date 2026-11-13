import type { Home } from "../types";

import { HeroVisual } from "./HeroVisual";

export function Hero({ home }: { home: Home }) {
  const hero = home.hero;
  const ctaHref = hero?.cta?.href || "#products";
  const ctaLabel = hero?.cta?.label || "شروع خرید";

  return (
    <section className="hero section-wrap">
      <div className="hero__copy">
        <span className="eyebrow">
          <span className="eyebrow__dot"></span> تازه‌چینیِ هر روز
        </span>
        <h1>
          طعم تازگی،
          <br />
          <span>با یک انتخاب سبز.</span>
        </h1>
        <p>{hero?.text || "میوه‌های خوش‌رنگ، سبزی‌های تازه..."}</p>
        <div className="hero__actions">
          <a className="button button--lime" href={ctaHref}>
            {ctaLabel} <span aria-hidden="true">←</span>
          </a>
          <a className="text-link" href="#categories">
            کاوش دسته‌بندی‌ها <span aria-hidden="true">↙</span>
          </a>
        </div>
        <div className="hero__proof">
          <div className="avatar-stack" aria-hidden="true">
            <span>🍋</span>
            <span>🍓</span>
            <span>🥑</span>
          </div>
          <div>
            <strong>تازگی که حس می‌شود</strong>
            <small>انتخاب روزانه، کیفیت قابل اعتماد</small>
          </div>
        </div>
      </div>
      <HeroVisual />
      <div className="hero__bottom-line">
        <span>خوبی‌های کوچک، حالِ بهتر</span>
        <span>SCROLL TO DISCOVER ↓</span>
      </div>
    </section>
  );
}
