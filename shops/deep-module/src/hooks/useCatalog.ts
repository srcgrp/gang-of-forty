import { useEffect } from "react";
import { create } from "zustand";
import type { AppData, LoadState } from "../types";
import { loadAll } from "../shared/api/load";

interface CatalogStore {
  state: LoadState<AppData>;
  attempt: number;
  setState: (state: LoadState<AppData>) => void;
  retry: () => void;
}

export const useCatalogStore = create<CatalogStore>()((set) => ({
  state: { status: "loading" },
  attempt: 0,
  setState: (state) => set({ state }),
  retry: () =>
    set((prev) => ({
      state: { status: "loading" },
      attempt: prev.attempt + 1,
    })),
}));

export function useCatalog() {
  const state = useCatalogStore((s) => s.state);
  const attempt = useCatalogStore((s) => s.attempt);
  const setState = useCatalogStore((s) => s.setState);
  const retry = useCatalogStore((s) => s.retry);

  useEffect(() => {
    if (useCatalogStore.getState().state.status === "success") return;
    const controller = new AbortController();
    async function fetchCatalog() {
      setState({ status: "loading" });
      const res = await loadAll(controller.signal);
      if (!controller.signal.aborted) setState(res);
    }
    void fetchCatalog();
    return () => controller.abort();
  }, [attempt, setState]);

  return { state, retry };
}
