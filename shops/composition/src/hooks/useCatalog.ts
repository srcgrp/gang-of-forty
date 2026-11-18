import { useEffect, useState } from "react";
import type { LoadState, ShopData } from "../shared/types";
import { loadCatalog } from "../features/products/api/catalog-data";
import { getShop, getHome } from "../shared/api/site";

type Result = LoadState<ShopData> & { retry: () => void };
export function useCatalog(): Result {
  const [state, setState] = useState<LoadState<ShopData>>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
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
  function retry(): void {
    setState({ status: "loading" });
    setAttempt(previous => previous + 1);
  }
  return { ...state, retry };
}
