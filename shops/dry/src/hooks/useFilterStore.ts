import { create } from 'zustand'

type FilterState = {
    query: string
    categoryId: number | null
    setQuery: (query: string) => void
    setCategory: (id: number | null) => void
}

export const useFilterStore = create<FilterState>()((set) => ({
    query: '',
    categoryId: null,
    setQuery: (query) => set({ query}),
    setCategory: (categoryId) => set({ categoryId}),
})) 