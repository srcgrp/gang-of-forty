import { useEffect, useState } from "react";
import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import ProductGrid from "./components/ProductGrid";
import CartPanel from "./components/CartPanel";
import Footer from "./components/Footer";
import { getJSON, isOffer, isProduct, isStock } from "./api/api";
import { keepValid } from "./api/validation";
import { useThemeStore } from "./hooks/useThemeStore";
import type { LoadState } from "./types";
function loadCatalog(): Promise<LoadState> {
  return Promise.all([getJSON("products"), getJSON("stock"), getJSON("offers")])
    .then(([rawProducts, rawStock, rawOffers]) => {
      const products = keepValid(rawProducts, isProduct, "products");
      const offers = keepValid(rawOffers, isOffer, "offers");
      if (!isStock(rawStock)) throw new Error("داده موجودی معتبر نیست.");
      if (products.length === 0) return { status: "empty" };
      return { status: "success", products, stock: rawStock, offers };
    });
}
export default function App() {
  const theme = useThemeStore((state) => state.theme);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let ignore = false;
    loadCatalog()
      .then((nextState) => { if (!ignore) setLoadState(nextState); })
      .catch((error: unknown) => {
        if (ignore) return;
        console.error("بارگذاری اطلاعات فروشگاه ناموفق بود:", error);
        setLoadState({ status: "error", message: error instanceof Error ? error.message : "خطای ناشناخته" });
      });
    return () => { ignore = true; };
  }, [attempt]);
  const products = loadState.status === "success" ? loadState.products : [];
  const offers = loadState.status === "success" ? loadState.offers : [];
  const stock = loadState.status === "success" ? loadState.stock : undefined;
  const visibleProducts = categoryId === null
    ? products
    : products.filter((product) => product.categoryId === categoryId);
  const offerProducts = products.filter((product) =>
    offers.some((offer) => offer.productId === product.id),
  );
  const message = loadState.status === "error"
    ? "بارگذاری محصولات انجام نشد. لطفاً دوباره تلاش کنید."
    : "در حال حاضر محصولی برای نمایش نیست.";
  const retry = () => { setLoadState({ status: "loading" }); setAttempt((value) => value + 1); };

  return (
    <div className="app" data-theme={theme}>
      <Header />
      <main id="main-content">
        <CategoryNav selectedId={categoryId} onPick={setCategoryId} />
        <ProductGrid id="tents" title="محصولات" products={visibleProducts} status={loadState.status} message={message} stock={stock} offers={offers} onRetry={retry} />
        <ProductGrid id="special-offers" title="پیشنهاد ویژه" products={offerProducts} status={loadState.status} message={message} stock={stock} offers={offers} />
        <CartPanel products={products} />
      </main>
      <Footer />
    </div>
  );
}
