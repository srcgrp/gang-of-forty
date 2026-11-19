import { useEffect, useState } from "react";
import { loadData } from "../api/load-data.ts";
import { getDataLoadState } from "../catalog/data-load-state.ts";
import type { LoadState } from "../types.ts";

export function useCatalog(): LoadState {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let ignore = false;

    loadData()
      .then((data) => {
        if (ignore) return;
        setState(getDataLoadState(data));
      })
      .catch(() => {
        if (ignore) return;
        setState({
          status: "error",
          message: "خطا: لطفا دوباره تلاش کنید",
        });
      });

    return () => {
      ignore = true;
    };
  }, []);

  return state;
}