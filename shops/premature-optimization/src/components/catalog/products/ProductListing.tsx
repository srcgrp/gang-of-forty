import { Link } from "@tanstack/react-router";
import type { Product } from "../../../scripts/types.ts";
import { sortProducts } from "../../../scripts/logic/catalog/sort-products.ts";
import ProductList from "./ProductList.tsx";
import type { SharedCardProps } from "./ProductList.tsx";
import SortSelect from "../SortSelect.tsx";
import { usePlpSort } from "../../../hooks/usePlpSort.ts";

const format = new Intl.NumberFormat("fa-IR");

type ProductListingProps = SharedCardProps & {
  title: string;
  products: Product[];
};

export default function ProductListing({
  title,
  products,
  ...shared
}: ProductListingProps) {
  const [sort] = usePlpSort();

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="recommendation plp" id="plp">
        <div className="recommendation-heading">
          <div className="recommendation-title-wrapper">
            <h2 className="recommendation-title">{title}</h2>
            <p className="plp-count">
              <span>.</span> {format.format(products.length)} محصول
            </p>
          </div>

          <Link className="view-all-link" to="/">
            بازگشت به صفحه اصلی
          </Link>
        </div>
        <SortSelect/>
        {products.length === 0 ? (
          <p className="empty-message">محصولی برای نمایش وجود ندارد.</p>
        ) : (
          <ul className="products">
            <ProductList products={sortProducts(products, sort)} {...shared} />
          </ul>
        )}
      </section>
    </main>
  );
}
