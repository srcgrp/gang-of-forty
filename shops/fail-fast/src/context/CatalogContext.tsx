import { createContext, useContext } from 'react'
import type { Catalog } from '../catalog/carousel'

export const CatalogContext = createContext<Catalog | null>(null)

export function useCatalogContext(): Catalog {
  const catalog = useContext(CatalogContext)
  if (!catalog) {
    throw new Error('CatalogContext provider is missing')
  }
  return catalog
}
