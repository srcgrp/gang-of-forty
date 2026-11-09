import ProductCard from "./ProductCard";

type ProductGridProps = {
  title: string;
  id: string;
  nuts?: boolean;
};

export default function ProductGrid({
  id,
  nuts = false,
}: ProductGridProps) {
  return (
    <article className="special-offer" id={id}>
      <div className="special-offer-title">
        <h2 className="items-header">لبنیات</h2>

        <a
          className="items-header-link"
          href={nuts ? "#candy" : "#frozen"}
        >
          <span>مشاهده همه</span>

          <span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4537E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M5 12l4 4" />
              <path d="M5 12l4 -4" />
            </svg>
          </span>
        </a>
      </div>

      <div className="special-offer-items">
        {nuts ? (
          <>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard unavailable />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </>
        ) : (
          <>
            <ProductCard />
            <ProductCard discount="۵٪" />
            <ProductCard />
            <ProductCard />
            <ProductCard discount="۳٪" />
            <ProductCard discount="۵٪" />
            <ProductCard discount="۵٪" />
            <ProductCard discount="۵٪" />
            <ProductCard discount="۵٪" />
            <ProductCard discount="۵٪" />
            <ProductCard discount="۵٪" />
            <ProductCard discount="۵٪" />
          </>
        )}
      </div>
    </article>
  );
}