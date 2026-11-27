type Props = {
  title: string;
  count?: number;
};

export default function ProductSkeletons({ title, count = 8 }: Props) {
  return (
    <>
      <h2>{title}</h2>

      <div className="product-track" aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <article key={index} className="product-card product-card-skeleton">
            <div className="skeleton-image" />
            <div className="skeleton-line skeleton-title" />
            <div className="skeleton-line skeleton-unit" />
            <div className="skeleton-line skeleton-price" />
            <div className="skeleton-button" />
          </article>
        ))}
      </div>
    </>
  );
}
