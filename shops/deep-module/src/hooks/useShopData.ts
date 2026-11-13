import { useState, useEffect } from "react";
import type { AppData, LoadState } from "../types";
import { loadAll } from "../shared/api/load";

export function useShopData(attempt: number) {
  const [state, setState] = useState<LoadState<AppData>>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      setState({ status: "loading" });
      const res = await loadAll(controller.signal);
      if (!controller.signal.aborted) setState(res);
    }
    fetchData();
    return () => controller.abort();
  }, [attempt]);

  return state;
}
