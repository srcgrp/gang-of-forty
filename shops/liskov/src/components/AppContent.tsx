import {cartTotal} from '../cart/cart';
import {filterProducts} from '../catalog/filter-products';
import CategoryNav from './CategoryNav';
import Footer from './Footer';
import Header from './Header';
import HomeBanners from './HomeBanners';
import HomeCarousels from './HomeCarousels';
import LoadStateView from './LoadStateView';
import ProductGrid from './ProductGrid';
import SaleCountdown from './SaleCountdown';

import type {CartLine, LoadState} from '../types';

type AppContentProps = {
    cart: CartLine[];
    loadState: LoadState;
    selectedCategoryId: number | null;
    query: string;
    onPickCategory: (id: number | null) => void;
    onQuery: (value: string) => void;
    onAdd: (id: number) => void;
    onRemove: (id: number) => void;
    onRetry: () => void;
};

export default function AppContent({
    cart,
    loadState,
    selectedCategoryId,
    query,
    onPickCategory,
    onQuery,
    onAdd,
    onRemove,
    onRetry,
}: AppContentProps) {
    if (loadState.status !== 'success') {
        return <LoadStateView loadState={loadState} onRetry={onRetry} />;
    }

    const {products, categories, home, stock, offers, shop} = loadState.data;

    const visibleProducts = filterProducts(products, selectedCategoryId, '');
    const searchResults = filterProducts(products, null, query);
    const total = cartTotal(cart, products);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
                itemCount={itemCount}
                shop={shop}
                categories={categories}
                query={query}
                onQuery={onQuery}
                onPickCategory={onPickCategory}
                cart={cart}
                products={products}
                total={total}
                searchResults={searchResults}
                stockById={stock.items}
                offerByProductId={offerByProductId}
                categoryById={categoryById}
                onAdd={onAdd}
                onRemove={onRemove}
            />

            <main id='main' tabIndex={-1}>
                <HomeBanners home={home} />

                <SaleCountdown />

                <HomeCarousels data={loadState.data} onAdd={onAdd} />

                <CategoryNav
                    categories={categories}
                    selectedCategoryId={selectedCategoryId}
                    onPick={onPickCategory}
                />

                <section className='page-section'>
                    <h2 className='titles'>محصولات</h2>

                    <ProductGrid
                        products={visibleProducts}
                        onAdd={onAdd}
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
