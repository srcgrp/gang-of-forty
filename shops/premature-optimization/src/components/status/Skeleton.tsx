const BANNERS = ["fruit", "sale"];
const CATEGORIES = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];
const CAROUSELS = ["top", "bottom"];
const PROMOS = ["left", "right"];

export default function Skeleton() {
  return (
    <main id="main-content" aria-busy="true">
      <section className="banner">
        {BANNERS.map((key) => (
          <div key={key} className="skeleton skeleton-banner" />
        ))}
      </section>
      <section className="categories">
        <div className="categories-section">
          {CATEGORIES.map((key) => (
            <div key={key} className="skeleton skeleton-category" />
          ))}
        </div>
      </section>
      <div>
        {CAROUSELS.map((key) => (
          <div key={key} className="skeleton skeleton-banner" />
        ))}
      </div>
      <section className="banner-down">
        {PROMOS.map((key) => (
          <div key={key} className="skeleton skeleton-banner" />
        ))}
      </section>
    </main>
  );
}
