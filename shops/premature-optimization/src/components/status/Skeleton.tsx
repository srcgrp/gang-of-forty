type SkeletonBlocksProps = {
  count: number;
  variant: "banner" | "category" | "carousel";
};

function SkeletonBlocks({ count, variant }: SkeletonBlocksProps) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={`skeleton skeleton-${variant}`} />
      ))}
    </>
  );
}

export default function Skeleton() {
  return (
    <main id="main-content" aria-busy="true">
      <section className="banner">
        <SkeletonBlocks count={2} variant="banner" />
      </section>
      <section className="categories">
        <div className="categories-section">
          <SkeletonBlocks count={7} variant="category" />
        </div>
      </section>
      <div>
        <SkeletonBlocks count={2} variant="carousel" />
      </div>
      <section className="banner-down">
        <SkeletonBlocks count={2} variant="banner" />
      </section>
    </main>
  );
}
