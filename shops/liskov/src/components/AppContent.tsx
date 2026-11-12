import {cartTotal} from '../cart/cart';
import CartPanel from './CartPanel';
import CategoryNav from './CategoryNav';
import Header from './Header';
import ProductGrid from './ProductGrid';

import type {CartLine, LoadState} from '../types';

type AppContentProps = {
    cart: CartLine[];
    loadState: LoadState;
    selectedCategoryId: number | null;
    onPickCategory: (id: number | null) => void;
    onAdd: (id: number) => void;
    onRemove: (id: number) => void;
};

export default function AppContent({
    cart,
    loadState,
    selectedCategoryId,
    onPickCategory,
    onAdd,
    onRemove,
}: AppContentProps) {
    if (loadState.status !== 'success') {
        if (loadState.status === 'loading')
            return <p role='status'>در حال دریافت اطلاعات فروشگاه...</p>;
        if (loadState.status === 'empty')
            return <p>در حال حاضر محصولی برای نمایش وجود ندارد.</p>;
        return <p role='alert'>{loadState.message}</p>;
    }

    const {products, categories} = loadState.data;
    const visibleProducts =
        selectedCategoryId === null
            ? products
            : products.filter(
                  (product) => product.categoryId === selectedCategoryId,
              );
    const total = cartTotal(cart, products);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <a className='skip-link' href='#main'>
                پرش به محتوای اصلی
            </a>
            <Header itemCount={itemCount} />
            <main id='main' tabIndex={-1}>
                <CategoryNav
                    categories={categories}
                    selectedCategoryId={selectedCategoryId}
                    onPick={onPickCategory}
                />
                <section className='page-section'>
                    <h2 className='titles'>محصولات</h2>
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
