import type { CatalogData } from "../scripts/types";
import Catalog from "./catalog/Catalog.tsx";
import DocumentTitle from "./layout/DocumentTitle.tsx";
import Footer from "./layout/Footer.tsx";
import Header from "./layout/Header.tsx";

type StorefrontProps = {
  data: CatalogData;
  categoryId: number | null;
  query: string;
  onPick: (id: number) => void;
  onQuery: (query: string) => void;
};

export default function Storefront({
  data,
  categoryId,
  query,
  onPick,
  onQuery,
}: StorefrontProps) {
  const { products, offers, categories } = data;
  const shop = {
    ...data.shop,
    name: "سوپرینو",
    copyright: "© ۱۴۰۵ سوپرینو · عضو دار و دسته چهل‌نفره",
  };

  return (
    <>
      <DocumentTitle name={shop.name} />
      <a className="skip-link" href="#main-content">
        پرش به محتوای اصلی
      </a>
      <Header
        shop={shop}
        categories={categories}
        products={products}
        offers={offers}
        query={query}
        onQuery={onQuery}
      />
      <Catalog
        data={data}
        categoryId={categoryId}
        query={query}
        onPick={onPick}
      />
      <Footer shop={shop} categories={categories} />
    </>
  );
}
