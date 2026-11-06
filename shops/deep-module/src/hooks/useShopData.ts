import { useState, useEffect } from "react";
import type { AppData, LoadState } from "../types";
import { loadAll } from "../shared/api/load";

export function useShopData(attempt: number) {
  const [state, setState] = useState<LoadState<AppData>>({ status: "loading" });
  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      setState({ status: "loading" });
      const res = await loadAll();
      if (!ignore) setState(res as LoadState<AppData>);
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, [attempt]);
  return state;
}
