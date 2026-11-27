import { useEffect } from "react";
import { create } from "zustand";
import type { LoadState } from "../scripts/types";
import { USER_MESSAGES } from "../api/api-config.ts";
import { loadCatalog } from "../api/index-api.ts";

const LOADING: LoadState = { status: "loading" };
const UNKNOWN_ERROR: LoadState = {
  status: "error",
  message: USER_MESSAGES.unknown,
};

type CatalogStore = { state: LoadState };

const useCatalogStore = create<CatalogStore>()(() => ({ state: LOADING }));

let pending: Promise<void> | null = null;

function load(): Promise<void> {
  pending ??= loadCatalog()
    .catch(() => UNKNOWN_ERROR)
    .then((state) => useCatalogStore.setState({ state }))
    .finally(() => {
      pending = null;
    });
  return pending;
}

function retry() {
  useCatalogStore.setState({ state: LOADING });
}

export function useCatalog() {
  const state = useCatalogStore((s) => s.state);
  const isLoading = state.status === "loading";

  useEffect(() => {
    if (isLoading) void load();
  }, [isLoading]);

  return { state, retry };
}