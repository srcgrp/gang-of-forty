import { useEffect, useState } from 'react'
import type { LoadState } from './shared/types'
import { loadShopData } from './shared/data/api/shop-data'
import LoadStatus from './components/LoadStatus'
import Storefront from './components/Storefront'
import { useThemeStore } from './hooks/useThemeStore'

export default function App() {
    const theme = useThemeStore(s => s.theme)
    const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })
    const [shopData, setShopData] = useState<Awaited<ReturnType<typeof loadShopData>> | null>(null)
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [query, setQuery] = useState('')
    const [retryCount, setRetryCount] = useState(0)

    useEffect(() => {
        let ignore = false
        loadShopData().then(data => {
            if (ignore) return
            setShopData(data)
            setLoadState(data.products.length ? { status: 'success', products: data.products } : { status: 'empty' })
        }).catch((error: unknown) => {
            if (ignore) return
            console.error('Storefront loading failed:', error instanceof Error ? error.message : String(error))
            setLoadState({ status: 'error', message: 'بارگذاری فروشگاه انجام نشد. اتصال را بررسی کنید و دوباره تلاش کنید.' })
        })
        return () => { ignore = true }
    }, [retryCount])

    const handleRetry = () => {
        setLoadState({ status: 'loading' })
        setRetryCount(current => current + 1)
    }

    return (
        <div className="app" data-theme={theme}>
            {loadState.status !== 'success' ? <LoadStatus state={loadState} onRetry={handleRetry} /> : shopData &&
                <Storefront data={shopData} categoryId={categoryId}
                    query={query} onQueryChange={setQuery} onPick={setCategoryId} />}
        </div>
    )
}
