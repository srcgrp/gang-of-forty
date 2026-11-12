import {cartTotal} from '../cart/cart';
import {filterProducts} from '../catalog/filter-products';
import CartPanel from './CartPanel';
import CategoryNav from './CategoryNav';
import Header from './Header';
import LoadStateView from './LoadStateView';
import ProductGrid from './ProductGrid';
import SaleCountdown from './SaleCountdown';
import SearchBox from './SearchBox';

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

    const {products, categories} = loadState.data;
    const visibleProducts = filterProducts(products, selectedCategoryId, query);
    const total = cartTotal(cart, products);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <a className='skip-link' href='#main'>
                پرش به محتوای اصلی
            </a>
            <Header itemCount={itemCount} />
            <SaleCountdown />
            <main id='main' tabIndex={-1}>
                <CategoryNav
                    categories={categories}
                    selectedCategoryId={selectedCategoryId}
                    onPick={onPickCategory}
                />
                <section className='page-section'>
                    <h2 className='titles'>محصولات</h2>
                    <SearchBox query={query} onQuery={onQuery} />
                    <ProductGrid products={visibleProducts} onAdd={onAdd} />
                </section>
                <CartPanel
                    cart={cart}
                    products={products}
                    total={total}
                    onRemove={onRemove}
                />
            </main>
        </>
    );
}
