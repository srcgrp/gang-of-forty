import { create } from "zustand";

type QueryState = {
  query: string;
  setQuery: (query: string) => void;
};

export const useQueryStore = create<QueryState>()(function (set) {
  return {
    query: "",
    setQuery: function (query) {
      set({ query: query });
    },
  };
});
