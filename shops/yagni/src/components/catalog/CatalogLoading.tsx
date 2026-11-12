const skeletonIds = ["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4", "skeleton-5"];

export default function CatalogLoading() {
  return (
    <section className="carousel-container" aria-live="polite" aria-label="در حال بارگذاری محصولات">
      <div className="carousel-header">
        <h2 className="section-title">در حال دریافت محصولات...</h2>
      </div>
      <div className="carousel-track">
        {skeletonIds.map((id) => <div className="product-skeleton" key={id} />)}
      </div>
    </section>
  );
}
