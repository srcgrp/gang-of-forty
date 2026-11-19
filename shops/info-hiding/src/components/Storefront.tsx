import { useThemeStore } from '../hooks/useThemeStore';
import Status from './Status';
import SortSelect from './SortSelect';
import { visibleProducts } from '../catalog/filter';
import type { Catalog, Sort, LoadState } from '../types';
import Header from './Header';
import Hero from './Hero';
import Banners from './Banners';
import Footer from './Footer';
import ExtraCategories from './ExtraCategories';
import CategoryNav from './CategoryNav';
import ProductGrid from './ProductGrid';
import CartPanel from './CartPanel';
type StorefrontProps = {
    state: LoadState; sort: Sort; onSort: (sort: Sort) => void;
    catalog: Catalog; selected: number | null;
    onPick: (id: number | null) => void;
};
export default function Storefront({ catalog, selected, onPick, sort, onSort, state }: StorefrontProps) {
    const theme = useThemeStore(state => state.theme);
    const { products, categories, offers, stock } = catalog;
    const visible = visibleProducts(products, { categoryId: selected, query: '', sort }, offers);
    return <div className="app" data-theme={theme}>
        <a className="skip-link" href="#main">پرش به محتوای اصلی</a>
        <div className="announcement">هر روز تازه، هر روز نزدیک شما</div>
        <Header />
        <main id="main" tabIndex={-1}>
            <Hero />
            <Status state={state} />
            {state.status === 'success' && <>
            <CategoryNav categories={categories} selected={selected} onPick={onPick} />
            <ProductGrid id="offers" title="پیشنهاد ویژه امروز"
                products={products.filter(product => offers.some(offer => offer.productId === product.id))}
                offers={offers} stock={stock} />
            <Banners />
            <ProductGrid id="dairy" title="لبنیات" products={products.filter(product => product.categoryId === 2)}
                offers={offers} stock={stock} />
            <SortSelect value={sort} onSort={onSort} />
            <ProductGrid id="catalog" title="همهٔ محصولات فروشگاه" products={visible}
                offers={offers} stock={stock} />
            <CartPanel products={products} offers={offers} />
            </>}
            <ExtraCategories />
        </main>
        <Footer />
    </div>;
}
