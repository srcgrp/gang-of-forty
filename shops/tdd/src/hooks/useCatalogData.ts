import { createContext, useContext } from 'react'
import type { Catalog } from '../shared/types'

export const CatalogContext = createContext<Catalog | null>(null)

export function useCatalogData() {
    const data = useContext(CatalogContext)
    if (!data) throw new Error('Catalog provider is missing')
    return data
}
