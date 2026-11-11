import Hero from "./Hero";
import Footer from "./Footer";
import CategoryGrid from "./CategoryGrid";
import ProductSections from "./ProductSections";
import LoadStatus from "./LoadStatus";
import HomeBanners from "./HomeBanners";

import type { StoreData } from "../features/products/api/store-data";
import type { LoadState } from "../shared/types/products";
import LoadingProductSections from "./LoadingProductSections";
import CategoryFallback from "./CategoryFallback";
type Props = {
  data: StoreData | null;
  loadState: LoadState;
  onRetry: () => void;
  categoryId: number | null;
  query: string;
  onPickCategory: (id: number | null) => void;
  onAdd: (id: number) => void;
};

export default function StoreBody({
  data,
  loadState,
  onRetry,
  categoryId,
  query,
  onPickCategory,
  onAdd,
}: Props) {
  return (
    <>
      <main id="main-content">
        <Hero hero={data?.home.hero ?? null} />
        {data && <HomeBanners home={data.home} />}
        {data ? (
          <CategoryGrid categories={data.categories} onPick={onPickCategory} />
        ) : (
          <CategoryFallback loading={loadState.status === "loading"} />
        )}

        {loadState.status === "success" && data ? (
          <ProductSections
            data={data}
            categoryId={categoryId}
            query={query}
            onAdd={onAdd}
          />
        ) : loadState.status === "loading" ? (
          <LoadingProductSections />
        ) : (
          <section id="products" className="product-section">
            <LoadStatus state={loadState} onRetry={onRetry} />
          </section>
        )}
      </main>

      <Footer
        shop={data?.shop ?? null}
        categories={data?.categories ?? []}
        onPickCategory={onPickCategory}
      />
    </>
  );
}
