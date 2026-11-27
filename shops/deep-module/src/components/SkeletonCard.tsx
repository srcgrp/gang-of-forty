export function SkeletonCard() {
  return (
    <div className="product-card skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-media" />
      <div className="skeleton skeleton-line skeleton-line--lg" />
      <div className="skeleton skeleton-line skeleton-line--sm" />
      <div className="skeleton-card__footer">
        <div className="skeleton skeleton-price" />
        <div className="skeleton skeleton-btn" />
      </div>
    </div>
  );
}
