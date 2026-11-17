import type { CatalogData } from "../scripts/types";
import { useSearchQuery } from "../hooks/useSearchQuery";
import Catalog from "./catalog/Catalog";
import DocumentTitle from "./layout/DocumentTitle";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

type StorefrontProps = { data: CatalogData };

export default function Storefront({ data }: StorefrontProps) {
  const [query, setQuery] = useSearchQuery();
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
        onQuery={setQuery}
      />
      <Catalog data={data} query={query} />
      <Footer shop={shop} categories={categories} />
    </>
  );
}
