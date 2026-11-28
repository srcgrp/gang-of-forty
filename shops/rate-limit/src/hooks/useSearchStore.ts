import { create } from 'zustand';
import type { SearchState } from '../types';

export const useSearchStore = create<SearchState>()((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
}));
