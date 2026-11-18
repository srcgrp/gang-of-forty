import { useEffect, useState } from "react";
import type { LoadState, ShopData } from "./shared/types";
import { loadCatalog } from "./features/products/api/catalog-data";
import { getShop, getHome } from "./shared/api/site";
import LoadStatus from "./components/LoadStatus";
import ShopView from "./components/ShopView";

export default function App() {
  const [state, setState] = useState<LoadState<ShopData>>({ status: "loading" });
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [saleOpen, setSaleOpen] = useState(false);
  useEffect(() => {
    let ignore = false;
    Promise.all([loadCatalog(), getShop(), getHome()])
      .then(([catalog, shop, home]) => {
        if (ignore) return;
        const data: ShopData = { ...catalog, shop, home };
        setState(data.products.length ? { status: "success", data } : { status: "empty" });
      })
      .catch(() => {
        if (ignore) return;
        setState({ status: "error", message:
          "دریافت اطلاعات فروشگاه ممکن نشد. اتصال اینترنت را بررسی و دوباره تلاش کنید." });
      });
    return () => { ignore = true; };
  }, [attempt]);
  function handleRetry(): void {
    setState({ status: "loading" });
    setAttempt(previous => previous + 1);
  }
  if (state.status !== "success") {
    return <main className="wrap"><h1>بت‌شاپ</h1><LoadStatus state={state} onRetry={handleRetry} /></main>;
  }
  return <ShopView data={state.data} categoryId={categoryId}
    query={query} onQuery={setQuery} saleOpen={saleOpen} onToggleSale={() => setSaleOpen(open => !open)}
    onPick={setCategoryId} />;
}
