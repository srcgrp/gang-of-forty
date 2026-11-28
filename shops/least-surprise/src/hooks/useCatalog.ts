
import { useEffect, useState } from 'react'
import type { LoadState } from '../types'
import { loadShopData } from '../api/products'

export function useCatalog() {
  const [loadState, setLoadState] = useState<LoadState>({
    status: 'loading',
  })

  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false

    setLoadState({ status: 'loading' })

    loadShopData()
      .then((products) => {
        if (ignore) return

        setLoadState(
          products.length > 0
            ? { status: 'success', products }
            : { status: 'empty' },
        )
      })
      .catch((error: unknown) => {
        if (ignore) return

        setLoadState({
          status: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'خطای بارگذاری اطلاعات',
        })
      })

    return () => {
      ignore = true
    }
  }, [attempt])

  const retry = () => {
    setAttempt((current) => current + 1)
  }

  return {
    loadState,
    retry,
  }
}
