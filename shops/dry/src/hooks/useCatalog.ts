import { useEffect } from 'react'
import { create } from 'zustand'
import { loadState } from '../features/products/api/load.ts'
import type { LoadState } from '../shared/types.ts'

type CatalogStore = { state: LoadState; started: boolean }

const useCatalogStore = create<CatalogStore>()(() => ({
  state: { status: 'loading' },
  started: false,
}))

function load() {
  if (useCatalogStore.getState().started) return
  useCatalogStore.setState({ started: true })
  loadState().then((next) => useCatalogStore.setState({ state: next }))
}

export function useCatalog() {
  const state = useCatalogStore((s) => s.state)
  useEffect(load, [])
  const retry = () => {
    useCatalogStore.setState({ state: { status: 'loading' }, started: false })
    load()
  }
  return { state, retry }
}