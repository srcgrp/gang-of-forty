import { useEffect, useState } from 'react'
import { loadShop } from '../api/load-shop'
import type { LoadState } from '../types'

export function useCatalog() {
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false
    loadShop()
      .then((data) => { if (!ignore) setState({ status: data.products.length > 0 ? 'success' : 'empty', data }) })
      .catch((error: unknown) => { if (!ignore) setState({ status: 'error', message: error instanceof Error ? error.message : 'خطای ناشناخته' }) })
    return () => { ignore = true }
  }, [attempt])

  return { state, retry: () => setAttempt((count) => count + 1) }
}