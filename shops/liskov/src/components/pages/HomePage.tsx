import {buildContext} from '../../catalog/context';
import {filterProducts} from '../../catalog/filter-products';
import {useAppContext} from '../../context/useAppContext';
import CategoryNav from '../CategoryNav';
import HomeBanners from '../HomeBanners';
import HomeCarousels from '../HomeCarousels';
import ProductGrid from '../ProductGrid';
import SaleCountdown from '../SaleCountdown';

export default function HomePage() {
    const {loadState, selectedCategoryId, onPickCategory} = useAppContext();

    if (loadState.status !== 'success') {
        return null;
    }

    const {data} = loadState;
    const {products, categories, stock} = data;

    const context = buildContext(data);

    const visibleProducts = filterProducts(products, selectedCategoryId, '');

    return (
        <main id='main' tabIndex={-1}>
            <HomeBanners home={data.home} />

            <SaleCountdown />

            <HomeCarousels data={data} />

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
                    offerByProductId={context.offerByProductId}
                    categoryById={context.categoryById}
                />
            </section>
        </main>
    );
}
