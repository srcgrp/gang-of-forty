import { useEffect, useState } from "react";
import { getJSON, isOffer, isProduct, isStock } from "../api/api";
import { keepValid } from "../api/validation";
import type { Catalog, LoadState } from "../types";

export function useCatalog() {
  const [state, setState] = useState<LoadState<Catalog>>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;

    Promise.all([getJSON("products"), getJSON("stock"), getJSON("offers")])
      .then(([rawProducts, rawStock, rawOffers]) => {
        const products = keepValid(rawProducts, isProduct, "products");
        const offers = keepValid(rawOffers, isOffer, "offers");
        if (!isStock(rawStock)) throw new Error("داده موجودی معتبر نیست.");
        if (ignore) return;
        if (products.length === 0) {
          setState({ status: "empty" });
          return;
        }
        setState({ status: "success", products, stock: rawStock, offers });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        console.error("بارگذاری اطلاعات فروشگاه ناموفق بود:", error);
        setState({
          status: "error",
          message: error instanceof Error ? error.message : "خطای ناشناخته",
        });
      });

    return () => { ignore = true; };
  }, [attempt]);

  const retry = () => {
    setState({ status: "loading" });
    setAttempt((value) => value + 1);
  };

  return { state, retry };
}
