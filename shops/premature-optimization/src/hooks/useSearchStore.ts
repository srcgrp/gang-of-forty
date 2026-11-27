import { create } from "zustand";
import { readQuery, writeQuery } from "../scripts/storage/query-url.ts";

type SearchState = { query: string; setQuery: (query: string) => void };

export const useSearchStore = create<SearchState>()((set) => ({
  query: readQuery(),
  setQuery: (query) => set({ query }),
}));

useSearchStore.subscribe((s) => writeQuery(s.query));
