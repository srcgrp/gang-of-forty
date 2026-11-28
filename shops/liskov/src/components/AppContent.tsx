import {filterProducts} from '../catalog/filter-products';
import CategoryNav from './CategoryNav';
import Footer from './Footer';
import Header from './Header';
import HomeBanners from './HomeBanners';
import HomeCarousels from './HomeCarousels';
import LoadStateView from './LoadStateView';
import ProductGrid from './ProductGrid';
import SaleCountdown from './SaleCountdown';

import type {LoadState} from '../types';

type AppContentProps = {
    loadState: LoadState;
    selectedCategoryId: number | null;
    query: string;
    onPickCategory: (id: number | null) => void;
    onQuery: (value: string) => void;
    onRetry: () => void;
};

export default function AppContent({
    loadState,
    selectedCategoryId,
    query,
    onPickCategory,
    onQuery,
    onRetry,
}: AppContentProps) {
    if (loadState.status !== 'success') {
        return <LoadStateView loadState={loadState} onRetry={onRetry} />;
    }

    const {products, categories, home, stock, offers, shop} = loadState.data;

    const visibleProducts = filterProducts(products, selectedCategoryId, '');
    const searchResults = filterProducts(products, null, query);

    const offerByProductId = new Map(
        offers.map((offer) => [offer.productId, offer]),
    );

    const categoryById = new Map(
        categories.map((category) => [category.id, category]),
    );

    return (
        <>
            <a className='skip-link' href='#main'>
                پرش به محتوای اصلی
            </a>

            <Header
                shop={shop}
                categories={categories}
                query={query}
                onQuery={onQuery}
                onPickCategory={onPickCategory}
                products={products}
                searchResults={searchResults}
                stockById={stock.items}
                offerByProductId={offerByProductId}
                categoryById={categoryById}
            />

            <main id='main' tabIndex={-1}>
                <HomeBanners home={home} />

                <SaleCountdown />

                <HomeCarousels data={loadState.data} />

                <CategoryNav
                    categories={categories}
                    selectedCategoryId={selectedCategoryId}
                    onPick={onPickCategory}
                />

                <section className='page-section'>
                    <h2 className='titles'>محصولات</h2>

                    <ProductGrid
                        products={visibleProducts}
                        stockById={stock.items}
                        offerByProductId={offerByProductId}
                        categoryById={categoryById}
                    />
                </section>
            </main>

            <Footer data={loadState.data} />
        </>
    );
}
