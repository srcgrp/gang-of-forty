import { useMemo, useState } from 'react'
import type { Catalog } from '../shared/types'
import { createProductSearch } from '../features/products/search'
import Header from './Header'
import Hero from './Hero'
import SearchResults from './SearchResults'
import CategoryGrid from './CategoryGrid'
import PromoGrid from './PromoGrid'
import ProductGrid from './ProductGrid'
import SideBanner from './SideBanner'
import StoreStory from './StoreStory'
import About from './About'
import Footer from './Footer'
import SaleCountdown from './SaleCountdown'

const saleEndsAt = new Date()
saleEndsAt.setHours(24, 0, 0, 0)

type StorefrontProps = {
    data: Catalog
}

export default function Storefront({ data }: StorefrontProps) {
    const [categoryId, setCategoryId] = useState<number | null>(null)
    const [query, setQuery] = useState('')
    const searchProducts = useMemo(() => createProductSearch(data.products), [data.products])
    const results = query.trim() ? searchProducts(query, categoryId ?? undefined) : []

    return (
        <div id="top">
            <Header categories={data.categories} shop={data.shop} categoryId={categoryId} products={data.products} query={query} onQueryChange={setQuery} onPick={setCategoryId} />
            <main id="main-content" tabIndex={-1}>
                <p id="page-status" className="page-status" role="status" aria-live="polite"></p>
                <SearchResults query={query} products={results} stock={data.stock} offers={data.offers} />
                <div id="home-banners"><Hero data={data.home.hero} categories={data.categories} onPick={setCategoryId} /></div>
                <SaleCountdown endsAt={saleEndsAt.getTime()} />
                <PromoGrid promos={data.home.promos} categories={data.categories} onPick={setCategoryId} />
                <CategoryGrid categories={data.categories} onPick={setCategoryId} />
                <ProductGrid data={data} categoryId={categoryId} />
                <SideBanner data={data.home.side} categories={data.categories} onPick={setCategoryId} />
                <StoreStory />
                <About />
            </main>
            <Footer shop={data.shop} categories={data.categories} onPick={setCategoryId} />
        </div>
    )
}
