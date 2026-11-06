import type { Home } from "../types";

export function Hero({ home }: { home: Home }) {
  const hero = home.hero;
  const title = hero?.title || "طعم تازگی، با یک انتخاب سبز.";
  const [line1, line2] = title.split("،").map((s) => s.trim());
  const text =
    hero?.text ||
    "میوه‌های خوش‌رنگ، سبزی‌های تازه و خوراکی‌های روزانه؛ باکیفیت و با دقت انتخاب‌شده برای سفره‌ی شما.";
  const cta = hero?.cta || { label: "شروع خرید", href: "#products" };

  return (
    <section className="hero section-wrap">
      <div className="hero__copy">
        <span className="eyebrow">
          <span className="eyebrow__dot"></span> تازه‌چینیِ هر روز
        </span>
        <h1>
          {line1}
          {line2 && (
            <>
              <br />
              <span>{line2}</span>
            </>
          )}
        </h1>
        <p>{text}</p>
        <div className="hero__actions">
          <a className="button button--lime" href={cta.href}>
            {cta.label} <span aria-hidden="true">←</span>
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
      <div className="hero__visual">
        <div className="hero__halo"></div>
        <div className="hero__orbit hero__orbit--outer"></div>
        <div className="hero__orbit hero__orbit--inner"></div>
        <div
          className="hero__fruit hero__fruit--main"
          role="img"
          aria-label="سیب سرخ تازه"
        >
          🍎
        </div>
        <div
          className="hero__fruit hero__fruit--avocado"
          role="img"
          aria-label="آووکادو تازه"
        >
          🥑
        </div>
        <div
          className="hero__fruit hero__fruit--lemon"
          role="img"
          aria-label="لیمو تازه"
        >
          🍋
        </div>
      </div>
    </section>
  );
}
