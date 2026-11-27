export function HeroVisual() {
  return (
    <div className="hero__visual">
      <div className="hero__halo" aria-hidden="true"></div>
      <div className="hero__orbit hero__orbit--outer" aria-hidden="true"></div>
      <div className="hero__orbit hero__orbit--inner" aria-hidden="true"></div>

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

      <div className="floating-note floating-note--top">
        <span aria-hidden="true">✦</span>
        <div>
          <strong>۱۰۰٪ تازه</strong>
          <small>هر روز انتخاب می‌شود</small>
        </div>
      </div>
      <div className="floating-note floating-note--bottom">
        <span className="note-icon" aria-hidden="true">
          ↗
        </span>
        <div>
          <strong>از مزرعه تا خانه</strong>
          <small>با وسواس در کیفیت</small>
        </div>
      </div>
      <div className="visual-index" aria-hidden="true">
        FRESH / 01
      </div>
    </div>
  );
}
