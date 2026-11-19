import { useEffect, useState } from 'react'
import type { Catalog, LoadState } from '../shared/types'
import { loadShopData } from '../shared/data/api/shop-data'

export function useCatalog() {
    const [state, setState] = useState<LoadState<Catalog>>({ status: 'loading' })
    const [retryCount, setRetryCount] = useState(0)

    useEffect(() => {
        let ignore = false
        loadShopData().then(data => {
            if (ignore) return
            setState(data.products.length ? { status: 'success', data } : { status: 'empty' })
        }).catch((error: unknown) => {
            if (ignore) return
            console.error('Storefront loading failed:', error instanceof Error ? error.message : String(error))
            setState({ status: 'error', message: 'بارگذاری فروشگاه انجام نشد. اتصال را بررسی کنید و دوباره تلاش کنید.' })
        })
        return () => { ignore = true }
    }, [retryCount])

    const retry = () => {
        setState({ status: 'loading' })
        setRetryCount(current => current + 1)
    }

    return { state, retry }
}
