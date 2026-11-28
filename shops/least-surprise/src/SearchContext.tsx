
import { createContext, useContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'

type SearchContextType = {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

export const SearchContext = createContext<SearchContextType | null>(null)

export function useSearch() {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error('useSearch must be used inside SearchContext.Provider')
  }

  return context
}
