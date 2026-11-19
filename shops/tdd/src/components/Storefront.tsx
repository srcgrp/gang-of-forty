import type { Catalog } from '../shared/types'
import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'
import Hero from './Hero'
import CategoryGrid from './CategoryGrid'
import PromoGrid from './PromoGrid'
import ProductGrid from './ProductGrid'
import SideBanner from './SideBanner'
import StoreStory from './StoreStory'
import About from './About'
import SaleCountdown from './SaleCountdown'

const saleEndsAt = new Date()
saleEndsAt.setHours(24, 0, 0, 0)

type StorefrontProps = {
    data: Catalog
}

export default function Storefront({ data }: StorefrontProps) {
    const hash = useLocation({ select: location => location.hash })
    useEffect(() => {
        if (hash) document.getElementById(hash)?.scrollIntoView()
    }, [hash])

    return (
        <>
            <div id="home-banners"><Hero data={data.home.hero} categories={data.categories} /></div>
            <SaleCountdown endsAt={saleEndsAt.getTime()} />
            <PromoGrid promos={data.home.promos} categories={data.categories} />
            <CategoryGrid categories={data.categories} />
            <ProductGrid data={data} />
            <SideBanner data={data.home.side} categories={data.categories} />
            <StoreStory />
            <About />
        </>
    )
}
