import { useState } from "react";
import { useCatalog } from "../../hooks/useCatalog";
import type { Catalog } from "../../types";
import CartPanel from "../CartPanel";
import CategoryNav from "../CategoryNav";
import Footer from "../Footer";
import Header from "../Header";
import ProductGrid from "../ProductGrid";

function emptyCatalog(): Catalog {
  return { products: [], offers: [], stock: { updatedAt: "", items: {} } };
}

export default function HomePage() {
  const { state, retry } = useCatalog();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const catalog = state.status === "success" ? state : emptyCatalog();
  const visibleProducts = categoryId === null
    ? catalog.products
    : catalog.products.filter((product) => product.categoryId === categoryId);
  const offerProducts = catalog.products.filter((product) =>
    catalog.offers.some((offer) => offer.productId === product.id),
  );
  const message = state.status === "error"
    ? "بارگذاری محصولات انجام نشد. لطفاً دوباره تلاش کنید."
    : "در حال حاضر محصولی برای نمایش نیست.";

  return (
    <>
      <Header />
      <main id="main-content">
        <CategoryNav selectedId={categoryId} onPick={setCategoryId} />
        <ProductGrid
          id="tents"
          title="محصولات"
          products={visibleProducts}
          status={state.status}
          message={message}
          stock={state.status === "success" ? state.stock : undefined}
          offers={catalog.offers}
          onRetry={retry}
        />
        <ProductGrid
          id="special-offers"
          title="پیشنهاد ویژه"
          products={offerProducts}
          status={state.status}
          message={message}
          stock={state.status === "success" ? state.stock : undefined}
          offers={catalog.offers}
        />
        <CartPanel products={catalog.products} />
      </main>
      <Footer />
    </>
  );
}
