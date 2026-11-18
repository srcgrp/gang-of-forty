import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Product, Sort } from "../../../scripts/types.ts";
import { sortProducts } from "../../../scripts/logic/catalog/sort-products.ts";
import ProductList from "./ProductList.tsx";
import type { SharedCardProps } from "./ProductList.tsx";
import SortSelect from "../SortSelect.tsx";

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
  const [sort, setSort] = useState<Sort>("default");

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
        <SortSelect value={sort} onChange={setSort} />
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
