import type { Home } from "../types";

import { HeroVisual } from "./HeroVisual";

export function Hero({ home }: { home: Home }) {
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
        <p>{home.hero?.text || "میوه‌های خوش‌رنگ، سبزی‌های تازه..."}</p>
        <div className="hero__actions">
          <a
            className="button button--lime"
            href={home.hero?.cta.href || "#products"}
          >
            {home.hero?.cta.label || "شروع خرید"}{" "}
            <span aria-hidden="true">←</span>
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
