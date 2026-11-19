import { useEffect, useState } from 'react'
import { getCatalog } from '../api/catalog-data'
import type { Catalog, LoadState } from '../types'

let cached: Catalog | undefined
let pending: Promise<Catalog> | undefined

function requestCatalog() {
  if (cached) return Promise.resolve(cached)
  pending ??= getCatalog().then((catalog) => {
    cached = catalog
    return catalog
  }).finally(() => { pending = undefined })
  return pending
}

export function useCatalog() {
  const [state, setState] = useState<LoadState<Catalog>>(
    cached ? { status: 'success', data: cached } : { status: 'loading' },
  )
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let ignore = false
    requestCatalog().then((data) => {
      if (!ignore) setState(data.products.length ? { status: 'success', data } : { status: 'empty' })
    }).catch((error: unknown) => {
      if (!ignore) setState({ status: 'error', message: error instanceof Error ? error.message : 'خطا در دریافت اطلاعات' })
    })
    return () => { ignore = true }
  }, [attempt])
  function retry() {
    setState({ status: 'loading' })
    setAttempt((value) => value + 1)
  }
  return { ...state, retry }
}
