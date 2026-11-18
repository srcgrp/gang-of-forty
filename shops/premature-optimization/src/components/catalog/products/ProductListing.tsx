import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import type { Product } from "../../../scripts/types.ts";
import { sortProducts } from "../../../scripts/logic/catalog/sort-products.ts";
import { usePlpSort } from "../../../hooks/usePlpSort.ts";
import SortSelect from "../SortSelect.tsx";
import ProductList from "./ProductList.tsx";
import type { SharedCardProps } from "./ProductList.tsx";

const numberFormat = new Intl.NumberFormat("fa-IR");

type ProductListingProps = SharedCardProps & {
  title: string;
  products: Product[];
};

export default function ProductListing({
  title,
  products,
  ...shared
}: ProductListingProps) {
  const [sort, setSort] = usePlpSort();
  const sortedProducts = useMemo(
    () => sortProducts(products, sort),
    [products, sort],
  );

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="recommendation plp" id="plp">
        <div className="recommendation-heading">
          <div className="recommendation-title-wrapper">
            <h2 className="recommendation-title">{title}</h2>
            <p className="plp-count">
              <span>.</span> {numberFormat.format(products.length)} محصول
            </p>
          </div>

          <Link className="view-all-link" to="/">
            بازگشت به صفحه اصلی
          </Link>
        </div>
        <SortSelect value={sort} onChange={setSort} />
        {products.length === 0 ? (
          <p className="empty-message">محصولی برای نمایش وجود ندارد.</p>
        ) : (
          <ul className="products">
            <ProductList products={sortedProducts} {...shared} />
          </ul>
        )}
      </section>
    </main>
  );
}
