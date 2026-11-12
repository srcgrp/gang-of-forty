import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import { useEffect, useState } from 'react'
import type { CartLine, LoadState } from './shared/types'
import { loadShopData } from './shared/data/api/shop-data'
import { loadCart, saveCart } from './features/cart/data/storage'
import { addToCart, cartCount, cartTotal, removeFromCart } from './features/cart/cart'
import LoadStatus from './components/LoadStatus'
import Storefront from './components/Storefront'

const pageTitle = document.title
const notyf = new Notyf({ duration: 2000, position: { x: "left", y: "top" } })

export default function App() {
    const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })
    const [shopData, setShopData] = useState<Awaited<ReturnType<typeof loadShopData>> | null>(null)
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [cart, setCart] = useState<CartLine[]>(() => loadCart())

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

    useEffect(() => {
        saveCart(cart)
    }, [cart])

    useEffect(() => {
        const count = cartCount(cart)
        document.title = count ? `(${count}) ${pageTitle}` : pageTitle
    }, [cart])

    const handleAdd = (id: number) => {
        setCart(current => addToCart(current, id))
        notyf.success("به سبد خرید اضافه شد")
    }
    const handleRemove = (id: number) => setCart(current => removeFromCart(current, id))
    const handleClear = () => setCart([])

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
