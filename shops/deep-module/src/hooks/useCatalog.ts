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

let startedAttempt = -1;

export function useCatalog() {
  const state = useCatalogStore((s) => s.state);
  const attempt = useCatalogStore((s) => s.attempt);
  const setState = useCatalogStore((s) => s.setState);
  const retry = useCatalogStore((s) => s.retry);

  useEffect(() => {
    if (useCatalogStore.getState().state.status === "success") return;
    if (startedAttempt === attempt) return;
    startedAttempt = attempt;
    async function fetchCatalog() {
      setState({ status: "loading" });
      const res = await loadAll();
      if (startedAttempt === attempt) setState(res);
    }
    void fetchCatalog();
  }, [attempt, setState]);

  return { state, retry };
}
