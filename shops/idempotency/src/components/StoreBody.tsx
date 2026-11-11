import Hero from "./Hero";
import Footer from "./Footer";
import CategoryGrid from "./CategoryGrid";
import ProductSections from "./ProductSections";
import LoadStatus from "./LoadStatus";
import HomeBanners from "./HomeBanners";

import type { StoreData } from "../features/products/api/store-data";
import type { LoadState } from "../shared/types/products";
import LoadingProductSections from "./LoadingProductSections";
type Props = {
  data: StoreData | null;
  loadState: LoadState;
  categoryId: number | null;
  onPickCategory: (id: number | null) => void;
  onAdd: (id: number) => void;
};

export default function StoreBody({
  data,
  loadState,
  categoryId,
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
          <section id="categories" className="categories">
            <h2>دسته‌بندی‌ها</h2>
            <p>
              {loadState.status === "loading"
                ? "در حال دریافت دسته‌بندی‌ها..."
                : "دسته‌بندی‌ها فعلاً در دسترس نیستند."}
            </p>
          </section>
        )}

        {loadState.status === "success" && data ? (
          <ProductSections data={data} categoryId={categoryId} onAdd={onAdd} />
        ) : loadState.status === "loading" ? (
          <LoadingProductSections />
        ) : (
          <section id="products" className="product-section">
            <LoadStatus state={loadState} />
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
