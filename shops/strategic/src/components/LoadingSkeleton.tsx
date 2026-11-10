const CATEGORY_SLOTS = [1, 2, 3, 4, 5, 6, 7];
const CARD_SLOTS = [1, 2, 3, 4, 5, 6];

export default function LoadingSkeleton() {
  return (
    <>
      <section className="hero hero--skeleton" aria-hidden="true">
        <div className="skeleton skeleton--hero" />
        <div className="skeleton skeleton--hero" />
      </section>
      <section id="loading" aria-labelledby="categories-t">
        <div className="sec-head"><h2 id="categories-t">دسته‌بندی‌ها</h2></div>
        <p className="state-text" id="loading-text" role="status">در حال بارگذاری محصولات…</p>
        <ul className="cats cats--skeleton" aria-hidden="true">
          {CATEGORY_SLOTS.map(slot => <li key={slot} className="skeleton" />)}
        </ul>
      </section>
      <section aria-hidden="true">
        <ul className="rail rail--skeleton">
          {CARD_SLOTS.map(slot => (
            <li key={slot} className="card card--skeleton">
              <div className="card__body">
                <div className="pic skeleton" />
                <span className="skeleton skeleton--line" />
                <span className="skeleton skeleton--line skeleton--short" />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}