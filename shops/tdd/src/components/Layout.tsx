import { useMemo, useState } from 'react'
import { Outlet, useParams } from '@tanstack/react-router'
import { useCatalog } from '../hooks/useCatalog'
import { useThemeStore } from '../hooks/useThemeStore'
import { createProductSearch } from '../features/products/search'
import Header from './Header'
import Footer from './Footer'
import LoadStatus from './LoadStatus'
import SearchResults from './SearchResults'

export default function Layout() {
    const theme = useThemeStore(s => s.theme)
    const { state, retry } = useCatalog()
    const { carouselId } = useParams({ strict: false })
    const [query, setQuery] = useState('')
    const data = state.status === 'success' ? state.data : null
    const searchProducts = useMemo(() => createProductSearch(data?.products ?? []), [data?.products])
    const categoryId = data?.home.carousels.find(item => item.id === carouselId)?.categoryId
        ?? data?.categories.find(item => item.slug === carouselId)?.id ?? null
    const results = query.trim() ? searchProducts(query, categoryId ?? undefined) : []

    return (
        <div className="app" id="top" data-theme={theme}>
            {data && <Header categories={data.categories} shop={data.shop} categoryId={categoryId} products={data.products} offers={data.offers} query={query} onQueryChange={setQuery} />}
            <main id="main-content" tabIndex={-1}>
                {state.status === 'success' ? <>
                    <SearchResults query={query} products={results} stock={state.data.stock} offers={state.data.offers} />
                    <Outlet />
                </> : <LoadStatus state={state} onRetry={retry} />}
            </main>
            {data && <Footer shop={data.shop} categories={data.categories} />}
        </div>
    )
}
