import { useEffect, useState } from "react";
import { loadStoreData } from "../api/store-data";
import type { LoadState } from "../../../shared/types/products";
import type { StoreData } from "../api/store-data";

export function useStoreData() {
  const [loadState, setLoadState] = useState<LoadState>({
    status: "loading",
  });

  const [storeData, setStoreData] = useState<StoreData | null>(null);

  useEffect(() => {
    let ignore = false;

    loadStoreData()
      .then((data) => {
        if (ignore) return;

        setStoreData(data);
        setLoadState(
          data.products.length === 0
            ? { status: "empty" }
            : { status: "success", products: data.products },
        );
      })
      .catch((error: unknown) => {
        if (ignore) return;

        console.error("Failed to load store data:", error);
        setLoadState({
          status: "error",
          message: "دریافت اطلاعات فروشگاه با مشکل مواجه شد.",
        });
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { loadState, storeData };
}
