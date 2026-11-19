import { useEffect, useSyncExternalStore } from 'react'
import { getCatalog } from '../api/catalog-data'
import type { Catalog, LoadState } from '../types'

let snapshot: LoadState<Catalog> = { status: 'loading' }
let pending: Promise<void> | undefined
const listeners = new Set<() => void>()

function publish(next: LoadState<Catalog>) {
  snapshot = next
  listeners.forEach((listener) => listener())
}

function loadCatalog() {
  if (pending) return
  publish({ status: 'loading' })
  pending = getCatalog().then((data) => {
    publish(data.products.length ? { status: 'success', data } : { status: 'empty' })
  }).catch((error: unknown) => {
    publish({ status: 'error', message: error instanceof Error ? error.message : 'خطا در دریافت اطلاعات' })
  }).finally(() => { pending = undefined })
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // React unsubscribes on unmount, so late requests cannot update an unmounted page.
  return () => { listeners.delete(listener) }
}

export function useCatalog() {
  const state = useSyncExternalStore(subscribe, () => snapshot)
  useEffect(() => {
    if (snapshot.status === 'loading') loadCatalog()
  }, [])
  return { ...state, retry: loadCatalog }
}
