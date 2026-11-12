import { useEffect, useState } from 'react'
import type { CartLine, LoadState } from './shared/types'
import { loadShopData } from './shared/data/api/shop-data'
import { addToCart, cartCount, cartTotal, removeFromCart } from './features/cart/cart'
import { confirmClearCart, notifyAdded } from './features/cart/ui/cart'
import LoadStatus from './components/LoadStatus'
import Storefront from './components/Storefront'

export default function App() {
    const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })
    const [shopData, setShopData] = useState<Awaited<ReturnType<typeof loadShopData>> | null>(null)
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [cart, setCart] = useState<CartLine[]>([])

    useEffect(() => {
        let ignore = false
        loadShopData().then(data => {
            if (ignore) return
            setShopData(data)
            setLoadState(data.products.length
                ? { status: 'success', products: data.products }
                : { status: 'empty' })
        }).catch((error: unknown) => {
            if (ignore) return
            console.error('Storefront loading failed:', error instanceof Error ? error.message : String(error))
            setLoadState({ status: 'error', message: 'بارگذاری فروشگاه انجام نشد. اتصال را بررسی کنید و صفحه را دوباره بارگذاری کنید.' })
        })
        return () => { ignore = true }
    }, [])

    const handleAdd = (id: number) => {
        setCart(current => addToCart(current, id))
        notifyAdded()
    }
    const handleRemove = (id: number) => setCart(current => removeFromCart(current, id))
    const handleClear = async () => {
        if (cart.length && await confirmClearCart()) setCart([])
    }

    if (loadState.status !== 'success') return <LoadStatus state={loadState} />
    if (shopData === null) return null

    return (
        <Storefront
            data={shopData}
            categoryId={categoryId}
            cart={cart}
            count={cartCount(cart)}
            total={cartTotal(cart, loadState.products)}
            onPick={setCategoryId}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onClear={handleClear}
        />
    )
}
